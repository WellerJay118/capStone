import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router";
import { fetchAllTask } from "../store/task";
import { removeTask } from "../store/task";
import { fetchAllUsers } from "../store/user"
import AddTaskModal from "./modals/AddTaskModal"
import ConfirmDeleteTaskModal from "./modals/ConfirmDeleteTaskModal";
import EditTaskModal from "./modals/EditTaskModal";



const TaskComponent = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const tasks = useSelector(state => Object.values(state.tasks).filter(task => task?.projId === Number(id)))

    const pTasks = useSelector(state => tasks.filter(task => task?.taskStatus === "Planning"))
    const ipTasks = useSelector(state => tasks.filter(task => task?.taskStatus === "In Progress"))
    const waTasks = useSelector(state => tasks.filter(task => task?.taskStatus === "Waiting Approval"))
    const aTasks = useSelector(state => tasks.filter(task => task?.taskStatus === "Approved"))
    const cTasks = useSelector(state => tasks.filter(task => task?.taskStatus === "Completed"))


    useEffect(() => {
        dispatch(fetchAllTask(id))
        dispatch(fetchAllUsers())
    }, [dispatch, id])


    const handleTaskDelete = async(e) => {
        e.preventDefault();

        await dispatch(removeTask(id, e.target.id))
        history.push(`/projects/${id}`)
    }
//might be able to do a filter for the things in JSX name fo assigned to.

//need to figure way to associate task.assignedTo and the name of the person itself.
//may use useSelector and useEffect to bring in the users information.
    return (
        <div className="task__container">

            <AddTaskModal id={id} />

            <div className="task__card--container">
                <h4 >Planning</h4>
                {pTasks.map((task) => (
                    <div className="task__singleTask--card" key={task?.id}>

                        <div className="task__singleTask--card-buttons">

                            <EditTaskModal taskId={task?.id} projId={id} />

                            <ConfirmDeleteTaskModal taskId={task?.id} projId={id}/>
                        </div>

                        <div className="task__singleTask--card-taskinfo">
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

                            <EditTaskModal taskId={task?.id} projId={id} />

                            <ConfirmDeleteTaskModal taskId={task?.id} projId={id}/>
                        </div>

                        <div className="task__singleTask--card-taskinfo">
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

                            <EditTaskModal taskId={task?.id} projId={id} />

                            <ConfirmDeleteTaskModal taskId={task?.id} projId={id}/>
                        </div>

                        <div className="task__singleTask--card-taskinfo">
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

                            <EditTaskModal taskId={task?.id} projId={id} />

                            <ConfirmDeleteTaskModal taskId={task?.id} projId={id}/>
                        </div>

                        <div className="task__singleTask--card-taskinfo">
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

                            <EditTaskModal taskId={task?.id} projId={id} />

                            <ConfirmDeleteTaskModal taskId={task?.id} projId={id}/>
                        </div>

                        <div className="task__singleTask--card-taskinfo">
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
