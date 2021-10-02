import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
// import { NavLink } from "react-router-dom";
import { fetchAllProj } from "../store/project";
import { useHistory } from "react-router-dom"
// import { useParams } from "react-router";



const ProjectsPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const { id } = useParams();
    const projects = useSelector(state => Object.values(state.projects))
    const sessionUser = useSelector(state => state.session.user) //can grab id from user.id to see if current user owns project

    useEffect(() => {
        dispatch(fetchAllProj())
    }, [dispatch])

    // const handleDelete = async(e) => {
    //     e.preventDefault();
    //     console.log("tar", e.target.id)
    //     await dispatch(removeProj(e.target.id))
    //     history.push('/projects') //may need the trailing slash
    // }

    return (
        <div className="borderBlack">

            {/* <button onClick={(e) => history.push('/projects/create')}>
                <i className="fas fa-plus-circle"></i>
            </button> */}

            {projects.map((project) =>
                <div className="borderRed" key={project.id}>
                    {project?.projOwner === sessionUser?.id ? (
                            <button onClick={(e) => history.push(`/projects/${project?.id}/edit`)}>
                                <i className="fas fa-edit"></i>
                            </button>
                    ): null}
                    {/* {sessionUser.id === project.projOwner ? */}
                    {console.log("id", project.id)}
                        {/* <button id={project.id} onClick={handleDelete}>
                            <i className="far fa-trash-alt"></i>
                        </button> */}
                    {/* // :null} */}
                    <h4>Title{project.projName}</h4>
                    <h4>Description{project.projDesc}</h4>
                    <h5>{project.projStatus}</h5>
                    <button  onClick={(e) => history.push(`/projects/${project.id}`)}>GO TO {project.projName}</button>
                </div>
            )}
        </div>
    )
}

export default ProjectsPage
