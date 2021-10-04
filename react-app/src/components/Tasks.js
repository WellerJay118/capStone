import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router";
import { createTask, fetchAllTask } from "../store/task";
import { removeTask } from "../store/task";
import { fetchAllUsers } from "../store/user"



const TaskComponent = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const allUsers = useSelector(state => Object.values(state.users))
    // const allUserss = allUsers.map(user => user.filter(4 === user.id))
    const test = {...allUsers}
    console.log(test)

    const sessionUser = useSelector(state => state.session.user)
    const tasks = useSelector(state => Object.values(state.tasks).filter(task => task?.projId === Number(id)))

    const pTasks = useSelector(state => tasks.filter(task => task?.taskStatus === "Planning"))
    const ipTasks = useSelector(state => tasks.filter(task => task?.taskStatus === "In Progress"))
    const waTasks = useSelector(state => tasks.filter(task => task?.taskStatus === "Waiting Approval"))
    const aTasks = useSelector(state => tasks.filter(task => task?.taskStatus === "Approved"))
    const cTasks = useSelector(state => tasks.filter(task => task?.taskStatus === "Completed"))

    // console.log("p", pTasks, "ip", ipTasks, "wa", waTasks, "a", aTasks, "c", cTasks)

    const selStatus = ["Planning", "In Progress", "Waiting Approval", "Approved", "Completed"]
    const selPriority = ["Idea", "Want", "Low", "Medium", "High", "Immediate"]

    const [assignedTo, setAssignedTo] = useState(sessionUser.id);
    const [taskBody, setTaskBody] = useState('');
    const [taskStatus, setTaskStatus] = useState(selStatus[0]);
    const [taskPriority, setTaskPriority] = useState(selPriority[0]);
    const [showCreateTask, setShowCreateTask] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(fetchAllTask(id))
        dispatch(fetchAllUsers())
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
        // if(assignedTo.length > 0) {
            if(taskBody.length < 1) setErrors(["Please put a description of the task"])
            if(taskBody.length > 500) setErrors(["Please use no more than 500 characters for the task description"])
            if (!errors.length) {
                await dispatch(createTask(taskPayload, id))
                setAssignedTo(sessionUser.id)
                setTaskBody('')
                setTaskStatus(selStatus[0])
                setTaskPriority(selPriority[0])
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
            <div className="task__createform--errors">
                {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
                ))}
            </div>
            <form>
                {/* Value for the select of users will be = to their id. */}
                <div className="task__createform--left">
                    <input
                        placeholder="Assigned"
                        type="text"
                        required
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                    />
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
                <h4>Planning</h4>
                {pTasks.map((task) => (
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

            <div className="task__card--container">
                <h4>In Progress</h4>
                {ipTasks.map((task) => (
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

            <div className="task__card--container">
            <h4>Waiting Approval</h4>
                {waTasks.map((task) => (
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

            <div className="task__card--container">
            <h4>Approved</h4>
                {aTasks.map((task) => (
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

            <div className="task__card--container">
                <h4>Completed</h4>
                {cTasks.map((task) => (
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
