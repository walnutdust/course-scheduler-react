import INITIAL_CATALOG from '../data/1920';
import {SEARCH_COURSE, RESET_LOAD, LOAD_COURSES} from '../constants/actionTypes';

const applySearchCourse = (state, param, filters, catalog) => {
    if (param === '') return catalog;

    return Object.assign({}, state, {
        searched: INITIAL_STATE.searched.filter((course) => {
            const searchArea = (
                course.SUBJECT +
                course.CATALOG_NBR +
                course.COURSE_TITLE_LONG +
                course.WMS_DESCR_SRCH
            ).toLowerCase();

            const queries = param.toLowerCase().split(' ');
            for (const query of queries) {
                if (!searchArea.includes(query)) {
                    return false;
                }
            }

            let check = false;
            let count = 0;
            for (const semester of filters.semesters) {
                if (semester && parseInt(course.STRM) === parseInt(semester)) {
                    check = true;
                    break;
                } else if (!semester) count++;
            }

            if (count === filters.semesters.length) check = true;
            if (!check) return false;

            check = false;
            count = 0;
            for (const level of filters.levels) {
                if (level && Math.floor(parseInt(course.CATALOG_NBR) / 100) === level) {
                    check = true;
                    break;
                } else if (!level) count++;
            }

            if (count === filters.levels.length) check = true;

            if (!check) return false;

            const attributes = course.WMS_ATTR_SRCH.split(',');

            check = false;
            count = 0;
            for (const distribution of filters.distributions) {
                if (distribution && attributes.indexOf(distribution) !== -1) {
                    check = true;
                    break;
                } else if (!distribution) count++;
            }

            if (count === filters.distributions.length) check = true;
            if (!check) return false;

            check = false;
            count = 0;
            for (const division of filters.divisions) {
                if (division && attributes.indexOf(division) !== -1) {
                    check = true;
                    break;
                } else if (!division) count++;
            }

            if (count === filters.divisions.length) check = true;
            if (!check) return false;

            return true; // TOOD implement others and conflict.
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
            return applySearchCourse(state, action.param, action.filters, INITIAL_STATE);
        case RESET_LOAD:
            return applyResetLoad(state);
        case LOAD_COURSES:
            return applyLoadCourses(state, action);
        default:
            return state;
    }
}

export default courseReducer;
