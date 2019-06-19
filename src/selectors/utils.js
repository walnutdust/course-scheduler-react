const getCurrSubMenu = ({utilState}) => utilState.active;
const getGAPI = ({utilState}) => utilState.gapi;
const getSignInStatus = ({utilState}) => utilState.signedIn;

export {getCurrSubMenu, getGAPI, getSignInStatus};
