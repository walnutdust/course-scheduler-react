import {combineReducers} from 'redux';
import courseReducer from './course';
import bookmarkReducer from './bookmark';
import addReducer from './added';
import utilReducer from './utils';

const rootReducer = combineReducers({
    courseState: courseReducer,
    bookmarkState: bookmarkReducer,
    addState: addReducer,
    utilState: utilReducer
});

export default rootReducer;
