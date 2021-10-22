import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { createTask } from "../store/task";




const AddTask = ({ id, setShowModal }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const allUsers = useSelector(state => Object.values(state.users))


    const selStatus = ["Planning", "In Progress", "Waiting Approval", "Approved", "Completed"]
    const selPriority = ["Idea", "Want", "Low", "Medium", "High", "Immediate"]

    const [assignedTo, setAssignedTo] = useState(sessionUser.id);
    const [taskBody, setTaskBody] = useState('');
    const [taskStatus, setTaskStatus] = useState(selStatus[0]);
    const [taskPriority, setTaskPriority] = useState(selPriority[0]);
    const [errors, setErrors] = useState([])

    const handleCancel = async(e) => {
        e.preventDefault();
        setShowModal(false)
    }

    const handleCreate = async(e) => {
        e.preventDefault();
        const errors = [];
        const taskPayload = {
            assignedTo,
            taskBody,
            taskStatus,
            taskPriority
        }
        if(taskBody.length < 1) errors.push("Please put a description for the task")
        if(taskBody.length > 500) errors.push("Please use no more than 500 characters for the task description")
        if(errors.length) {
            setErrors(errors)
        } else {
            await dispatch(createTask(taskPayload, id))
            setAssignedTo(sessionUser.id)
            setTaskBody("")
            setTaskStatus(selStatus[0])
            setTaskPriority(selPriority[0])
        }
    }

    return(
        <div className="task__createform">
            <div className="task__createform--errors">
                {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
                ))}
            </div>
            <form>
                <div className="task__createform--left">
                    <label>Assignee: </label>
                    <select
                    className="task__createform--dd-select"
                    value={assignedTo}
                    onChange={(e) => {
                        const userSelect = e.target.value
                        setAssignedTo(userSelect)
                    }}>
                        {allUsers.map(user => (
                            <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                        ))}
                    </select>
                    <label>Priority: </label>
                    <select
                    className="task__createform--dd-select"
                    value={taskPriority}
                    onChange={(e) => {
                        const prioritySelect = e.target.value;
                        setTaskPriority(prioritySelect)
                    }}>
                        {selPriority.map((element, idx) => (
                            <option key={idx} value={element}>
                                {element}
                            </option>
                        ))}
                    </select>
                    <label>Status: </label>
                    <select
                        className="task__createform--dd-select"
                        value={taskStatus}
                        onChange={(e) => {
                            const statusSelect = e.target.value;
                            setTaskStatus(statusSelect)
                    }}>
                        {selStatus.map((element, idx) => (
                            <option key={idx} value={element}>
                                {element}
                            </option>
                        ))}
                    </select>
                </div>

                <textarea
                    className="task__create--textarea"
                    placeholder="Task Description"
                    required
                    value={taskBody}
                    onChange={(e) => setTaskBody(e.target.value)}
                />
            </form>
            <div className="task__createform--buttons">
                <button onClick={handleCreate}>Submit</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
         </div>
    )
}

export default AddTask
