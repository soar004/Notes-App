import React from "react";
import { useContext } from "react";
import { NoteCard } from "../components/NoteCard";
import { NoteContext } from "../context/NoteContext";
import Controls from "../components/Controls";

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

      <Controls />
    </div>
  );
};

export default NotesPage;
