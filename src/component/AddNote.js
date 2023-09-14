import React, { useContext, useRef } from 'react'
import noteContext from '../context/notes/noteContext'
import alertContext from '../context/alert/alertContext';

const AddNote = () => {
    const title = useRef();
    const desc = useRef();
    const tag = useRef();
    const { addNote } = useContext(noteContext);
    const { showAlert } = useContext(alertContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newNote = {
            title: title.current.value,
            description: desc.current.value,
            tag: tag.current.value,
        };
        const res = await addNote(newNote);
        if (res.success) {
            showAlert({ message: "Note added successfully", type: "success" });
        } else {
            showAlert({ message: "An error occured", type: "danger" });
        }
        title.current.value = '';
        desc.current.value = '';
        tag.current.value = '';
    }

    return (
        <>
            <div className="conatainer">
                <h2>Add Your Notes</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" ref={title} minLength={3} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label">Description</label>
                        <input type="text" className="form-control" id="desc" ref={desc} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">tag</label>
                        <input type="text" className="form-control" id="tag" ref={tag} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Note</button>
                </form>
            </div>
        </>
    )
}

export default AddNote
