import Draggable from './components/Draggable';
import Droppable from './components/Droppable';
import { DraggableEventType } from './interfaces/Draggable';

window.onload = function () {
  const draggable = new Draggable(document.getElementById('dragArea1'));
  const droppable = new Droppable(document.getElementById('dropArea1'));

  draggable.on(DraggableEventType.DragStart, ()=> {
    console.log('drag start');
  });

  draggable.on(DraggableEventType.Drag, (draggableElement: HTMLElement)=> {
    if (droppable.isIntersect(draggableElement, 10)) {
      droppable.setBackgroundColor('yellow');
    } else {
      droppable.setBackgroundColor();
    }
  });

  draggable.on(DraggableEventType.DragEnd, (draggableElement: HTMLElement)=> {
    if (droppable.isIntersect(draggableElement, 10)) {
      alert('dropped');
    }
    
    console.log('drag end');
  });
}





