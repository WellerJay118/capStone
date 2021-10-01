import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
// import { NavLink } from "react-router-dom";
import { fetchAllProj, removeProj } from "../store/project";
import { useHistory } from "react-router-dom"
import { useParams } from "react-router";



const ProjectsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const projects = useSelector(state => Object.values(state.projects))
    const sessionUser = useSelector(state => state.session.user) //can grab id from user.id to see if current user owns project

    useEffect(() => {
        dispatch(fetchAllProj())
    }, [dispatch])

    const handleDelete = async(e) => {
        e.preventDefault();
        await dispatch(removeProj(e.target.id))
        history.push('/projects') //may need the trailing slash
    }

    return (
        <div className="borderBlack">
            <h1>ALL PROJ COMP</h1>
            {/* <NavLink to='/projects/create' exact={true}>Create</NavLink> */}
            <button onClick={(e) => history.push('/projects/create')}>New Project</button>
            {projects.map((project) =>
                <div className="borderRed" key={project.id}>
                    {project?.projOwner === sessionUser?.id ? (
                            <button onClick={(e) => history.push(`/projects/${project?.id}/edit`)}>Edit project</button>
                    ): null}
                    <h4>{project.projName}</h4>
                    <h4>{project.projDesc}</h4>
                    <h5>{project.projStatus}</h5>
                    <button  onClick={(e) => history.push(`/projects/${project.id}`)}>GO TO {project.projName}</button>
                    {sessionUser.id === project.projOwner ?
                        <button id={project.id} onClick={handleDelete}>Delete</button>
                    :null}
                </div>
            )}
        </div>
    )
}

export default ProjectsPage
