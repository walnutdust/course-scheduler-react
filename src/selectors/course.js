const isNotHidden = (hiddenCourses) => (course) => hiddenCourses.indexOf(course) === -1;

const getAddedCourses = ({addedState}) => addedState;
const getHiddenCourses = ({hiddenState}) => hiddenState;
const getUnhiddenCourses = ({addedState, hiddenState}) =>
    addedState.filter(isNotHidden(hiddenState));
const getAllCourses = ({courseState}) => courseState;

export {getAddedCourses, getHiddenCourses, getUnhiddenCourses, getAllCourses};
