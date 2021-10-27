import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router";
import { fetchAllProj } from "../store/project";
import TaskComponent from "./Tasks";
import EditProjectModal from "./modals/EditProjectModal";


const IndivProject = () => {
    const dispatch = useDispatch();
    const {id} = useParams();

    const thisProject = useSelector(state => (state.projects[id]))

    useEffect(() => {
        dispatch(fetchAllProj())
    }, [dispatch])


    return (
        <div className="indivproj__wrapper">
            <div className="indivproj__container">
                <div className="indivproj__header">
                    <h1>Tasks</h1>

                <div className="indivproj__header--projtitle">{thisProject?.projName}</div>
                <div className="indivproj__header--projtitle-desc"><strong>Project Description: </strong>{thisProject?.projDesc}</div>

                <EditProjectModal id={id} />

                </div>

                <TaskComponent />
            </div>
        </div>
    )


}

export default IndivProject
