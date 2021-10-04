const GET_TASKS = '/projects/tasks/GET_TASKS'
const ADD_TASK = '/projects/tasks/ADD_TASK'
const EDIT_TASK = '/projects/tasks/EDIT_TASK'
const DELETE_TASK = '/projects/tasks/DELETE_TASK'
const TASK_LOGOUT = '/projects/tasks/TASK_LOGOUT'

// const taskLogout = () => ({
//     type: TASK_LOGOUT,
// })

//GET ALL TASKS
const getAllTasks = (tasks) => ({
    type : GET_TASKS,
    tasks
})

//POST NEW TASK
const addTask = (task) => ({
    type : ADD_TASK,
    task
})

//PATCH EDIT TASK
const editTask = (edittedTask) => ({
    type : EDIT_TASK,
    edittedTask
})

//DELETE TASK
const deleteTask = (taskId) => ({
    type : DELETE_TASK,
    taskId
})

// Define Thunks
//GET ALL TASKS

export const taskLogout = () => {
    return {
        type: TASK_LOGOUT
    }
}
export const fetchAllTask = (projId) => async(dispatch) => {
    const res = await fetch (`/api/projects/${projId}/tasks`)
    const tasks = await res.json();
    dispatch(getAllTasks(tasks.tasks))
}

//POST NEW TASK
export const createTask = (taskPayload, id) => async(dispatch) => {
    const res = await fetch(`/api/projects/${id}/tasks/create`, {
        method: "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(taskPayload)
    })
    const task = await res.json();
    dispatch(addTask(task))
    return task
}

//PATCH EDIT TASK
export const updateTask = (taskPayload, projId, taskId) => async(dispatch) => {
    const res = await fetch(`/api/projects/${projId}/tasks/${taskId}`, {
        method : "PATCH",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(taskPayload)
    })
    if (res.ok) {
        const task = await res.json();
        dispatch(editTask(task))
        return task
    }
}

//DELETE SINGLE TASK
export const removeTask = (projId, taskId) => async(dispatch) => {
    const res = await fetch(`/api/projects/${projId}/tasks/${taskId}`, {
        method : "DELETE"
    })
    if (res.ok) {
        dispatch(deleteTask(taskId))
    }
}


// Define an initial state
let initialState = {}

// Define a reducer
const taskReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch(action.type) {
        case GET_TASKS:
            Object.values(action.tasks).forEach(task => {
                newState[task.id] = task
            })
            return newState
        case ADD_TASK:
            newState[action.task.id] = action.task
            return newState
        case EDIT_TASK:
            newState[action.task] = action.task
            return newState
        case DELETE_TASK:
            delete newState[action.taskId]
            return newState
        case TASK_LOGOUT:
            return initialState
        default:
            return state;
    }
}

export default taskReducer
