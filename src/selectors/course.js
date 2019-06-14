const isNotHidden = (hiddenCourses) => (course) => hiddenCourses.indexOf(course) === -1;

const getAddedCourses = ({addedState}) => addedState;
const getHiddenCourses = ({hiddenState}) => hiddenState;
const getUnhiddenCourses = ({addedState, hiddenState}) =>
    addedState.filter(isNotHidden(hiddenState));
const getAllCourses = ({courseState}) => courseState;
const getLoadedCourses = ({loadedState}) => loadedState;
const getSearchedCourses = ({searchedState}) => searchedState;

export {
    getAddedCourses,
    getHiddenCourses,
    getUnhiddenCourses,
    getAllCourses,
    getLoadedCourses,
    getSearchedCourses
};
