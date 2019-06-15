import {
    TOGGLE_SEM,
    TOGGLE_DIST,
    TOGGLE_DIV,
    TOGGLE_OTHERS,
    TOGGLE_CONFLICT,
    TOGGLE_LEVEL
} from '../constants/actionTypes';

const doToggleSem = (index) => ({
    type: TOGGLE_SEM,
    index
});

const doToggleDist = (index) => ({
    type: TOGGLE_DIST,
    index
});

const doToggleDiv = (index) => ({
    type: TOGGLE_DIV,
    index
});

const doToggleOthers = (index) => ({
    type: TOGGLE_OTHERS,
    index
});

const doToggleConflict = () => ({
    type: TOGGLE_CONFLICT
});

const doToggleLevel = (index) => ({
    type: TOGGLE_LEVEL,
    index
});

export {doToggleConflict, doToggleDist, doToggleDiv, doToggleLevel, doToggleOthers, doToggleSem};
