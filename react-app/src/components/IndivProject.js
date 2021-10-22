import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router";
import { fetchAllProj } from "../store/project";
// import { useHistory } from "react-router-dom"
import TaskComponent from "./Tasks";
// import { Modal } from "./context/Modal";
// import EditProject from "./EditProject"
import EditProjectModal from "./modals/EditProjectModal";


const IndivProject = () => {
    const dispatch = useDispatch();
    // const history = useHistory();
    const {id} = useParams();
    // const sessionUser = useSelector(state => state.session.user)
    const thisProject = useSelector(state => (state.projects[id]))
    // const [showModal, setShowModal] = useState(false)

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

                {/* {thisProject?.projOwner === sessionUser?.id ? ( */}
                    {/* <button className="indivproj__header--button" onClick={() => setShowModal(true)}>Project Properties</button>
                    {showModal && (
                        <Modal className="modal__editProject" onClose={() => setShowModal(false)}>
                          <EditProject />
                        </Modal>
                    )} */}
                    {/* : null} */}
                </div>

                <TaskComponent />
            </div>
        </div>
    )


}

export default IndivProject
