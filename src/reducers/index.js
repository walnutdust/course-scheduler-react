import {combineReducers} from 'redux';
import courseReducer from './course';
import hideReducer from './hide';
import addReducer from './added';
import utilReducer from './utils';
import filterReducer from './filter';

const rootReducer = combineReducers({
    courseState: courseReducer,
    hiddenState: hideReducer,
    addedState: addReducer,
    utilState: utilReducer,
    filterState: filterReducer
});

export default rootReducer;
