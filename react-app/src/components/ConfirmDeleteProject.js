import React from 'react'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { removeProj } from '../store/project'

function ConfirmDeleteProject({ id, setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(removeProj(id))
        history.push('/projects') //may need the trailing slash
    }

    return(
        <>
        {/* <div className="editform__button--confirmDelete"> */}
            <button className="editform__button--delete" onClick={handleDelete}>Definitely Delete this project</button>
            <button className="editform__button--delete" onClick={(e) => setShowModal(false)}>Cancel Delete</button>
            {/* </div> */}
        </>
    )
}

export default ConfirmDeleteProject
