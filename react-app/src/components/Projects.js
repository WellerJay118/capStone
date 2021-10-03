import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
// import { NavLink } from "react-router-dom";
import { fetchAllProj, removeProj } from "../store/project";
import { NavLink, useHistory } from "react-router-dom"
// import { useParams } from "react-router";



const ProjectsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const { id } = useParams();
    const projects = useSelector(state => Object.values(state.projects))
    // const sessionUser = useSelector(state => state.session.user) //can grab id from user.id to see if current user owns project

    useEffect(() => {
        dispatch(fetchAllProj())
    }, [dispatch])


    const handleDelete = async(e) => {
        e.preventDefault();
        console.log("tar", e.target.id)
        await dispatch(removeProj(e.target.id))
        history.push('/projects') //may need the trailing slash
    }

    return (
        <div className="allprojects__wrapper">
            <div className="allprojects__container">
            {/* <button onClick={(e) => history.push('/projects/create')}>
                <i className="fas fa-plus-circle"></i>
            </button> */}

            {projects.map((project) =>
                <div className="allprojects__projcard" key={project?.id}>
                    <NavLink className="allprojects__projcard-nav"to={`/projects/${project?.id}`} exact={true}>
                    <div className="allprojects__projcard--header">
                        <div className="allprojects__projname">{project?.projName}</div>
                        <h4>Current Status: {project?.projStatus}</h4>
                        {/* <label>Description:</label> */}
                        {/* <div className="allprojects__projdesc">{project?.projDesc}</div> */}
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
                    {/* <button  onClick={(e) => history.push(`/projects/${project?.id}`)}>GO TO {project?.projName}</button> */}
                </div>
            )}
            </div>
        </div>
    )
}

export default ProjectsPage
