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

const doSearchCourse = (param, filters) => ({
    type: SEARCH_COURSE,
    param,
    filters
});

const doLoadCourses = (newLoadGroup) => ({
    type: LOAD_COURSES,
    newLoadGroup: newLoadGroup
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
