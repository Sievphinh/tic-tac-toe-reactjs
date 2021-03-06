import React from "react";
import "./Square.css";

const Square = ({ value, onClick, className }) => {
  console.log(className);
  return (
    <button className={`square ${className}`} onClick={onClick}>
      {value}
    </button>
  );
};
export default Square;
