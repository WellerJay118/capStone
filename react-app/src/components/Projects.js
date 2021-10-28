import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchAllProj } from "../store/project";
import { NavLink } from "react-router-dom"
import { fetchAllUsers } from "../store/user";
import EditProjectModal from "./modals/EditProjectModal";
import ConfirmDeleteProjectModal from "./modals/ConfirmDeleteProjectModal";
import AddProjectModal from "./modals/AddProjectModal";



const ProjectsPage = () => {
    const dispatch = useDispatch();
    const projects = useSelector(state => Object.values(state.projects))
    const sessionUser = useSelector(state => state.session.user) //can grab id from user.id to see if current user owns project

    useEffect(() => {
        dispatch(fetchAllProj())
        dispatch(fetchAllUsers())
    }, [dispatch])


    return (
        <div className="allprojects__wrapper">
            <h1>{sessionUser.firstName} {sessionUser.lastName}'s Projects</h1>
            <div className="allprojects__container">
            {projects.length < 1 ?
                <div className="allprojects__noproj">
                    Looks like you have no projects, <AddProjectModal user={sessionUser} className="modal__noproject-add" />
                </div>
                : projects?.map((project) =>

                    <div key={project?.id}>
                        <NavLink className="allprojects__projcard-nav"to={`/projects/${project?.id}`} exact={true}>
                            <div className="allprojects__projcard" key={project?.id}>
                                <div className="allprojects__projcard--header">
                                    <div className="allprojects__projname">{project?.projName}</div>
                                    <h4>Current Status: {project?.projStatus}</h4>
                                </div>
                            </div>
                        </NavLink>

                        <div className="allprojects__projcard--buttons-div">

                            <EditProjectModal id={project?.id} className="modal__allprojects-edit"/>
                            <ConfirmDeleteProjectModal id={project?.id} className="modal__allProjects-delete"/>

                        </div>
                    </div>
            )}
            </div>
        </div>
    )
}

export default ProjectsPage
