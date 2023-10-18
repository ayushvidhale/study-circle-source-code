import React, { useState } from "react";
// import { list as data } from "./data";
import {AiOutlineEnter  } from "react-icons/ai";


function InputArea({ handleSubmit }) {
  const [input, setInput] = useState("");

  return (
    <div
    id="#input"
    className="flex w-full h-12 px-3 my-3 text-lg leading-tight text-gray-700 align-middle bg-white rounded shadow appearance-none dark:bg-input-dark focus:outline-none focus:shadow-outline"
  >
    <form
      className=""
      onSubmit={(e) => {
        handleSubmit(e, input);
        setInput("");
      }}
    >
      <div className="flex justify-between my-auto">
        <input
          className="border-none mt-2 input pr-8 dark:bg-input-dark dark:text-gray-300 text-lg w-full"
          id="username"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What to do ?"
        />
        <button className="p-2 border-none cursor-default place-content-center">
          <AiOutlineEnter className="text-2xl pt-2" />
        </button>
      </div>
    </form>
  </div>

  );
}

export default InputArea;
