import React, { useRef, useEffect, useState } from "react";
import Trash from "../icons/Trash";
import { setNewOffset, autoGrow, setZIndex } from "../utils/utils";

export const NoteCard = ({ note }) => {
  let body, position, colors;

  try {
    body = JSON.parse(note.body);
  } catch (error) {
    console.error("Failed to parse note body:", note.body);
    body = ""; // Fallback to an empty string or handle it as needed
  }

  try {
    position = JSON.parse(note.position);
  } catch (error) {
    console.error("Failed to parse note position:", note.position);
    position = { x: 0, y: 0 }; // Fallback to a default position
  }

  try {
    colors = JSON.parse(note.colors);
  } catch (error) {
    console.error("Failed to parse note colors:", note.colors);
    colors = { colorBody: "#fff", colorHeader: "#000", colorText: "#000" }; // Fallback to default colors
  }

  const [currentPosition, setCurrentPosition] = useState(position);
  const cardRef = useRef(null);
  const textAreaRef = useRef(null);
  const mouseStartPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (textAreaRef.current) {
      autoGrow(textAreaRef);
    }
  }, [body]);

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  };

  const mouseDown = (e) => {
    mouseStartPos.current = { x: e.clientX, y: e.clientY };

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);

    setZIndex(cardRef.current);
  };

  const mouseMove = (e) => {
    const mouseMoveDir = {
      x: mouseStartPos.current.x - e.clientX,
      y: mouseStartPos.current.y - e.clientY,
    };

    mouseStartPos.current = { x: e.clientX, y: e.clientY };

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setCurrentPosition(newPosition);
  };

  return (
    <div
      ref={cardRef}
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${currentPosition.x}px`,
        top: `${currentPosition.y}px`,
      }}
    >
      <div
        onMouseDown={mouseDown}
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
      >
        <Trash />
      </div>

      <div className="card-body">
        <textarea
          ref={textAreaRef}
          style={{ color: colors.colorText }}
          defaultValue={body}
          onInput={() => textAreaRef.current && autoGrow(textAreaRef)}
          onFocus={() => setZIndex(cardRef.current)}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
