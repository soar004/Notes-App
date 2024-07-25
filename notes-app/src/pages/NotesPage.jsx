import React, { useState, useEffect } from "react";
import { db } from "../appwrite/databases";
import { NoteCard } from "../components/NoteCard";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch notes from the database on component mount
    const fetchNotes = async () => {
      try {
        const response = await db.notes.list();
        console.log("Notes response:", response); // Check the response structure
        if (response && response.documents) {
          setNotes(response.documents); // Set the notes state with fetched documents
        } else {
          console.warn("No notes found or response format is incorrect.");
        }
      } catch (error) {
        console.error("Failed to fetch notes:", error); // Log errors for debugging
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="notes-container">
      {notes.length > 0 ? (
        notes.map((note) => (
          <NoteCard key={note.$id} note={note} setNotes={setNotes} /> //
        ))
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );
};

export default NotesPage;
