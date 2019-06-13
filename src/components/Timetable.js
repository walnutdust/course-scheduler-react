import React from 'react';
import {connect} from 'react-redux';
import {getAddedCourses} from '../selectors/course';
import Schedule from './Schedule';
import Course from './Course';
import './Timetable.css';

const Timetable = ({added}) => {
    return (
        <div class="timetable">
            <div class="timetable-header">Fall Semester Timetable</div>
            <Schedule />
            <div class="added">
                <span class="added-courses">Added Courses:</span>
                {(added || []).map((course) => (
                    <Course course={course} location="timetable" />
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    added: getAddedCourses(state)
});

export default connect(mapStateToProps)(Timetable);
