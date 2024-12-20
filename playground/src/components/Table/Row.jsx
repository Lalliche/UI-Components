"use client";
import React from "react";

const Row = ({
  data,
  structure,
  clickedRowId,
  handleRowClick,
  onClickContent,
}) => {
  const handleClick = () => {
    handleRowClick(data.id); 
  };

  return (
    <>
      <div
        className="flex flex-row items-center gap-[0.5em] w-full border-b-2 border-[#EAECF0] py-4 px-4 hover:bg-[#F9FAFB] cursor-pointer"
        onClick={handleClick}
      >
        {structure.map((column, index) => {
          const value = column.field
            ? column.field.split(".").reduce((acc, key) => acc?.[key], data)
            : null;

          return (
            <div key={index} className={`flex ${column.width}`}>
              {column.content(value, data)}
            </div>
          );
        })}
      </div>

      {clickedRowId === data.id &&
        onClickContent
          .filter((content) => content.condition(data))
          .map((content, index) => (
            <div key={index} className="py-2 px-4 bg-[#F9FAFB]">
              {content.render(data)}
            </div>
          ))}
    </>
  );
};

export default Row;
