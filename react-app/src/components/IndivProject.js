import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router";
import { fetchAllProj } from "../store/project";
import { useHistory } from "react-router-dom"
import TaskComponent from "./Tasks";



const IndivProject = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();
    const sessionUser = useSelector(state => state.session.user)
    const thisProject = useSelector(state => (state.projects[id]))

    useEffect(() => {
        dispatch(fetchAllProj())
    }, [dispatch])

    return (
        <div className="borderBlack">
            <h1>taskComponent</h1>
            <TaskComponent />
            <h1>From individual project</h1>
            {/* {console.log('@@@@@@@@@@@@@@@@@@',thisProject.id)} */}
            <h4>{thisProject?.projDesc}</h4>
            {thisProject?.projOwner === sessionUser?.id ? (
                        <button onClick={(e) => history.push(`/projects/${id}/edit`)}>Edit project</button>
                    ): null}
        </div>
    )


}

export default IndivProject
