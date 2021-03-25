//import { EventEmitter } from 'eventemitter3';
import { DraggableEventType, MouseEventType } from '../interfaces/Draggable';

interface Events {
  [key: string]: Function[]
}

// @TODO off, remove listeners ...
class EventEmitter {
  private events: Events;
  constructor() {
    this.events = {};
  }

  public on(name: string, callback: Function) {
    if (!this.events[name]) {
      this.events[name] = [];
    }
    (this.events[name]).push(callback);
  }

  protected emit<T>(name: string, obj: T): void {
    this.events[name].forEach((fn) => fn(obj));
  }
}

class Draggable extends EventEmitter {
  private element: HTMLElement;
  private offsetX: number;
  private offsetY: number;

  constructor(element: HTMLElement | string) {
    super();

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

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    this.element.addEventListener(MouseEventType.Down, this.handleMouseDown);
  }

  private handleMouseDown(event: MouseEvent): void {
    document.addEventListener(MouseEventType.Move, this.handleMouseMove);
    document.addEventListener(MouseEventType.Up, this.handleMouseUp);

    this.updateElementOffset(event);
    this.updateElementPosition(event);

    this.emit(DraggableEventType.DragStart, this.element, event);
  }

  private updateElementOffset(event: MouseEvent): void {
    const { left, top }: ClientRect = this.element.getBoundingClientRect();

    this.offsetX = event.clientX - left;
    this.offsetY = event.clientY - top;
  }

  private updateElementPosition(event: MouseEvent): void {
    if (this.element.hidden === true) {
      this.element.hidden = false;
    }

    this.element.style.left = `${event.pageX - this.offsetX}px`;
    this.element.style.top = `${event.pageY - this.offsetY}px`;
  }

  private handleMouseMove(event: MouseEvent): void {
    this.updateElementPosition(event);

    this.emit(DraggableEventType.Drag, this.element, event);
  }

  private handleMouseUp(event: MouseEvent): void {
    document.removeEventListener(MouseEventType.Move, this.handleMouseMove);
    document.removeEventListener(MouseEventType.Up, this.handleMouseUp);

    this.emit(DraggableEventType.DragEnd, this.element, event);
  }
}

export default Draggable;
