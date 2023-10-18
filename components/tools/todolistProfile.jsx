import React, { useState, useEffect } from "react";
import styles from "./parts.module.css";
import InputArea from "../todo/InputArea";
import ListOfActivity from "../todo/ListOfActivity";

const data = [];

function TodoList({ roomName }) {
  const [list, setList] = useState(() => {
    if (typeof localStorage !== "undefined") {
      const storedData = localStorage.getItem(`todolist-${roomName}`);
      return storedData ? JSON.parse(storedData) : data;
    } else {
      return data;
    }
  });

  const [filter, setFilter] = useState(0);

  const [currentId, setCurrent] = useState(1);

  useEffect(() => {
    localStorage.setItem(`todolist-${roomName}`, JSON.stringify(list));
  }, [list, roomName]);

  const handleSubmit = (e, input) => {
    e.preventDefault();

    if (input === "") {
      return;
    }

    setList((prev) => [
      ...prev,
      { text: input, status: "onProgress", id: `${currentId + 1}-${input}` },
    ]);
    setCurrent((prevId) => prevId + 1);
  };

  const checked = (e) => {
    const idx = e.currentTarget.dataset.index;
    const newList = [...list];
    newList[idx].status = newList[idx].status === "onProgress" ? "Completed" : "onProgress";
    setList(newList);
  };

  const removeOne = (e) => {
    const idx = e.currentTarget.dataset.index;
    const newList = [...list];
    newList.splice(idx, 1);
    setList(newList);
  };

  const removeCompleted = () => {
    const newList = list.filter((item) => item.status === "onProgress");
    setList(newList);
  };

  function handleDrag(result) {
    if (!result.destination) return;
    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setList(items);
  }

  const completedCount = list.filter((item) => item.status === "Completed").length;
  const leftCount = list.filter((item) => item.status === "onProgress").length;

  return (
    <>
        <div className={`p-2 bg-gray-50 rounded-2xl text-left`}>
          <div className="flex justify-between align-middle">
            <h1 className="font-bold text-black ml-1 mt-1">To-Do</h1>
          </div>
          <InputArea handleSubmit={handleSubmit} />
          <ListOfActivity
            list={list}
            filter={filter}
            checked={checked}
            removeOne={removeOne}
            handleDrag={handleDrag}
          />
        </div>
    </>
  );
}

export default TodoList;
