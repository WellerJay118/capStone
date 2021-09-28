import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router";
import { updateProj, removeProj } from "../store/project";
import { useHistory } from "react-router-dom"




const EditProject = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();
    // const sessionUser = useSelector(state => state.session.user);
    const toEdit = useSelector(state => state?.projects[id])
    // console.log("@@@@@@@@@@@@@", toEdit)

    const [projName, setProjName] = useState(toEdit?.projName)
    const [projDesc, setProjDesc] = useState(toEdit?.projDesc)
    const [projStatus, setProjStatus] = useState(toEdit?.projStatus)

    // useEffect(() => {
    //     dispatch(updateProj(payload, id))
    // })

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

    // const handleDelete = async(e) => {
    //     e.preventDefault();
    //     await dispatch(removeProj(id))
    //     history.push('/projects') //may need the trailing slash
    // }

    const updateName = (e) => setProjName(e.target.value)
    const updateDesc = (e) => setProjDesc(e.target.value)
    const updateStatus = (e) => setProjStatus(e.target.value)


    return (
        <div className="borderBlack">
            <h1>Edit Project</h1>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Project Name"
                    type="text"
                    required
                    value={projName}
                    onChange={updateName}
                />
                <textarea
                    placeholder="Project Description"
                    required
                    value={projDesc}
                    onChange={updateDesc}
                />
                <input
                    placeholder="Project Status"
                    type="text"
                    value={projStatus}
                    onChange={updateStatus}
                />
                <button type='submit'>Edit</button>
                <button onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default EditProject
