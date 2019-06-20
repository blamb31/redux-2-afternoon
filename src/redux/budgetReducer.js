import Axios from 'axios'

const initialState = {
    purchases: [],
    budgetLimit: null,
    loading: false
}

export const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA'
export const ADD_PURCHASE = 'ADD_PURCHASE'
export const REMOVE_PURCHASE = 'REMOVE_PURCHASE'

export const removePurchase = (id) => {
    const data = Axios.delete(`/api/budget-data/purchase/${id}`).then(res => res.data)
    return {
        type: REMOVE_PURCHASE,
        payload: data
    }
}

export const addPurchase = (price, description, category) => {
    const data = Axios.post('/api/budget-data/purchase', {
        description,
        price,
        category

    }).then(res => res.data)
    return {
        type: ADD_PURCHASE,
        payload: data
    }
}

export const requestBudgetData = () => {
    const data = Axios.get('/api/budget-data').then(res => res.data)
    return {
        type: REQUEST_BUDGET_DATA,
        payload: data
    }
}

function budgetReducer(state = initialState, action){
    let {type, payload} = action
    switch(type) {
        case REQUEST_BUDGET_DATA + '_PENDING':
            return {
                ...state,
                loading: true,
        }
        case REQUEST_BUDGET_DATA + '_FULFILLED':
        return {
            ...state,
            loading: false,
            purchases: payload.purchases,
            budgetLimit: payload.budgetLimit
        }
        case ADD_PURCHASE + '_PENDING':
            return {
                ...state,
                loading: true,
        }
        case ADD_PURCHASE + '_FULFILLED':
        return {
            ...state,
            loading: false,
            purchases: payload,
           
        }
        case REMOVE_PURCHASE + '_PENDING':
            return {
                ...state,
                loading: true,
        }
        case REMOVE_PURCHASE + '_FULFILLED':
        return {
            ...state,
            loading: false,
            purchases: payload,
           
        }
        default:
            return state

    }
}

export default budgetReducer