import {LOAD_COURSES, RESET_LOAD} from '../constants/actionTypes';

const INITIAL_LOAD_STATE = [];

const applyLoadCourses = (state, action) => [...action.courses];
const applyResetLoad = () => [];

function loadReducer(state = INITIAL_LOAD_STATE, action) {
    console.log('hi');
    switch (action.type) {
        case RESET_LOAD:
            return applyResetLoad();
        case LOAD_COURSES:
            return applyLoadCourses(state, action);
        default:
            return state;
    }
}

export default loadReducer;
