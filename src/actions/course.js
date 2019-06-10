import {COURSE_ADD, COURSE_BOOKMARK} from '../constants/actionTypes';

const doBookmarkCourse = (course) => ({
    type: COURSE_BOOKMARK,
    course
});

const doAddCourse = (course) => ({
    type: COURSE_ADD,
    course
});

export {doAddCourse, doBookmarkCourse};
