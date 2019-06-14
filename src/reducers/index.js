import {combineReducers} from 'redux';
import courseReducer from './course';
import hideReducer from './hide';
import addReducer from './added';
import utilReducer from './utils';
import loadReducer from './load';
import searchReducer from './search';

const rootReducer = combineReducers({
    courseState: courseReducer,
    hiddenState: hideReducer,
    addedState: addReducer,
    utilState: utilReducer,
    loadedState: loadReducer,
    searchedState: searchReducer
});

export default rootReducer;
