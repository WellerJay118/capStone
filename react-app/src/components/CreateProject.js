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
    // const [validationErrors, setValidationErrors] = useState([])

    //can be for frontend error handling
    // useEffect(() => {
    //     const errors = []

    // })





    //limit size of the project name 50 characters?





    const handleSubmit = async(e) => {
        e.preventDefault();
        const project = {
            projName,
            projDesc,
            projStatus : "Planning"
        }
        let createdProject = await dispatch(createProj(project))
        if (createdProject) history.push(`/projects/${createdProject.id}`)

    }

    const handleCancel = async(e) => {
        e.preventDefault();
        history.push('/projects')
    }

    return (
        <div className="createProjPage__wrapper">
            <div className="createProjPage__container">
                <div>Create a Project</div>
                <form onSubmit={handleSubmit}>
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
