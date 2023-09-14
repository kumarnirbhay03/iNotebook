import React, { useContext, useEffect, useState, useRef } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import alertContext from '../context/alert/alertContext';

const Notes = () => {

    const { notes, getNotes, editNote } = useContext(noteContext);
    const ref = useRef(null);
    const [id, setId] = useState();
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const tagRef = useRef(null);
    const { showAlert } = useContext(alertContext);
    const updateNote = (note) => {
        // console.log("clicked")
        // e.preventdefault();
        ref.current.click();
        setId(note._id);
        if (titleRef.current) titleRef.current.value = note.title;
        if (descRef.current) descRef.current.value = note.description;
        if (tagRef.current) tagRef.current.value = note.tag;
    };

    const handleEditNote = async (e) => {
        e.preventDefault();
        const updatedNote = {
            _id: id,
            title: titleRef.current.value,
            description: descRef.current.value,
            tag: tagRef.current.value
        }
        const res = await editNote(updatedNote);
        if (res.success) {
            showAlert({ message: "Note updated successfully", type: "success" });
        } else {
            showAlert({ message: "An error occured", type: "danger" });
        }
        ref.current.click();
        console.log(notes);
    }
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleEditNote}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" ref={titleRef} minLength={3} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="desc" className="form-label">Description</label>
                                    <textarea className="form-control" id="desc" ref={descRef} minLength={5} rows={8} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">tag</label>
                                    <input type="text" className="form-control" id="tag" ref={tagRef} required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary">Update Note</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="container row my-3">
                <h2>Your Notes</h2>
                {notes.length === 0 && <p>No Notes to display</p>}
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} updateNote={updateNote} />
                })}
            </div>
        </>
    )
}

export default Notes
