import Axios from 'axios'

const initialState = {
    email: null,
    firstName: null,
    lastName: null
}

export const REQUEST_USER_DATA = 'REQUEST_USER_DATA'

export const requestUserData = () => {
    const data = Axios.get('/auth/user-data').then( response => response.data)
    return {
        type: REQUEST_USER_DATA,
        payload: data
    }
}

function userReducer(state = initialState, action){
    let {type, payload} = action
    switch(type){
        case REQUEST_USER_DATA + '_FULFILLED':
            return {
                ...state,
                email: payload.user.email,
                firstName: payload.user.firstName,
                lastName: payload.user.lastName
            }
        default:
            return state
    }
}

export default userReducer