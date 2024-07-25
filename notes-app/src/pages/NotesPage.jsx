import React from "react";
import { useContext } from "react";
import { NoteCard } from "../components/NoteCard";
import { NoteContext } from "../context/NoteContext";

const NotesPage = () => {
  const { notes } = useContext(NoteContext);
  return (
    <div className="notes-container">
      {notes.length > 0 ? (
        notes.map((note) => (
          <NoteCard key={note.$id} note={note} /> //
        ))
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );
};

export default NotesPage;
