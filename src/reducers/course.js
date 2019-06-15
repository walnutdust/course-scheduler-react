import INITIAL_CATALOG from '../data/1920';
import {SEARCH_COURSE, RESET_LOAD, LOAD_COURSES} from '../constants/actionTypes';

const applySearchCourse = (state, param, catalog) => {
    if (param === '') return catalog;

    return Object.assign({}, state, {
        searched: INITIAL_STATE.searched.filter((course) => {
            const searchArea = (
                course.SUBJECT +
                course.CATALOG_NBR +
                course.COURSE_TITLE_LONG +
                course.WMS_DESCR_SRCH
            ).toLowerCase();
            let result = true;
            const queries = param.toLowerCase().split(' ');
            for (let query of queries) {
                if (!searchArea.includes(query)) {
                    result = false;
                    break;
                }
            }
            return result;
        })
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
