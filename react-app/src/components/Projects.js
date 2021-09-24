import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchAllProj } from "../store/project";


const ProjectsPage = () => {
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects)
    const user = useSelector(state => state.session.user) //can grab id from user.id to see if current user owns project

    useEffect(() => {
        dispatch(fetchAllProj())
    }, [dispatch])

    return (
        <div>
            <h1>things and stuff.</h1>
        </div>
    )
}

export default ProjectsPage
