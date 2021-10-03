import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router";
import { createTask, fetchAllTask } from "../store/task";
import { removeTask } from "../store/task";



const TaskComponent = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    // const sessionUser = useSelector(state => state.session.user)
    const tasks = useSelector(state => Object.values(state.tasks).filter(task => task?.projId === Number(id)))

    const [assignedTo, setAssignedTo] = useState('');
    const [taskBody, setTaskBody] = useState('');
    const [taskStatus, setTaskStatus] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [showCreateTask, setShowCreateTask] = useState(false)


    useEffect(() => {
        dispatch(fetchAllTask(id))
        // if(!showCreateTask) return;
        // const closeCreateTask = () => {
        //     setShowCreateTask(false)
        // }
        // document.addEventListener('click', closeCreateTask)
        // return () => document.removeEventListener('click', closeCreateTask)
    }, [dispatch, id, showCreateTask])

    const openCreateTask = async(e) => {
        if(showCreateTask) return;
        setShowCreateTask(true);
    }

    const handleCancel = async(e) => {
        e.preventDefault();
        setShowCreateTask(false);
    }

    const handleCreate = async(e) => {
        e.preventDefault();
        const taskPayload = {
            assignedTo,
            taskBody,
            taskStatus,
            taskPriority
        }
        if(assignedTo.length > 0) {

            await dispatch(createTask(taskPayload, id))
            setAssignedTo('')
            setTaskBody('')
            setTaskStatus('')
            setTaskPriority('')
        } else {
            alert('Please assign someone to this task')
        }

    }
    const handleTaskDelete = async(e) => {
        e.preventDefault();
        // console.log("id:", id, "target:", e.target, "tasks", tasks)
        await dispatch(removeTask(id, e.target.id))
        history.push(`/projects/${id}`)
    }

    let createTaskForm = (
        <div className="task__createform">
            <form>
                <div className="task__createform--left">
                    <input
                        placeholder="Assigned"
                        type="text"
                        required
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
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

//need to figure way to associate task.assignedTo and the name of the person itself.
//may use useSelector and useEffect to bring in the users information.
    return (
        <div className="task__container">
            <div>
                {showCreateTask && createTaskForm}
            </div>
            <button className="task__container--addTask" hidden={showCreateTask} onClick={openCreateTask}>
                Add Task
            </button>

            <div className="task__card--container">
                {tasks.map((task) => (
                    <div className="task__singleTask--card" key={task?.id}>

                        <div className="task__singleTask--card-buttons">
                            <button onClick={() => history.push(`/projects/${id}/tasks/${task.id}`)}>
                                <i className="fas fa-edit"></i>
                            </button>
                            <button id={task?.id} onClick={handleTaskDelete}>
                                <i id={task?.id} className="far fa-trash-alt"></i>
                            </button>
                        </div>

                        <div className="task__singleTask--card-taskinfo">
                            {/* <h1>user[task?.assignedTo].firstName</h1> */}
                            <div>Description: {task?.taskBody}</div>
                            <div>Assigned To: {task?.assignedTo}</div>
                            <div>Current Status: {task?.taskStatus}</div>
                            <div>Priority: {task?.taskPriority}</div>
                        </div>
                    </div>
                ))}
            </div>





        </div>

    )
}

export default TaskComponent
