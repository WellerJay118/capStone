const GET_ALL_USERS = 'user/GET_ALL_USERS'
const USERS_LOGOUT = 'user/USERS_LOGOUT'

const getUser = (users) => ({
    type: GET_ALL_USERS,
    users
})

export const fetchAllUsers = () => async(dispatch) => {
    const res = await fetch('/api/users/')
    const users = await res.json();
    // console.log(users.users)
    dispatch(getUser(users.users))
    return users

}
export const userLogout = () => {
    return {
        type: USERS_LOGOUT
    }
}
let initialState = {}

const userReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_ALL_USERS:
            Object.values(action.users).forEach(user => {
                newState[user.id] = user
            })
            return newState
        case USERS_LOGOUT:
            return initialState
        default:
            return state
    }
}

export default userReducer
