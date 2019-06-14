import INITIAL_CATALOG from '../data/1920';
import {SEARCH_COURSE} from '../constants/actionTypes';

const INITIAL_STATE = INITIAL_CATALOG.filter((course) => course.OFFERED === 'Y');

const applySearchCourse = (param, catalog) => catalog;

function searchReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SEARCH_COURSE:
            return applySearchCourse(action.param, action.catalog);
        default:
            return state;
    }
}

export default searchReducer;
