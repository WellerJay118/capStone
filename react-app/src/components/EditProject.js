import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router";
import { updateProj, removeProj, fetchAllProj } from "../store/project";
import { useHistory } from "react-router-dom"




const EditProject = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const toEdit = useSelector(state => state?.projects[id])

    const [projName, setProjName] = useState(toEdit?.projName)
    const [projDesc, setProjDesc] = useState(toEdit?.projDesc)
    const [projStatus, setProjStatus] = useState(toEdit?.projStatus)

    //NEEDED ACCESS TO PROJECTS SLICE OF STATE
    useEffect(() => {
        dispatch(fetchAllProj())
    }, [dispatch])

    const handleSubmit = async(e) => {
        e.preventDefault();
        const projPayload = {
            projName,
            projDesc,
            projStatus
        }
        let editedProject = await dispatch(updateProj(projPayload, id))
        if (editedProject) history.push(`/projects/${editedProject.id}`)
    }

    const handleCancel = async(e) => {
        e.preventDefault();
        history.push(`projects/${id}`);
    }

    const handleDelete = async(e) => {
        e.preventDefault();
        await dispatch(removeProj(id))
        history.push('/projects') //may need the trailing slash
    }

    const updateName = (e) => setProjName(e.target.value)
    const updateDesc = (e) => setProjDesc(e.target.value)
    const updateStatus = (e) => setProjStatus(e.target.value)


    return (
        <div className="editform__wrapper">
            <div className="editform__container">

                <div className="editform__header">
                    {/* {toEdit === undefined ? history.push(`/projects/${id}`) : null} --THIS IS WORKAROUND TO USEFFECT. NO IDEA WHY IT WOULD BE A GOOD IDEA */}
                    <h1>You are editting the project: {toEdit?.projName}</h1>
                    {sessionUser.id === toEdit?.projOwner ?
                            <button id="editform__button--delete" onClick={handleDelete}>
                                Delete this project
                            </button>
                         :null}
                </div>

                <form className="editform__form">
                    <label>Title:</label>
                    <input
                        placeholder="Project Title"
                        type="text"
                        required
                        value={projName}
                        onChange={updateName}
                    />
                    <label>Status</label>
                    <input
                        placeholder="Project Status"
                        type="text"
                        value={projStatus}
                        onChange={updateStatus}
                    />
                    <label>Description</label>
                    <textarea
                        // className="editform__form--desc"
                        placeholder="Project Description"
                        required
                        value={projDesc}
                        onChange={updateDesc}
                    />

                </form>

                <div className="editform__buttons">
                    <button id="editform__button" onClick={handleSubmit}>
                        Submit
                    </button>

                    <button id="editform__button" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditProject
