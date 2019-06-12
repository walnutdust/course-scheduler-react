import {COURSE_ADD} from '../constants/actionTypes';

const INITIAL_STATE = [];

const applyAddCourse = (state, action) => [...state, action.course];
const applyRemoveCourse = (state, action) => state.filter((course) => course !== action.course);

function addReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case COURSE_ADD:
            if (state.indexOf(action.course) === -1) return applyAddCourse(state, action);
            else return applyRemoveCourse(state, action);
        default:
            return state;
    }
}

export default addReducer;
