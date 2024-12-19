import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center absolute">
      <div className="w-[2em] h-[2em] border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
