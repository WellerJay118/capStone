import { useState } from "react";
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { createProj } from "../store/project";



const CreateProject = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const sessionUser = useSelector(state => state.session.user)

    const [projName, setProjName] = useState('')
    const [projDesc, setProjDesc] = useState('')
    // const [projStatus, setProjStatus] = useState('')
    const [validationErrors, setValidationErrors] = useState([])


    const handleSubmit = async(e) => {
        const validationErrors = []
        e.preventDefault();
        const project = {
            projName,
            projDesc,
            projStatus : "Planning"
        }

        if(projName.length > 50 || projName.length < 1) {
            validationErrors.push('Please limit your project name to between 1 and 50 characters')
        }
        if(projDesc.length > 255 || projDesc.length < 1) {
            validationErrors.push('Please limit your project description to between 1 and 255 characters')
        }
        if (validationErrors.length) {
            setValidationErrors(validationErrors)
        } else {
            let createdProject = await dispatch(createProj(project))
            if(createdProject) (
                history.push(`/projects/${createdProject.id}`)
            )
        }

    }

    const handleCancel = async(e) => {
        e.preventDefault();
        history.push('/projects')
    }

    return (
        <div className="createProjPage__wrapper">
            <div className="createProjPage__container">
                <div>
                    {validationErrors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className="createProjPage__header">Create a Project</div>
                <form onSubmit={handleSubmit}>
                    <input
                        className="createProjPage__form-input"
                        placeholder="Project Name"
                        type="text"
                        required
                        value={projName}
                        onChange={(e) => setProjName(e.target.value)}
                        />
                    <textarea
                        className="createProjPage__form-textarea"
                        placeholder="Project Description"
                        required
                        value={projDesc}
                        onChange={(e) => setProjDesc(e.target.value)}
                    />
                    <div className="createProjPage__form-buttons-div">
                        <button type='submit'>Create</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProject
