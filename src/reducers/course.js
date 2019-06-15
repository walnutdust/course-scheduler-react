import INITIAL_CATALOG from '../data/1920';
import {SEARCH_COURSE, RESET_LOAD, LOAD_COURSES} from '../constants/actionTypes';

const applySearchCourse = (state, param, catalog) => {
    if (param === '') return catalog;

    return Object.assign({}, state, {
        searched: INITIAL_STATE.searched.filter((course) =>
            course.COURSE_TITLE_LONG.toLowerCase().includes(param)
        )
    });
};

const INITIAL_STATE = {
    searched: INITIAL_CATALOG.filter(
        (course) => course.OFFERED === 'Y' && course.WMS_FACIL_DESCR1 !== 'Cancelled'
    ),
    loadGroup: 1
};

const applyResetLoad = (state) => {
    return Object.assign({}, state, {
        loadGroup: 1
    });
};

const applyLoadCourses = (state, action) => {
    return Object.assign({}, state, {
        loadGroup: action.newLoadGroup
    });
};

function courseReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SEARCH_COURSE:
            return applySearchCourse(state, action.param, INITIAL_STATE);
        case RESET_LOAD:
            return applyResetLoad(state);
        case LOAD_COURSES:
            return applyLoadCourses(state, action);
        default:
            return state;
    }
}

export default courseReducer;
