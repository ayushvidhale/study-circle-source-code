import React from "react";

function InformationAndFilter({
  list,
  options,
  removeCompleted,
  filter,
  setFilter,
}) {
  return (
    <>
      {/* additional information  */}
      <div className="flex justify-between w-full h-12 px-3 mt-2 text-sm leading-tight text-gray-700 align-middle bg-white rounded-xl shadow appearance-none dark:bg-input-dark focus:outline-none focus:shadow-outline dark:text-gray-300">
        <p className="my-auto">{list?.length || 0} tasks</p>

        {/* Filer Desktop */}
        {/* <div className="hidden my-auto gap-x-5 sm:flex">
          {options.map((item, i) => (
            <p
              className={
                (i === filter ? "text-blue-600 " : "") +
                "  hover:font-bold cursor-pointer"
              }
              key={item}
              onClick={(e) => {
                setFilter(i);
              }}
            >
              {item}
            </p>
          ))}
        </div> */}

        <p
          className="my-auto cursor-pointer hover:font-bold bg-gray-200 p-2 rounded-lg"
          onClick={(e) => removeCompleted()}
        >
          Clear
        </p>
      </div>
      {/* Filter Option Mobile */}
      <div className="flex justify-center w-full h-16 px-6 mt-5 text-sm leading-tight text-gray-700 align-middle bg-white rounded-lg shadow appearance-none gap-x-5 sm:hidden dark:bg-input-dark focus:outline-none focus:shadow-outline dark:text-gray-300 ">
        {options.map((item, i) => (
          <p
            className={
              (i === filter ? "text-blue-600 " : "") +
              "  hover:font-bold cursor-pointer my-auto"
            }
            key={item}
            onClick={(e) => {
              setFilter(i);
            }}
          >
            {item}
          </p>
        ))}
      </div>
    </>
  );
}

export default InformationAndFilter;
