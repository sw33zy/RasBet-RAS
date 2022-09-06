import {createStore, combineReducers} from 'redux';

const initialState = {
    bets:[]
}

//Reducers
export const betReducer = (state = [], action) => {
    switch (action.type){
        case "INSERTBET":
            let newArray = state.slice()
            newArray.splice(action.index, 0, action.payload)
            return newArray
        case "REMOVEBET":
            console.log("REMOVING", action.payload)
            let newArray2 = state.slice()
            const index = newArray2.indexOf(action.payload);
            newArray2.splice(index, 1)
            return newArray2
        default:
            return state
    }
}

export const loggedReducer = (state = '', action) => {
    switch (action.type){
        case "LOGIN":
            return action.payload
        default:
            return state
    }
}

export const adminReducer = (state = false, action) => {
    switch (action.type){
        case "ADMIN":
            return !state
        default:
            return state
    }
}

const rootReducer = combineReducers({
    betReducer,
    loggedReducer,
    adminReducer
})

//Store -> Global
export const store = createStore(rootReducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


//Action
const insertBet = (bet) => {
    return {
        type: 'INSERTBET',
        payload: bet,
    }
}

const removeBet = (bet) => {
    return {
        type: 'REMOVEBET',
        payload: bet
    }
}

const login = (user) => {
    return {
        type: 'LOGIN',
        payload: user
    }
}

const admin = () => {
    return {
        type: 'ADMIN'
    }
}



//Dispatch
