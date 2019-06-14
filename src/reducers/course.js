import INITIAL_CATALOG from '../data/1920';

const INITIAL_STATE = INITIAL_CATALOG.filter((course) => course.OFFERED === 'Y');

function courseReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default courseReducer;
