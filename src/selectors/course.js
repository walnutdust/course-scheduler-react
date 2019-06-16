const isNotHidden = (hiddenCourses) => (course) => hiddenCourses.indexOf(course) === -1;

const getAddedCourses = ({addedState}) => addedState;
const getHiddenCourses = ({hiddenState}) => hiddenState;
const getUnhiddenCourses = ({addedState, hiddenState}) =>
    addedState.filter(isNotHidden(hiddenState));
const getSearchedCourses = ({courseState, filterState, addedState}) => {
    const searchedCourses = courseState.searched;
    if (filterState.conflict) {
        return searchedCourses.filter((course) => {
            for (const addedCourse of addedState) {
                // if conflict return false
                if (checkConflict(course, addedCourse)) {
                    return false;
                }
            }
            return true;
        });
    } else return searchedCourses;
};

const checkConflict = (course, addedCourse) => {
    const parsedSlots = courseTimeParsed(course);
    const parsedAddedSlots = courseTimeParsed(addedCourse);

    for (const slot of parsedSlots) {
        for (const addedSlot of parsedAddedSlots) {
            if (slot[0] === addedSlot[0]) {
                if (slot[1] <= addedSlot[1] + addedSlot[2] && slot[1] >= addedSlot[1]) return true;
                if (addedSlot[1] <= slot[1] + slot[2] && addedSlot[1] >= slot[1]) return true;
            }
        }
    }

    return false;
};

const getLoadedCourses = ({courseState, filterState, addedState}) => {
    const searchedCourses = getSearchedCourses({courseState, filterState, addedState});
    const loadGroup = courseState.loadGroup;

    if (searchedCourses.length === 0) return;
    if (searchedCourses.length > loadGroup * 50) return searchedCourses.slice(0, loadGroup * 50);
    else return searchedCourses;
};

const courseTimeParsed = (course) => {
    const result = [];

    if (course.WMS_STND_MTG_PAT1 !== ' ' && course.WMS_STND_MTG_PAT1 !== 'TBA') {
        const courseDays = getCourseDays(course.WMS_STND_MTG_PAT1);

        for (const day of courseDays) {
            const slot = [];
            slot.push(day);
            slot.push(parseTime(course.WMS_START_TIME1));
            const slotLength = parseTime(course.WMS_END_TIME1) - parseTime(course.WMS_START_TIME1);
            slot.push(slotLength);
            result.push(slot);
        }
    }

    if (course.WMS_STND_MTG_PAT2 !== ' ') {
        const courseDays = getCourseDays(course.WMS_STND_MTG_PAT2);

        for (const day of courseDays) {
            const slot = [];
            slot.push(day);
            slot.push(parseTime(course.WMS_START_TIME2));
            const slotLength = parseTime(course.WMS_END_TIME2) - parseTime(course.WMS_START_TIME2);
            slot.push(slotLength);
            result.push(slot);
        }
    }

    if (course.WMS_STND_MTG_PAT3 !== ' ') {
        const courseDays = getCourseDays(course.WMS_STND_MTG_PAT3);

        for (const day of courseDays) {
            const slot = [];
            slot.push(day);
            slot.push(parseTime(course.WMS_START_TIME3));
            const slotLength = parseTime(course.WMS_END_TIME3) - parseTime(course.WMS_START_TIME3);
            slot.push(slotLength);
            result.push(slot);
        }
    }

    return result;
};

const parseTime = (time) => {
    const splitTime = time.split(':');
    return parseInt(splitTime[0]) * 60 + parseInt(splitTime[1]);
};

const getCourseDays = (days) => {
    if (days === 'M-F') return ['MON', 'TUE', 'WED', 'THU', 'FRI'];

    const splitDays = days.split('');
    const result = [];

    for (const day of splitDays) {
        switch (day) {
            case 'M':
                result.push('MON');
                break;
            case 'T':
                result.push('TUE');
                break;
            case 'W':
                result.push('WED');
                break;
            case 'R':
                result.push('THU');
                break;
            case 'F':
                result.push('FRI');
                break;
            default:
                break;
        }
    }

    return result;
};

export {
    getAddedCourses,
    getHiddenCourses,
    getUnhiddenCourses,
    getSearchedCourses,
    getLoadedCourses
};
