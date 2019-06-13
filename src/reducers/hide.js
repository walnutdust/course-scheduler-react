import {COURSE_HIDE, COURSE_UNHIDE} from '../constants/actionTypes';

const INITIAL_STATE = [];

const applyHideCourse = (state, action) => [...state, action.course];
const applyUnhideCourse = (state, action) => state.filter((course) => course !== action.course);

function addReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case COURSE_HIDE:
            if (state.indexOf(action.course) === -1) return applyHideCourse(state, action);
            break;
        case COURSE_UNHIDE:
            if (state.indexOf(action.course) !== -1) return applyUnhideCourse(state, action);
        default:
            return state;
    }
}

export default addReducer;
