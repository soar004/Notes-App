import { React, useState, useEffect } from "react";
import { db } from "../appwrite/databases";
// import { fakeData as notes } from "../assets/fakeData.js";
import { databases } from "../appwrite/config";
import { NoteCard } from "../components/NoteCard";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const response = await db.notes.list();

    setNotes(response.documents);
  };

  return (
    <div className="notes-container">
      {notes.map(({ $id, ...noteProps }) => (
        <NoteCard key={$id} note={noteProps} />
      ))}
    </div>
  );
};

export default NotesPage;
