import React from 'react';
import Course from './Course';
import './Catalog.css';
import {connect} from 'react-redux';
import {doAddCourse} from '../actions/course';
import {getAllCourses} from '../selectors/course';

const Catalog = ({catalog}) => (
    <div class="catalog">
        {(catalog || []).map((course) => (
            <Course key={course.CLASS_NBR} course={course} />
        ))}
    </div>
);

const mapStateToProps = (state) => ({
    catalog: getAllCourses(state)
});

const mapDispatchToProps = (dispatch) => ({
    onAdd: (id) => dispatch(doAddCourse(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Catalog);
