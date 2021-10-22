import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
// import { useParams } from "react-router";
import { updateProj, removeProj, fetchAllProj } from "../store/project";
import { useHistory } from "react-router-dom"


const EditProject = ({ id, setShowModal }) => {
    const dispatch = useDispatch();
    // const { id } = useParams();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const toEdit = useSelector(state => state?.projects[id])

    const [projName, setProjName] = useState(toEdit?.projName)
    const [projDesc, setProjDesc] = useState(toEdit?.projDesc)
    const [projStatus, setProjStatus] = useState(toEdit?.projStatus)
    const [validationErrors, setValidationErrors] = useState([])


    //NEEDED ACCESS TO PROJECTS SLICE OF STATE
    useEffect(() => {
        dispatch(fetchAllProj())
    }, [dispatch])

    const handleSubmit = async(e) => {
        e.preventDefault();
        const validationErrors = []
        const projPayload = {
            projName,
            projDesc,
            projStatus
        }
        if(projName.length > 50 || projName.length < 1) validationErrors.push('Please limit your project name to between 1 and 50 characters')
        if(projDesc.length > 255 || projDesc.length < 1) validationErrors.push('Please limit your project description to between 1 and 255 characters')
        if (validationErrors.length) {
            setValidationErrors(validationErrors)
        } else {
            let editedProject = await dispatch(updateProj(projPayload, id))
            if (editedProject) {
                // history.push(`/projects/${editedProject.id}`)
                setShowModal(false)
            }

        }

    }

    const handleCancel = async(e) => {
        e.preventDefault();
        // history.push(`/projects/${id}`);
        setShowModal(false)
    }

    const handleDelete = async(e) => {
        e.preventDefault();
        await dispatch(removeProj(id))
        history.push('/projects') //may need the trailing slash
    }

    const updateName = (e) => setProjName(e.target.value)
    const updateDesc = (e) => setProjDesc(e.target.value)
    // const updateStatus = (e) => setProjStatus(e.target.value)

    const selStatus = ["Planning", "In Progress", "Waiting Approval", "Approved", "Completed"]



    return (
        <div className="editform__wrapper">
            <div className="editform__container">
                <div>
                    {validationErrors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>

                <div className="editform__header">
                    <div className="editform__header-div"><p>You are editing the project: </p>{toEdit?.projName}</div>
                    {sessionUser.id === toEdit?.projOwner ?
                            <button id="editform__button--delete" onClick={handleDelete}>
                                Delete this project
                            </button>
                         :null}
                </div>

                <form className="editform__form">
                    <label>Name/Title:</label>
                    <input
                        placeholder="Project Name"
                        type="text"
                        required
                        value={projName}
                        onChange={updateName}
                    />
                    <label>Status</label>
                    <select
                        className="task__createform--dd-select"
                        value={projStatus}
                        onChange={(e) => {
                            const statusSelect = e.target.value;
                            setProjStatus(statusSelect)
                    }}>
                        {selStatus.map((element, idx) => (
                            <option key={idx} value={element}>
                                {element}
                            </option>
                        ))}
                    </select>
                    {/* <input
                        placeholder="Project Status"
                        type="text"
                        value={projStatus}
                        onChange={updateStatus}
                    /> */}
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
