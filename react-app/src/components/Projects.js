import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import { fetchAllProj } from "../store/project";


const ProjectsPage = () => {
    const dispatch = useDispatch();
    const projects = useSelector(state => Object.values(state.projects))
    // const sessionUser = useSelector(state => state.session.user) //can grab id from user.id to see if current user owns project

    useEffect(() => {
        dispatch(fetchAllProj())
    }, [dispatch])

    // const handleCreate = () => {

    // }

    return (
        <div className="borderBlack">
            <h1>things and stuff.</h1>
            <NavLink to='/projects/create' exact={true}>Create</NavLink>
            {projects.map((project) =>
                <div className="borderRed" key={project.id}>
                    <h4>{project.projName}</h4>
                    <h4>{project.projDesc}</h4>
                    <h5>{project.projStatus}</h5>
                </div>
            )}
        </div>
    )
}

export default ProjectsPage
