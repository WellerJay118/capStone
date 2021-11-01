import React from 'react'
import { useDispatch } from 'react-redux'
import { removeTask } from '../store/task';

function ConfirmDeleteTask({ taskId, projId, setShowModal }) {
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(removeTask(projId, taskId))
    }

    return (
        <div className="modal__deleteTask-container">
            <button className="editform__button--delete" onClick={handleDelete}>Definitely Delete this task</button>
            <button className="editform__button--delete" onClick={(e) => setShowModal(false)}>Cancel Delete</button>
        </div>
    )
}

export default ConfirmDeleteTask
