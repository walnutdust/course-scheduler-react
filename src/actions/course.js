import {COURSE_ADD, COURSE_REMOVE, COURSE_HIDE, COURSE_UNHIDE} from '../constants/actionTypes';

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

export {doAddCourse, doRemoveCourse, doHideCourse, doUnhideCourse};
