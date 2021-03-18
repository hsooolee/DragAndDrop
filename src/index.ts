import Draggable from './components/Draggable';
import AreaDroppable from './components/Droppable/AreaDroppable';
import PointerDroppable from './components/Droppable/PointerDroppable';
import { DraggableEventType } from './interfaces/Draggable';

window.onload = function () {
  const draggable = new Draggable(document.getElementById('dragArea1'));
  // const areaDroppable = new AreaDroppable(document.getElementById('dropArea1'));
  const areaDroppable = new PointerDroppable(document.getElementById('dropArea1'));

  draggable.on(DraggableEventType.DragStart, ()=> {
    console.log('drag start');
  });

  draggable.on(DraggableEventType.Drag, (draggableElement: HTMLElement, event: MouseEvent)=> {
    if (areaDroppable.isIntersect(draggableElement, event, 10)) {
      areaDroppable.setBackgroundColor('yellow');
    } else {
      areaDroppable.setBackgroundColor();
    }
  });

  draggable.on(DraggableEventType.DragEnd, (draggableElement: HTMLElement, event: MouseEvent)=> {
    if (areaDroppable.isIntersect(draggableElement, event, 10)) {
      alert('dropped');
    }
    
    console.log('drag end');
  });
}





