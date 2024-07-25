import React, { useRef, useEffect, useState, useContext } from "react";
import DeleteButton from "./DeleteButton";
import { db } from "../appwrite/databases";
import Spinner from "../icons/Spinner";
import { setNewOffset, autoGrow, setZIndex, bodyParser } from "../utils/utils";
import { NoteContext } from "../context/NoteContext";

export const NoteCard = ({ note }) => {
  const mouseStartPos = useRef({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const textAreaRef = useRef(null);

  const { setSelectedNote } = useContext(NoteContext);

  const [saving, setSaving] = useState(false);
  const keyUpTimer = useRef(null);

  const [position, setPosition] = useState(JSON.parse(note.position));
  const body = bodyParser(note.body);
  const colors = bodyParser(note.colors, {
    colorBody: "#fff",
    colorHeader: "#000",
    colorText: "#000",
  });

  useEffect(() => {
    autoGrow(textAreaRef);
    setZIndex(cardRef.current);
  }, []);

  const mouseDown = (e) => {
    if (e.target.className === "card-header") {
      mouseStartPos.current = { x: e.clientX, y: e.clientY };

      setZIndex(cardRef.current);
      setSelectedNote(note);
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    }
  };

  const mouseMove = (e) => {
    const mouseMoveDir = {
      x: mouseStartPos.current.x - e.clientX,
      y: mouseStartPos.current.y - e.clientY,
    };

    mouseStartPos.current = { x: e.clientX, y: e.clientY };

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

  useEffect(() => {
    cardRef.current.style.left = `${position.x}px`;
    cardRef.current.style.top = `${position.y}px`;
  }, [position]);

  return (
    <div
      ref={cardRef}
      className="card"
      style={{
        backgroundColor: colors.colorBody,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={mouseDown}
    >
      <div
        className="card-header"
        style={{ backgroundColor: colors.colorHeader }}
      >
        <DeleteButton noteId={note.$id} />
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
          onFocus={() => {
            setZIndex(cardRef.current);
            setSelectedNote(note);
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default NoteCard;
