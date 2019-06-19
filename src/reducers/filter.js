import {
    TOGGLE_SEM,
    TOGGLE_DIST,
    TOGGLE_DIV,
    TOGGLE_OTHERS,
    TOGGLE_CONFLICT,
    TOGGLE_LEVEL,
    UPDATE_END,
    UPDATE_START
} from '../constants/actionTypes';
import {SEMESTERS, DISTRIBUTIONS, DIVISIONS, OTHERS, LEVELS} from '../constants/constants';

const INITIAL_STATE = {
    semesters: [false, false, false],
    distributions: [false, false, false],
    divisions: [false, false, false],
    others: [false, false],
    levels: [false, false, false, false],
    conflict: false,
    start: '',
    end: ''
};

const toggleConf = (state) => {
    return Object.assign({}, state, {
        conflict: !state.conflict
    });
};
const toggleSem = (state, action) => {
    const final = state.semesters;

    if (final[action.index]) final[action.index] = false;
    else final[action.index] = SEMESTERS[action.index];

    return Object.assign({}, state, {
        semesters: final
    });
};
const toggleDist = (state, action) => {
    const final = state.distributions;

    if (final[action.index]) final[action.index] = false;
    else final[action.index] = DISTRIBUTIONS[action.index];

    return Object.assign({}, state, {
        distributions: final
    });
};
const toggleDiv = (state, action) => {
    const final = state.divisions;

    if (final[action.index]) final[action.index] = false;
    else final[action.index] = DIVISIONS[action.index];

    return Object.assign({}, state, {
        divisions: final
    });
};
const toggleOthers = (state, action) => {
    const final = state.others;

    if (final[action.index]) final[action.index] = false;
    else final[action.index] = OTHERS[action.index];
    return Object.assign({}, state, {
        others: final
    });
};
const toggleLevel = (state, action) => {
    const final = state.levels;

    if (final[action.index]) final[action.index] = false;
    else final[action.index] = LEVELS[action.index];

    return Object.assign({}, state, {
        levels: final
    });
};

const updateStart = (state, action) => {
    state.start = action.time;

    return Object.assign({}, state, {
        start: action.time
    });
};

const updateEnd = (state, action) => {
    state.end = action.time;

    return Object.assign({}, state, {
        end: action.time
    });
};

const filterReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_CONFLICT:
            return toggleConf(state, action);
        case TOGGLE_SEM:
            return toggleSem(state, action);
        case TOGGLE_DIST:
            return toggleDist(state, action);
        case TOGGLE_DIV:
            return toggleDiv(state, action);
        case TOGGLE_OTHERS:
            return toggleOthers(state, action);
        case TOGGLE_LEVEL:
            return toggleLevel(state, action);
        case UPDATE_START:
            return updateStart(state, action);
        case UPDATE_END:
            return updateEnd(state, action);
        default:
            return state;
    }
};

export default filterReducer;
