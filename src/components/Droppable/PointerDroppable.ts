import AbstractDroppable from './AbstractDroppable';

class PointerDroppable extends AbstractDroppable {
  constructor(element: HTMLElement | string) {
    super(element);
  }
  
  public isDropElement(dragElement: HTMLElement,  event: MouseEvent, tolerance: number): boolean {
    const {
      left: dropRectLeft,
      right: dropRectRight,
      bottom: ropRectBottom,
      top: dropRectTop
    }: ClientRect = this.element.getBoundingClientRect();

    // 마우스 포인터가 droppable 영역에 포함되는지 여부 검사
    if (!(dropRectLeft <= event.pageX + tolerance&& event.pageX <= dropRectRight + tolerance)) {
      return false;
    }

    if (!(dropRectTop <= event.pageY + tolerance && event.pageY <= ropRectBottom + tolerance)) {
      return false;
    }

    return true;
  }
}

export default PointerDroppable;