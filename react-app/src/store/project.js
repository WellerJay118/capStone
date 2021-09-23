// Define Action Types as Constants
const GET_ALL_PROJECTS = '/projects/GET_ALL_PROJECTS'
const GET_PROJECT = '/projects/GET_PROJECT'
const ADD_PROJECT = '/projects/ADD_PROJECT'
const EDIT_PROJECT = '/projects/EDIT_PROJECT'
const DELETE_PROJECT = '/projects/DELETE_PROJECT'

// Define Action Creators
//GET ALL PROJECTS
const getAllProj = (allProjects) => ({
    type : GET_ALL_PROJECTS,
    allProjects
})

//GET SINGLE PROJECT
const getOneProj = (project) => ({
    type : GET_PROJECT,
    project
})

//POST PROJECT
const addProj = (projPayload) => ({
    type : ADD_PROJECT,
    projPayload
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
    const res = await fetch('/api/projects');
    const projects = await res.json();
    dispatch(getAllProj(projects));
    return projects;
}

//GET ONE PROJECT
export const fetchOneProj = (projId) => async(dispatch) => {
    const res = await fetch(`/api/projects/${projId}`);
    const project = await res.json();
    dispatch(getOneProj(project));
    return project
}

//POST PROJECT
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

//PATCH PROJECT
export const updateProj = (projPayload, projId) => async(dispatch) => {
    const res = await fetch(`/api/projects/${projId}`, {
        method : "PATCH",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({projPayload})
    })
    if (res.ok) {
        const project = await res.json();
        dispatch(getProj(project));
        return project
    }
}

//DELETE PROJECT
export const removeProj = (projId) => async(dispatch) => {
    const res = await fetch(`/api/projects/${projId}`, {
        method : "DELETE"
    })
    if (res.ok) {
        dispatch(deleteProj(projId))
    }
}

// Define an initial state
initialState = {}

// Define a reducer
const projectReducer = (state = initiaState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_ALL_PROJECTS:

    }
}

// Export the reducer
export default projectReducer
