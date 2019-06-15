import {SUBMENU_CHANGE} from '../constants/actionTypes';

const INITIAL_STATE = {active: 'Timetable', loadGroup: 1};

const changeActive = (state, action) => {
    return Object.assign({}, state, {
        active: action.newState
    });
};

function utilReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SUBMENU_CHANGE:
            return changeActive(state, action);
        default:
            return state;
    }
}

export default utilReducer;
