import React, { useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Modal from './Modal';
import { DataContext } from '../context';


const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


function ModalWrap({ modal, index }) {
	const { fn:{closeModal} } = useContext(DataContext);
  const dId = modal.id.toString();
  return (
    <Draggable draggableId={dId} index={index}>
      {provided => (
				<div 
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Modal node={modal} closeModal={closeModal} />
        </div>
      )}
    </Draggable>
  );
}

const ModalList = React.memo(function ModalList({ modals }) {
  return modals.map((modal, index) => (
    <ModalWrap modal={modal} index={index} key={modal.id} />
  ));
});

function ModalsPanel() {
	const { data:{modals}, fn:{setModals} } = useContext(DataContext);
  
  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const reordered_modals = reorder(
      modals,
      result.source.index,
      result.destination.index
    );

    setModals(reordered_modals);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <div className="modal-wrap" ref={provided.innerRef} {...provided.droppableProps}>
            <ModalList modals={modals} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ModalsPanel