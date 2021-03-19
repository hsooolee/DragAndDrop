import ColorUtil from '../../color-util';
import { IntersectedRect } from '../../interfaces/Droppable';

abstract class AbstractDroppable {
  protected element: HTMLElement;
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
    if (!ColorUtil.isValid(colorValue)) {
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

  protected drawIntersectedArea(intersectedRect: IntersectedRect): void {
    const left: number = intersectedRect.x + window.scrollX;
    const top: number = intersectedRect.y + window.scrollY;

    this.intersectedElement.style.width = `${intersectedRect.width}px`;
    this.intersectedElement.style.height = `${intersectedRect.height}px`;
    this.intersectedElement.style.transform = `translateX(${left}px) translateY(${top}px)`;
    this.intersectedElement.style.background = this.intersectedColor;

    if (this.intersectedElement.hidden) {
      this.intersectedElement.hidden = false;
    }
 }

 protected getIntersectedArea(dragElement: HTMLElement, dropElement: HTMLElement): IntersectedRect {
    const dragElementRect = dragElement.getBoundingClientRect();
    const dropElementRect = dropElement.getBoundingClientRect();
    
    const intersectedRect: IntersectedRect = { x: 0, y: 0, width: 0, height: 0 };
    intersectedRect.x = Math.max(dropElementRect.left, dragElementRect.left);
    intersectedRect.y = Math.max(dropElementRect.top, dragElementRect.top);

    intersectedRect.width = Math.min(dropElementRect.right, (dropElementRect.width + dragElementRect.left)) - intersectedRect.x;
    intersectedRect.height = Math.min(dropElementRect.bottom, (dropElementRect.height + dragElementRect.top)) - intersectedRect.y;

    return intersectedRect;
  }

  public isDrop(draggableElemt: HTMLElement, event: MouseEvent, tolerance: number): boolean {
    this.intersectedElement.hidden = true;

    const {
      left: dragRectLeft,
      top: dragRectTop,
      height: dragRectHeight
    }: ClientRect = draggableElemt.getBoundingClientRect();

    const {
      left: dropRectLeft,
      top: dropRectTop,
      width: dropRectWidth,
      height: dropRectHeigth
    }: ClientRect = this.element.getBoundingClientRect();
    
    // 1. 두 사각형이 겹치는지 여부 판단
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

    // 2. 두 사각형이 겹치면, 겹치는 영역을 그린다.
    const intersectedRect = this.getIntersectedArea(draggableElemt, this.element);
    this.drawIntersectedArea(intersectedRect);    
    
    // 3. 드랍 여부는 각 로직에서 판단한다.
    return this.isDropElement(draggableElemt, event, tolerance);
  }

  public setBackgroundColor(color: string = null): void {
    this.element.style.backgroundColor = color;
  }

  public abstract isDropElement(draggableElemt: HTMLElement, event: MouseEvent, tolerance: number): boolean;
}

export default AbstractDroppable;

