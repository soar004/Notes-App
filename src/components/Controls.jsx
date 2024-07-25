import React from "react";
import colors from "../assets/colors.json";
import Color from "./Color.jsx";

const Controls = () => {
  return (
    <div id="controls">
      <AddButton />
      {colors.map((color) => (
        <Color key={color.id} color={color} />
      ))}
    </div>
  );
};

export default Controls;
