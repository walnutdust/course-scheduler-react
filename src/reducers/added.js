import {COURSE_ADD, COURSE_REMOVE} from '../constants/actionTypes';

const INITIAL_STATE = [];

const applyAddCourse = (state, action) => [...state, action.course];
const applyRemoveCourse = (state, action) => state.filter((course) => course !== action.course);

function addReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case COURSE_ADD:
            if (state.indexOf(action.course) === -1) return applyAddCourse(state, action);
            break;
        case COURSE_REMOVE:
            if (state.indexOf(action.course) !== -1) return applyRemoveCourse(state, action);
            break;
        default:
            return state;
    }
}

export default addReducer;
