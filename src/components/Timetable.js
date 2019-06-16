import React from 'react';
import {connect} from 'react-redux';
import {getAddedCourses} from '../selectors/course';
import Schedule from './Schedule';
import Course from './Course';
import './Timetable.css';
import html2canvas from 'html2canvas';

const Timetable = ({added}) => {
    const exportImage = () => {
        const schedule = document.querySelector('.schedule');
        const scheduleWidth = document.querySelector('.day').offsetWidth + 50;
        console.log(scheduleWidth);
        schedule.style.overflow = 'visible';
        html2canvas(schedule, {
            width: scheduleWidth
        }).then(function(canvas) {
            // Export the canvas to its data URI representation
            var base64image = canvas.toDataURL('image/png');

            // Open the image in a new window
            window.open(base64image, '_blank');
        });
        //schedule.setAttribute('overflow-x', 'scroll');
    };
    return (
        <div class="timetable">
            <div class="timetable-header">Fall Semester Timetable</div>
            <Schedule />
            <button onClick={exportImage}> export </button>
            <div class="added">
                <span class="added-courses">Added Courses:</span>
                {(added || [])
                    .sort((a, b) => {
                        const titleA = a.SUBJECT.toUpperCase() + a.CATALOG_NBR;
                        const titleB = b.SUBJECT.toUpperCase() + b.CATALOG_NBR;
                        return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
                    })
                    .map((course) => (
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
