import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { updateTask, fetchAllTask } from "../store/task";



const EditTask = ({ taskId, projId, setShowModal }) => {
    const dispatch = useDispatch();
    const allUsers = useSelector(state => Object.values(state.users))
    const task = useSelector(state => state.tasks[taskId])


    const selStatus = ["Planning", "In Progress", "Waiting Approval", "Approved", "Completed"]
    const selPriority = ["Idea", "Want", "Low", "Medium", "High", "Immediate"]

    const [assignedTo, setAssignedTo] = useState(task?.assignedTo);
    const [taskBody, setTaskBody] = useState(task?.taskBody);
    const [taskStatus, setTaskStatus] = useState(task?.taskStatus);
    const [taskPriority, setTaskPriority] = useState(task?.taskPriority);

//must go from projects page to the edit task page for the state to be loaded correctly.
    useEffect(() => {
        dispatch(fetchAllTask(projId))
    }, [dispatch, projId])

    const handleCancel = async(e) => {
        e.preventDefault();
        setShowModal(false);
    }

    const handleEdit = async(e) => {
        // e.preventDefault(); //taking this out was a workaround to the state not updating on the close of a modal for submission.
        const taskPayload = {
            assignedTo,
            taskBody,
            taskStatus,
            taskPriority
        }
        let edittedTask = await dispatch(updateTask(taskPayload, projId, taskId))
        if (edittedTask) {
            setShowModal(false)
        }
    }





    return (
        <div className="editTaskForm__wrapper">
            <div className="editTaskForm__container">
                <h1>Task Edit</h1>
                <form onSubmit={handleEdit}>
                    <select
                        className="editTaskForm__inputs"
                        value={assignedTo}
                        onChange={(e) => {
                            const userSelect = e.target.value
                            setAssignedTo(userSelect)
                        }}>
                            {allUsers.map(user => (
                                <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                            ))}
                        </select>
                    <textarea
                        className="editTaskForm__textarea"
                        placeholder="Task Description"
                        required
                        value={taskBody}
                        onChange={(e) => setTaskBody(e.target.value)}
                    />
                    <select
                        className="editTaskForm__inputs"
                        value={taskPriority}
                        onChange={(e) => {
                            const prioritySel = e.target.value
                            setTaskPriority(prioritySel)
                        }}>
                            {selPriority.map((element, idx) => (
                                <option key={idx} value={element}>{element}</option>
                            ))}
                    </select>
                    <select
                        className="editTaskForm__inputs"
                        value={taskStatus}
                        onChange={(e) => {
                            const statusSel = e.target.value
                            setTaskStatus(statusSel)
                        }}>
                            {selStatus.map((element, idx) => (
                                <option key={idx} value={element}>{element}</option>
                            ))}
                    </select>
                    <div>
                        <button className="editTaskForm__button" type='submit'>Submit Changes</button>
                        <button className="editTaskForm__button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTask
