import { IntersectedRect } from '../interfaces/Droppable';
import ColorUtil from '../color-util';

export default class Droppable {
  private element: HTMLElement;
  private intersectedElement: HTMLElement;

  private _intersectedColor: string = ColorUtil.defaultColor;

  constructor(element: HTMLElement | string) {
    if (typeof element === 'string') {
      this.element = document.getElementById(element);
      if (!this.element) {
        throw new Error('element is not found');
      }
    } else if (element instanceof HTMLElement) {
      this.element = element;
    } else {
      throw new Error('Invalid type: element must be a String or HTMLElement.');
    }

    this.createIntersectedElement();
  }

  public get intersectedColor() {
    return this._intersectedColor;
  }

  public set intersectedColor(colorValue: string) {
    if (!ColorUtil.isValidColor(colorValue)) {
      return;
    }

    this._intersectedColor = colorValue;
  }

  private createIntersectedElement(): void {
    if (this.intersectedElement) {
      return;
    }

    this.intersectedElement = document.createElement('div');
    this.intersectedElement.style.position = 'absolute';
    this.intersectedElement.style.left = '0px';
    this.intersectedElement.style.top = '0px';
    this.intersectedElement.style.background = this.intersectedColor;
    this.intersectedElement.hidden = true;

    document.body.appendChild(this.intersectedElement);
  }
  
  /**
   * 두 element가 충돌하는지 검사
   *
   * - left   : dropRect.left < dropRect.width + dragRect.left) &&
   * - right  : dropRect.left + dropRect.width > dragRect.left &&
   * - top    : dragRect.top < dropRect.height + dropRect.top &&
   * - bottom : dragRect.top + dragRect.height > dropRect.top
   */
  private isIntersectElement(dragElement: HTMLElement, dropElement: HTMLElement, tolerance: number): boolean {
    const {
      left: dragRectLeft,
      top: dragRectTop,
      width: dragRectWidth,
      height: dragRectHeight
    }: ClientRect = dragElement.getBoundingClientRect();

    const {
      left: dropRectLeft,
      top: dropRectTop,
      width: dropRectWidth,
      height: dropRectHeigth
    }: ClientRect = dropElement.getBoundingClientRect();

    // 1. 충돌 판정
    if (!(dropRectLeft < (dragRectLeft + dropRectWidth))) {
      return false;
    }

    if (!((dropRectLeft + dropRectWidth) > dragRectLeft)) {
      return false;
    }

    if (!(dragRectTop < (dropRectTop + dropRectHeigth))) {
      return false;
    }

    if (!((dragRectTop + dragRectHeight) > dropRectTop)) {
      return false;
    }

    // 2. 충돌 판정 통과하면, 겹치는 부분 구해서 가시화
    const intersectedRect = this.getIntersectedArea(dragElement, dropElement);
    this.drawIntersectedArea(intersectedRect);

    // 3. 전체 면적에서 겹치는 면적이 tolerance 보다 큰지 여부 검사
    const intersectedArea: number = intersectedRect.width * intersectedRect.height;
    const draggableArea: number = dragRectWidth * dragRectHeight;

    const intersectedRatio: number = (intersectedArea / draggableArea) * 100;
    return intersectedRatio > tolerance;
  }

  private getIntersectedArea(dragElement: HTMLElement, dropElement: HTMLElement): IntersectedRect {
    const dragElementRect = dragElement.getBoundingClientRect();
    const dropElementRect = dropElement.getBoundingClientRect();
    
    const intersectedRect: IntersectedRect = { x: 0, y: 0, width: 0, height: 0 };
    intersectedRect.x = Math.max(dropElementRect.left, dragElementRect.left);
    intersectedRect.y = Math.max(dropElementRect.top, dragElementRect.top);

    intersectedRect.width = Math.min(dropElementRect.right, (dropElementRect.width + dragElementRect.left)) - intersectedRect.x;
    intersectedRect.height = Math.min(dropElementRect.bottom, (dropElementRect.height + dragElementRect.top)) - intersectedRect.y;

    return intersectedRect;
  }

  private drawIntersectedArea(intersectedRect: IntersectedRect): void {
    const left: number = intersectedRect.x + window.scrollX;
    const top: number = intersectedRect.y + window.scrollY;

    this.intersectedElement.style.width = `${intersectedRect.width}px`;
    this.intersectedElement.style.height = `${intersectedRect.height}px`;
    this.intersectedElement.style.transform = `translateX(${left}px) translateY(${top}px)`;

    if (this.intersectedElement.hidden) {
      this.intersectedElement.hidden = false;
    }
  }

  public isIntersect(draggableElemt: HTMLElement, tolerance: number): boolean {
    this.intersectedElement.hidden = true;

    return this.isIntersectElement(draggableElemt, this.element, tolerance);
  }

  public addClass(className: string): void {
    if (!this.element.classList.contains(className)) {
      this.element.classList.add(className);
    }
  }

  public removeClass(className: string): void {
    if (this.element.classList.contains(className)) {
      this.element.classList.remove(className);
    }
  }
}
