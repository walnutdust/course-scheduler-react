import {
    TOGGLE_SEM,
    TOGGLE_DIST,
    TOGGLE_DIV,
    TOGGLE_OTHERS,
    TOGGLE_CONFLICT,
    TOGGLE_LEVEL
} from '../constants/actionTypes';

const INITIAL_STATE = {
    semesters: [false, false, false],
    distributions: [false, false, false],
    divisions: [false, false, false],
    others: [false, false],
    levels: [false, false, false, false],
    conflict: false
};

const toggleConf = (state, action) => {
    return Object.assign({}, state, {
        conflict: !state.conflict
    });
};
const toggleSem = (state, action) => {
    const final = state.semesters;
    final[action.index] = !final[action.index];
    return Object.assign({}, state, {
        semesters: final
    });
};
const toggleDist = (state, action) => {
    const final = state.distributions;
    final[action.index] = !final[action.index];
    return Object.assign({}, state, {
        distributions: final
    });
};
const toggleDiv = (state, action) => {
    const final = state.divisions;
    final[action.index] = !final[action.index];
    return Object.assign({}, state, {
        divisions: final
    });
};
const toggleOthers = (state, action) => {
    const final = state.others;
    final[action.index] = !final[action.index];
    return Object.assign({}, state, {
        others: final
    });
};
const toggleLevel = (state, action) => {
    const final = state.levels;
    final[action.index] = !final[action.index];
    return Object.assign({}, state, {
        levels: final
    });
};

function filterReducer(state = INITIAL_STATE, action) {
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
        default:
            return state;
    }
}

export default filterReducer;
