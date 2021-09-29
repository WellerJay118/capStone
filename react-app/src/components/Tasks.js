import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router";
import { createTask, fetchAllTask } from "../store/task";



const TaskComponent = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    // const sessionUser = useSelector(state => state.session.user)
    const tasks = useSelector(state => Object.values(state.tasks))

    const [assignedTo, setAssignedTo] = useState('');
    const [taskBody, setTaskBody] = useState('');
    const [taskStatus, setTaskStatus] = useState('');
    const [taskPriority, setTaskPriority] = useState('');

    useEffect(() => {
        dispatch(fetchAllTask(id))
    }, [dispatch, id])

    const handleCancel = async(e) => {
        e.preventDefault();
        history.push(`projects/${id}`);
    }

    const handleCreate = async(e) => {
        e.preventDefault();
        const taskPayload = {
            assignedTo,
            taskBody,
            taskStatus,
            taskPriority
        }
        let createdTask = await dispatch(createTask(taskPayload, id))
        if (createdTask) history.push(`/projects/${id}`)
    }


    return (
        <div className="borderBlack">
            <h1>ALL TASKS</h1>
            {tasks.map((task) => (
                <div className="borderRed" key={task.id}>
                   <h4>{task.taskBody}</h4>
                </div>
            ))}


            <h1>CREATE TASK</h1>
            <form onSubmit={handleCreate}>
                <input
                    placeholder="Assigned"
                    type="text"
                    required
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                />
                <textarea
                    placeholder="Task Description"
                    required
                    value={taskBody}
                    onChange={(e) => setTaskBody(e.target.value)}
                />
                <input
                    placeholder="Task Priority"
                    type="text"
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value)}
                />
                <input
                    placeholder="Task Status"
                    type="text"
                    value={taskStatus}
                    onChange={(e) => setTaskStatus(e.target.value)}
                />
                <button type='submit'>Create</button>
                <button onClick={handleCancel}>Cancel</button>
            </form>


        </div>

    )
}

export default TaskComponent
