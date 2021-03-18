import AbstractDroppable from './AbstractDroppable';

class PointerDroppable extends AbstractDroppable {
  constructor(element: HTMLElement | string) {
    super(element);
  }
  
  public isIntersectElement(dragElement: HTMLElement,  event: MouseEvent, tolerance: number): boolean {
    const {
      left: dropRectLeft,
      right: dropRectRight,
      bottom: ropRectBottom,
      top: dropRectTop
    }: ClientRect = this.element.getBoundingClientRect();

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