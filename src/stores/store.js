import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';


const tokenStatus = Cookies.get('token') ? true : false;
const authUser = Cookies.get('authUser') !== undefined ? JSON.parse(Cookies.get('authUser')) : null;
// console.log('From store : authUser => ', authUser);

const reduceFn = (state = {tokenStatus: tokenStatus, authUser: authUser}, action) => {

    if (action.type === 'TOKEN_REMOVED'){
        // state.tokenStatus = false;
        state = {...state, tokenStatus: false}
        console.log("From TOKEN_REMOVED => ", state.tokenStatus)
        return state;
    }

    if (action.type === 'TOKEN_CREATED'){
        // state.tokenStatus = true;
        state = {...state, tokenStatus: true}
        console.log("From TOKEN_CREATED => ", state.tokenStatus)
        return state;
    }

    if (action.type === "SET_AUTHUSER"){
        // state.authUser = JSON.parse(Cookies.get('authUser'))
        state = {...state, authUser: JSON.parse(Cookies.get('authUser')) }

        console.log("From SET_AUTHUSER =>", state.authUser);
        return state;
    }

    if (action.type === "UNSET_AUTHUSER"){
        // state.authUser = null;
        state = {...state, authUser: null};
        console.log("From UNSET_AUTHUSER =>", state.authUser);
        return state;
    }

    return state;
}


const store = createStore(reduceFn, composeWithDevTools(applyMiddleware(thunk)));
export default store;