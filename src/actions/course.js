import {
    COURSE_ADD,
    COURSE_REMOVE,
    COURSE_HIDE,
    COURSE_UNHIDE,
    SEARCH_COURSE,
    LOAD_COURSES,
    RESET_LOAD
} from '../constants/actionTypes';

const doAddCourse = (course) => ({
    type: COURSE_ADD,
    course
});

const doRemoveCourse = (course) => ({
    type: COURSE_REMOVE,
    course
});

const doHideCourse = (course) => ({
    type: COURSE_HIDE,
    course
});

const doUnhideCourse = (course) => ({
    type: COURSE_UNHIDE,
    course
});

const doSearchCourse = (param, catalog) => ({
    type: SEARCH_COURSE,
    param,
    catalog
});

const doLoadCourses = (courses) => ({
    type: LOAD_COURSES,
    courses
});

const doResetLoad = () => ({
    type: RESET_LOAD
});

export {
    doAddCourse,
    doRemoveCourse,
    doHideCourse,
    doUnhideCourse,
    doSearchCourse,
    doLoadCourses,
    doResetLoad
};
