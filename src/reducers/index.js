import {combineReducers} from 'redux';
import courseReducer from './course';
import bookmarkReducer from './bookmark';
import addReducer from './added';
import utilReducer from './utils';

const rootReducer = combineReducers({
    courseState: courseReducer,
    bookmarkedState: bookmarkReducer,
    addedState: addReducer,
    utilState: utilReducer
});

export default rootReducer;
