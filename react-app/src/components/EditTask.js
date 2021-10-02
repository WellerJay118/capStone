import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router";
import { fetchAllProj } from "../store/project";
import { updateTask, fetchAllTask } from "../store/task";



const EditTask = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id, taskId} = useParams(); //the projects id
    // const tasks = useSelector(state => Object.values(state.tasks))
    const task = useSelector(state => state.tasks[taskId])
    // const projectName = useSelector(state => Object.values(state.projects))
    // console.log(id)
    // console.log("$#$#$#$#", projectName)


    const [assignedTo, setAssignedTo] = useState(task?.assignedTo);
    const [taskBody, setTaskBody] = useState(task?.taskBody);
    const [taskStatus, setTaskStatus] = useState(task?.taskStatus);
    const [taskPriority, setTaskPriority] = useState(task?.taskPriority);

//must go from projects page to the edit task page for the state to be loaded correctly.
    useEffect(() => {
        dispatch(fetchAllTask(id))
        // dispatch(fetchAllTask())
    }, [dispatch, id])

    const handleCancel = async(e) => {
        e.preventDefault();
        history.push(`/projects/${id}`);
    }

    const handleEdit = async(e) => {
        //assignedTo split on space for firstName + lastName
        //use firstName + lastName to query for specific user model
        e.preventDefault();
        console.log(id)
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
        <div className="borderRed">
            <h1>Editting Task</h1>
            <form onSubmit={handleEdit}>
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
                <button type='submit'>Edit</button>
                <button onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default EditTask
