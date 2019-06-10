const isAdded = (addedIds) => (course) => addedIds.indexOf(course.objectID) !== -1;

const getAddedCourses = ({courseState, addState}) => courseState.filter(isAdded(addState));

const getAllCourses = ({courseState}) => courseState;

export {getAddedCourses, getAllCourses};
