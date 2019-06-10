import {SUBMENU_CHANGE} from '../constants/actionTypes';

const doSubmenuChange = (newState) => ({
    type: SUBMENU_CHANGE,
    newState
});

export {doSubmenuChange};
