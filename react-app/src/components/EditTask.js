import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router";
import { updateTask, fetchAllTask } from "../store/task";



const EditTask = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id, taskId } = useParams(); //the projects id
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
        dispatch(fetchAllTask(id))
    }, [dispatch, id])

    const handleCancel = async(e) => {
        e.preventDefault();
        history.push(`/projects/${id}`);
    }

    const handleEdit = async(e) => {
        //assignedTo split on space for firstName + lastName
        //use firstName + lastName to query for specific user model
        e.preventDefault();
        const taskPayload = {
            assignedTo,
            taskBody,
            taskStatus,
            taskPriority
        }
        let edittedTask = await dispatch(updateTask(taskPayload, id, taskId))
        if (edittedTask) history.push(`/projects/${id}`)
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
