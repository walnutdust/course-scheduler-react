import {SUBMENU_CHANGE, UPDATE_GAPI, UPDATE_SIGNIN} from '../constants/actionTypes';

const INITIAL_STATE = {active: 'Timetable', gapi: null, signedIn: false};

const changeActive = (state, action) => {
    return Object.assign({}, state, {
        active: action.newState
    });
};

const updateGapi = (state, action) => {
    return Object.assign({}, state, {
        gapi: action.gapi
    });
};

const updateSignInStatus = (state, action) => {
    return Object.assign({}, state, {
        signedIn: action.signedIn
    });
};

function utilReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATE_GAPI:
            return updateGapi(state, action);
        case UPDATE_SIGNIN:
            return updateSignInStatus(state, action);
        case SUBMENU_CHANGE:
            return changeActive(state, action);
        default:
            return state;
    }
}

export default utilReducer;
