import React, { useRef, useEffect, useState } from "react";
import Trash from "../icons/Trash";
import { db } from "../appwrite/databases";
import Spinner from "../icons/Spinner";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils/utils";

export const NoteCard = ({ note }) => {
  const [saving, setSaving] = useState(false);

  const keyUpTimer = useRef(null);

  const [position, setPosition] = useState(JSON.parse(note.position));
  const body = bodyParser(note.body);
  const colors = bodyParser(note.colors, {
    colorBody: "#fff",
    colorHeader: "#000",
    colorText: "#000",
  });

  const [currentPosition, setCurrentPosition] = useState(position);
  const cardRef = useRef(null);
  const [selectedNote, setSelectedNote] = useState(null);

  const textAreaRef = useRef(null);
  let mouseStartPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (textAreaRef.current) {
      autoGrow(textAreaRef);
    }
    if (cardRef.current) {
      setZIndex(cardRef.current);
    }
  }, []);

  const mouseDown = (e) => {
    mouseStartPos.current = { x: e.clientX, y: e.clientY };

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);

    setZIndex(cardRef.current);

    setSelectedNote(note);
  };

  const mouseMove = (e) => {
    const mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    setPosition(newPosition);
  };

  const mouseUp = async () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    const newPosition = setNewOffset(cardRef.current);
    saveData("position", newPosition);
  };

  const saveData = async (key, value) => {
    const payload = { [key]: JSON.stringify(value) };
    try {
      await db.notes.update(note.$id, payload);
    } catch (error) {
      console.error(error);
    }
    setSaving(false);
  };

  const handleKeyUp = () => {
    setSaving(true);
    if (keyUpTimer.current) {
      clearTimeout(keyUpTimer.current);
    }

    keyUpTimer.current = setTimeout(() => {
      saveData("body", textAreaRef.current.value);
    }, 2000);
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
        {saving && (
          <div className="card-saving">
            <Spinner color={colors.colorText} />
            <span style={{ color: colors.colorText }}>Saving...</span>
          </div>
        )}
      </div>

      <div className="card-body">
        <textarea
          onKeyUp={handleKeyUp}
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
