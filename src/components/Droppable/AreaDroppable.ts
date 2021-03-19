import AbstractDroppable from './AbstractDroppable';

class AreaDroppable extends AbstractDroppable {
  constructor(element: HTMLElement | string) {
    super(element);
  }
  
  public isIntersectElement(dragElement: HTMLElement, event: MouseEvent, tolerance: number): boolean {
    const {
      width: dragRectWidth,
      height: dragRectHeight
      }: ClientRect = dragElement.getBoundingClientRect();

    // 3. 전체 면적에서 겹치는 면적이 tolerance 보다 큰지 여부 검사
    const intersectedRect = this.getIntersectedArea(dragElement, this.element);
    const intersectedArea: number = intersectedRect.width * intersectedRect.height;
    const draggableArea: number = dragRectWidth * dragRectHeight;

    const intersectedRatio: number = (intersectedArea / draggableArea) * 100;
    return intersectedRatio > tolerance;
  }
}

export default AreaDroppable;