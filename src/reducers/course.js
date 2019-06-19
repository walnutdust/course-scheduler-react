import INITIAL_CATALOG from '../data/1920';
import {SEARCH_COURSE, RESET_LOAD, LOAD_COURSES} from '../constants/actionTypes';

const applySearchCourse = (state, param = state.query, filters) => {
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
                if (semester && course.STRM === semester) {
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

            check = false;
            count = 0;
            for (const attr of filters.others) {
                if (attr && (course.GRADING_BASIS === attr || course.GRADING_BASIS === 'OPT')) {
                    check = true;
                    break;
                } else if (!attr) count++;
            }

            if (count === filters.others.length) check = true;
            if (!check) return false;

            if (filters.start) {
                const start = parseTime(filters.start);
                if (parseTime(course.WMS_START_TIME1) < start) return false;
                if (parseTime(course.WMS_START_TIME2) < start) return false;
                if (parseTime(course.WMS_START_TIME3) < start) return false;
            }

            if (filters.end) {
                const end = parseTime(filters.end);
                if (parseTime(course.WMS_END_TIME1) > end) return false;
                if (parseTime(course.WMS_END_TIME2) > end) return false;
                if (parseTime(course.WMS_END_TIME3) > end) return false;
            }

            return true;
        }),
        query: param
    });
};

const parseTime = (time) => {
    const splitTime = time.split(':');
    return parseInt(splitTime[0]) * 60 + parseInt(splitTime[1]);
};

const INITIAL_STATE = {
    searched: INITIAL_CATALOG.filter(
        (course) => course.OFFERED === 'Y' && course.WMS_FACIL_DESCR1 !== 'Cancelled'
    ),
    loadGroup: 1,
    query: '',
    startTimes: [
        ...new Set(
            INITIAL_CATALOG.map((course) => {
                if (course.WMS_START_TIME1 !== ' ') return course.WMS_START_TIME1;
            })
        )
    ].sort(),
    endTimes: [
        ...new Set(
            INITIAL_CATALOG.map((course) => {
                if (course.WMS_END_TIME1 !== ' ') return course.WMS_END_TIME1;
            })
        )
    ].sort()
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

const courseReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEARCH_COURSE:
            return applySearchCourse(state, action.param, action.filters);
        case RESET_LOAD:
            return applyResetLoad(state);
        case LOAD_COURSES:
            return applyLoadCourses(state, action);
        default:
            return state;
    }
};

export default courseReducer;
