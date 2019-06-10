import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import store from './store';
import catalog_data from './data/1920';
import * as serviceWorker from './serviceWorker';
import {COURSE_ADD} from './constants/actionTypes';
import {getAddedCourses} from './selectors/course';
import {doAddCourse} from './actions/add';
import {Provider} from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
