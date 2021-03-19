import Draggable from './components/Draggable';
import AbstractDroppable from './components/Droppable/AbstractDroppable';
import AreaDroppable from './components/Droppable/AreaDroppable';
import PointerDroppable from './components/Droppable/PointerDroppable';
import { DraggableEventType } from './interfaces/Draggable';



function handleDrag(droppable: AbstractDroppable, draggableElement: HTMLElement, event: MouseEvent): void {
  if (droppable.isDrop(draggableElement, event, 10)) {
    droppable.setBackgroundColor('yellow');
  } else {
    droppable.setBackgroundColor();
  }
}

function handleDragEnd(droppable: AbstractDroppable, draggableElement: HTMLElement, event: MouseEvent): void {
  if (droppable.isDrop(draggableElement, event, 10)) {
    alert('area dropped');
  }
}

window.onload = function() {
  const draggable: Draggable = new Draggable(document.getElementById('dragArea1'));
  const areaDroppable: AbstractDroppable = new AreaDroppable(document.getElementById('dropArea1'));
  const pointerDroppable: AbstractDroppable = new PointerDroppable(document.getElementById('dropArea2'));

  draggable.on(DraggableEventType.DragStart, ()=> {
    console.log('drag start');
  });

  draggable.on(DraggableEventType.Drag, (draggableElement: HTMLElement, event: MouseEvent)=> {
    handleDrag(areaDroppable, draggableElement, event);
    handleDrag(pointerDroppable, draggableElement, event);
  });

  draggable.on(DraggableEventType.DragEnd, (draggableElement: HTMLElement, event: MouseEvent)=> {
    handleDragEnd(areaDroppable, draggableElement, event);
    handleDragEnd(pointerDroppable, draggableElement, event);

    console.log('drag end');
  });
}