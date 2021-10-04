import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
// import { NavLink } from "react-router-dom";
import { fetchAllProj, removeProj } from "../store/project";
import { NavLink, useHistory } from "react-router-dom"
import { fetchAllUsers } from "../store/user";
// import { useParams } from "react-router";



const ProjectsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const { id } = useParams();
    const projects = useSelector(state => Object.values(state.projects))
    // const sessionUser = useSelector(state => state.session.user) //can grab id from user.id to see if current user owns project

    useEffect(() => {
        dispatch(fetchAllProj())
        dispatch(fetchAllUsers())
    }, [dispatch])


    const handleDelete = async(e) => {
        e.preventDefault();
        // console.log("tar", e.target.id)
        await dispatch(removeProj(e.target.id))
        history.push('/projects') //may need the trailing slash
    }

    return (
        <div className="allprojects__wrapper">
            <h1>My Projects</h1>
            <div className="allprojects__container">
            {projects.length < 1 ?
                <div className="allprojects__noproj">
                    Looks like you have no projects, <button onClick={(e) => history.push('/projects/create')}>Create one here!</button>
                </div>
                : projects.map((project) =>
                <div key={project?.id}>
                    <NavLink className="allprojects__projcard-nav"to={`/projects/${project?.id}`} exact={true}>
                    <div className="allprojects__projcard" key={project?.id}>
                    <div className="allprojects__projcard--header">
                        <div className="allprojects__projname">{project?.projName}</div>
                        <h4>Current Status: {project?.projStatus}</h4>
                        {/* <label>Description:</label> */}
                        {/* <div className="allprojects__projdesc">{project?.projDesc}</div> */}
                    </div>
                </div>
                    </NavLink>
                    <div className="allprojects__projcard--buttons-div">
                        <button onClick={(e) => history.push(`/projects/${project?.id}/edit`)}>
                            <i className="fas fa-edit fa-2x"></i>
                        </button>

                        <button id={project?.id} onClick={handleDelete}>
                            <i id={project?.id} className="far fa-trash-alt fa-2x"></i>
                        </button>
                    </div>
                </div>
            )}
            </div>
        </div>
    )
}

export default ProjectsPage
