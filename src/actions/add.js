import {COURSE_ADD} from '../constants/actionTypes';

const doAddCourse = (id) => ({
    type: COURSE_ADD,
    id
});

export {doAddCourse};
