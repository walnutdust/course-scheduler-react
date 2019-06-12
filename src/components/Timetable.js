import React, {Component} from 'react';
import {connect} from 'react-redux';
import {doAddCourse} from '../actions/course';
import {getAddedCourses} from '../selectors/course';
import Schedule from './Schedule';
import Course from './Course';

const Timetable = ({added}) => {
    const timetableCourse = (course) => {
        return <Course course={course} />;
    };

    console.log(added);

    return (
        <div class="timetable">
            <Schedule />
            <div class="added">
                <span>Added Courses:</span>
                {(added || []).map((course) => timetableCourse(course))}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    added: getAddedCourses(state)
});

const mapDispatchToProps = (dispatch) => ({
    onAdd: (course) => dispatch(doAddCourse(course))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Timetable);
