const isNotHidden = (hiddenCourses) => (course) => hiddenCourses.indexOf(course) === -1;

const getAddedCourses = ({addedState}) => addedState;
const getHiddenCourses = ({hiddenState}) => hiddenState;
const getUnhiddenCourses = ({addedState, hiddenState}) =>
    addedState.filter(isNotHidden(hiddenState));
const getSearchedCourses = ({courseState}) => courseState.searched;

const getLoadedCourses = ({courseState}) => {
    const searchedCourses = courseState.searched;
    const loadGroup = courseState.loadGroup;

    if (searchedCourses.length === 0) return;
    if (searchedCourses.length > loadGroup * 50) return searchedCourses.slice(0, loadGroup * 50);
    else return searchedCourses;
};

export {
    getAddedCourses,
    getHiddenCourses,
    getUnhiddenCourses,
    getSearchedCourses,
    getLoadedCourses
};
