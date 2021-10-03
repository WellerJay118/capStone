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
        <div className="indivproj__wrapper">
            <div className="indivproj__container">
                <div className="indivproj__header">

                <div className="indivproj__header--projtitle">{thisProject?.projName}</div>
                <div className="indivproj__header--projtitle-desc"><strong>Project Description: </strong>{thisProject?.projDesc}</div>

                {thisProject?.projOwner === sessionUser?.id ? (
                    <button className="indivproj__header--button" onClick={(e) => history.push(`/projects/${id}/edit`)}>Project Properties</button>
                    ): null}
                </div>

                <TaskComponent />
            </div>
        </div>
    )


}

export default IndivProject
