import {SUBMENU_CHANGE, UPDATE_GAPI, UPDATE_SIGNIN} from '../constants/actionTypes';

const doSubmenuChange = (newState) => ({
    type: SUBMENU_CHANGE,
    newState
});

const updateGAPI = (gapi) => ({
    type: UPDATE_GAPI,
    gapi
});

const updateSignIn = (signedIn) => ({
    type: UPDATE_SIGNIN,
    signedIn
});

export {doSubmenuChange, updateGAPI, updateSignIn};
