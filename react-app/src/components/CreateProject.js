import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { createProj } from "../store/project";


const CreateProject = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)

    const [projName, setProjName] = useState('')
    const [projDesc, setProjDesc] = useState('')
    const [projStatus, setProjStatus] = useState('')
    const [validationErrors, setValidationErrors] = useState([])

    //can be for frontend error handling
    // useEffect(() => {
    //     const errors = []

    // })

    const handleSubmit = async(e) => {
        e.preventDefault();
        const project = {
            projName,
            projDesc,
            projStatus
        }
        let createdProject = await dispatch(createProj(project))
        if (createdProject) history.push(`/projects/${createdProject.id}`)
    }

    const handleCancel = async(e) => {
        e.preventDefault();
        history.push('/projects')
    }

    return (
        <div>
            <h1>Create a Project</h1>
            <form onSubmir={handleSubmit}>
                <input
                    placeholder="Project Name"
                    type="text"
                    required
                    value={projName}
                    onChange={(e) => setProjName(e.target.value)}
                />
                <textarea
                    placeholder="Project Description"
                    required
                    value={projDesc}
                    onChange={(e) => setProjDesc(e.target.value)}
                />
                <input
                    placeholder="Project Name"
                    type="text"
                    value={projStatus}
                    onChange={(e) => setProjName(e.target.value)}
                />
            </form>
        </div>
    )
}

export default CreateProject
