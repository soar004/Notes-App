import React from "react";
import { fakeData as notes } from "../assets/fakeData.js";
import { NoteCard } from "../components/NoteCard";

const NotesPage = () => {
  return (
    <div className="notes-container">
      {notes.map(({ $id, ...noteProps }) => (
        <NoteCard key={$id} note={noteProps} />
      ))}
    </div>
  );
};

export default NotesPage;
