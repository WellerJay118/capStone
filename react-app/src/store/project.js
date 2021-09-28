// Define Action Types as Constants
const GET_ALL_PROJECTS = '/projects/GET_ALL_PROJECTS'
// const GET_PROJECT = '/projects/GET_PROJECT'
const ADD_PROJECT = '/projects/ADD_PROJECT'
const EDIT_PROJECT = '/projects/EDIT_PROJECT'
const DELETE_PROJECT = '/projects/DELETE_PROJECT'



// Define Action Creators

//GET ALL PROJECTS
const getAllProj = (projects) => ({
    type : GET_ALL_PROJECTS,
    projects
})

//GET SINGLE PROJECT
// const getOneProj = (project) => ({
//     type : GET_PROJECT,
//     project
// })

//POST PROJECT
const addProj = (project) => ({
    type : ADD_PROJECT,
    project
})

//PATCH PROJECT
const editProj = (editedProj) => ({
    type : EDIT_PROJECT,
    editedProj
})

//DELETE PROJECT
const deleteProj = (projId) => ({
    type : DELETE_PROJECT,
    projId
})

// Define Thunks

//GET ALL PROJECT
export const fetchAllProj = () => async(dispatch) => {
    const res = await fetch('/api/projects/');
    const projects = await res.json();
    dispatch(getAllProj(projects.projects));
    return projects
}

//GET ONE PROJECT
// export const fetchOneProj = (projId) => async(dispatch) => {
//     const res = await fetch(`/api/projects/${projId}`);
//     const project = await res.json();
//     dispatch(getOneProj(project));
//     return project
// }

// //POST PROJECT
export const createProj = (projPayload) => async(dispatch) => {
    const res = await fetch('/api/projects/create', {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(projPayload)
    })
    const project = await res.json();
    dispatch(addProj(project))
    return project
}

// //PATCH PROJECT
export const updateProj = (projPayload, projId) => async(dispatch) => {
    const res = await fetch(`/api/projects/${projId}`, {
        method : "PATCH",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(projPayload)
    })
    if (res.ok) {
        const project = await res.json();
        dispatch(editProj(project));
        return project
    }
}

// //DELETE PROJECT
export const removeProj = (projId) => async(dispatch) => {
    const res = await fetch(`/api/projects/${projId}`, {
        method : "DELETE"
    })
    if (res.ok) {
        dispatch(deleteProj(projId))
    }
}

// Define an initial state
let initialState = {}

// Define a reducer
const projectReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_ALL_PROJECTS:
            Object.values(action.projects).forEach(project => {
                newState[project.id] = project
            })
            return newState
        case ADD_PROJECT:
            newState[action.project.id] = action.project
            return newState
        case EDIT_PROJECT:
            newState[action.project] = action.project
            return newState
        case DELETE_PROJECT:
            delete newState[action.id]
            return newState
        default:
            return state;
    }
}

// Export the reducer
export default projectReducer
