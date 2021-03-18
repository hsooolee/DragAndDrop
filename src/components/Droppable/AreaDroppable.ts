import { IntersectedRect } from '../../interfaces/Droppable';
import AbstractDroppable from './AbstractDroppable';

class AreaDroppable extends AbstractDroppable {
  constructor(element: HTMLElement | string) {
    super(element);
  }
  
  /**
   * 두 사각형이(Element Rect) 충돌하는지 검사
   *
   * - left   : dropRect.left < dropRect.width + dragRect.left) &&
   * - right  : dropRect.left + dropRect.width > dragRect.left &&
   * - top    : dragRect.top < dropRect.height + dropRect.top &&
   * - bottom : dragRect.top + dragRect.height > dropRect.top
   */
  public isIntersectElement(dragElement: HTMLElement, event: MouseEvent, tolerance: number): boolean {
    const {
      width: dragRectWidth,
      height: dragRectHeight
      }: ClientRect = dragElement.getBoundingClientRect();

    // 2. 충돌 판정 통과하면, 겹치는 부분 구해서 가시화
    const intersectedRect = this.getIntersectedArea(dragElement, this.element);
    this.showIntersectedArea(intersectedRect);

    // 3. 전체 면적에서 겹치는 면적이 tolerance 보다 큰지 여부 검사
    const intersectedArea: number = intersectedRect.width * intersectedRect.height;
    const draggableArea: number = dragRectWidth * dragRectHeight;

    const intersectedRatio: number = (intersectedArea / draggableArea) * 100;
    return intersectedRatio > tolerance;
  }
}

export default AreaDroppable;