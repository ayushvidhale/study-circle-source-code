import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function ListOfActivity({ list, filter, checked, removeOne, handleDrag }) {
  return (
    <DragDropContext onDragEnd={(e) => handleDrag(e)}>
      <Droppable droppableId="Activity">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {list && list?.map((item, idx) => {
              if (
                filter === 0 ||
                (filter === 1 && item.status === "onProgress") ||
                (filter === 2 && item.status === "Completed")
              )
                return (
                  <Draggable key={item.id} draggableId={item.id} index={idx}>
                    {(provided) => (
                      <div
                        // id="#list"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={
                          `flex w-full h-16 px-3 text-lg leading-tight text-gray-700 align-middle bg-white dark:bg-input-dark  shadow appearance-none focus:outline-none focus:shadow-outline dark:text-gray-300  ` +
                          (idx === 0 ? " rounded-t-lg" : "")
                        }
                      >
                        <button
                          data-index={idx}
                          className="w-6 h-6 my-auto mr-2"
                          onClick={(e) => checked(e)}
                        >
                          <img
                            src={
                              item.status === "onProgress" ? "../icons/circle.svg" : "../icons/circle-cheked.svg"
                            }
                            alt="LogoCentang"
                            className="h-4 w-4"
                          />
                        </button>
                        <p
                          data-index={idx}
                          className="flex flex-1 w-full my-auto align-middle border-none cursor-pointer input hover:text-blue-600"
                          onClick={(e) => checked(e)}
                        >
                          {item.status === "Completed" ? (
                            <strike>{item.text}</strike>
                          ) : (
                            item.text
                          )}
                          {/* {item.text} {idx} */}
                        </p>

                        <button
                          className="w-6 h-6 my-auto ml-6 "
                          data-index={idx}
                          onClick={(e) => removeOne(e)}
                        >
                          <img src="../icons/icon-cross.svg" alt="LogoCross" />
                        </button>
                      </div>
                    )}
                  </Draggable>
                );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ListOfActivity;
