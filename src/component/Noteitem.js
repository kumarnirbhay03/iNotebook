import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import alertContext from '../context/alert/alertContext';

const Noteitem = (props) => {
    const { deleteNote } = useContext(noteContext);
    const { showAlert } = useContext(alertContext);
    const { note, updateNote } = props;
    const handleDelete = async () => {
        const res = await deleteNote(note._id);
        if (res.success) {
            showAlert({ message: "Note deleted successfully", type: "success" });
        } else {
            showAlert({ message: "An error occured", type: "danger" });
        }
    }
    return (
        <>
            <div className="col-md-3">
                <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <textarea className="card-text" rows={3} cols={32} value={note.description} readOnly />
                        <div className="d-flex align-items-center">
                            <i className="fa-solid fa-pen-to-square mx-2" style={{ color: "blue" }} onClick={() => { updateNote(note) }}></i>
                            <i className="fa-solid fa-trash-can mx-2" style={{ color: "red" }} onClick={handleDelete}></i>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Noteitem

