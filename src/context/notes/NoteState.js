import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const noteInitial = []
    const [notes, setNotes] = useState(noteInitial);
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            }
        });
        const res = await response.json();
        // console.log(res);
        setNotes(res);
    }

    const addNote = async (note) => {
        const { title, description, tag } = note;
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const res = await response.json();
        // console.log(res);
        setNotes(notes.concat(res.savedNote));
        return res;
    }
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            }
        });
        const newNote = notes.filter((note) => { return note._id !== id });
        setNotes(newNote);
        const res = await response.json();
        // console.log(res);
        return res;
    }

    const editNote = async (updatedNote) => {
        const { _id, title, description, tag } = updatedNote;
        // Default options are marked with *
        const response = await fetch(`${host}/api/notes/updatenote/${_id}`, {
            method: "PATCH", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag }),
        });

        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note._id === updatedNote._id ? { ...note, ...updatedNote } : note
            )
        );

        const res = await response.json();
        return res;
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;