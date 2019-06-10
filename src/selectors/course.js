const isAdded = (addedIds) => (course) => addedIds.indexOf(course.objectID) !== -1;

const getAddedCourses = ({addedState}) => addedState;
const getBookmarkedCourses = ({bookmarkState}) => bookmarkState;
const getAllCourses = ({courseState}) => courseState;

export {getAddedCourses, getBookmarkedCourses, getAllCourses};
