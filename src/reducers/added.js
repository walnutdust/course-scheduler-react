import {COURSE_ADD} from '../constants/actionTypes';

const INITIAL_STATE = [];

const applyAddCourse = (state, action) => [...state, action.id];

function addReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case COURSE_ADD: {
            return applyAddCourse(state, action);
        }
        default:
            return state;
    }
}

export default addReducer;
