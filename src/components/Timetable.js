import React from 'react';
import {connect} from 'react-redux';
import {getAddedCourses} from '../selectors/course';
import Schedule from './Schedule';
import Course from './Course';
import './Timetable.css';
import html2canvas from 'html2canvas';
import {getGAPI} from '../selectors/utils';
import {START_F, END_F, START_W, END_W, START_S, END_S, SEMESTERS} from '../constants/constants';

const Timetable = ({added, gapi}) => {
    const exportImage = () => {
        const schedule = document.querySelector('.schedule');
        const scheduleWidth = document.querySelector('.day').offsetWidth + 50;
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

    const courseString = (course) => {
        return course.SUBJECT + ' ' + course.CATALOG_NBR + ' ' + course.COURSE_TITLE_LONG;
    };

    const exportCalendar = () => {
        console.log(gapi);
        gapi.auth2.getAuthInstance().signIn();

        for (const course of added) {
            if (course.WMS_STND_MTG_PAT1 !== ' ' && course.WMS_STND_MTG_PAT1 !== 'TBA') {
                calendarEvent(
                    course,
                    course.WMS_FACIL_DESCR1,
                    course.WMS_START_TIME1,
                    course.WMS_END_TIME1,
                    course.WMS_STND_MTG_PAT1
                );
            }
            if (course.WMS_STND_MTG_PAT2 !== ' ') {
                calendarEvent(
                    course,
                    course.WMS_FACIL_DESCR2,
                    course.WMS_START_TIME2,
                    course.WMS_END_TIME2,
                    course.WMS_STND_MTG_PAT2
                );
            }
            if (course.WMS_STND_MTG_PAT3 !== ' ') {
                calendarEvent(
                    course,
                    course.WMS_FACIL_DESCR3,
                    course.WMS_START_TIME3,
                    course.WMS_END_TIME3,
                    course.WMS_STND_MTG_PAT3
                );
            }
        }
    };

    const getStartDate = (course) => {
        switch (course.STRM) {
            case SEMESTERS[0]:
                return START_F;
            case SEMESTERS[1]:
                return START_W;
            case SEMESTERS[2]:
                return START_S;
            default:
                return;
        }
    };

    const getEndDate = (course) => {
        switch (course.STRM) {
            case SEMESTERS[0]:
                return END_F;
            case SEMESTERS[1]:
                return END_W;
            case SEMESTERS[2]:
                return END_S;
            default:
                return;
        }
    };

    const calendarEvent = (course, location, startT, endT, days) => {
        const event = {
            summary: courseString(course),
            location: location,
            description: course.WMS_DESCR_SRCH,
            start: {
                dateTime: getStartDate(course) + startT + ':00',
                timeZone: 'America/New_York'
            },
            end: {
                dateTime: getStartDate(course) + endT + ':00',
                timeZone: 'America/New_York'
            },
            recurrence: [
                'RRULE:FREQ=WEEKLY;UNTIL=' +
                    getEndDate(course) +
                    'T000000Z;BYDAY=' +
                    dayConversionGCal(days)
            ]
        };

        console.log(event);

        const request = gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event
        });

        request.execute(function(event) {
            console.log('Event created: ' + event.htmlLink);
        });
    };

    const dayConversionGCal = (days) => {
        if (days === 'M-F') return 'MO,TU,WE,TH,FR';

        let result = [];

        days.split('').forEach((day) => {
            switch (day) {
                case 'M':
                    result.push('MO');
                    break;
                case 'T':
                    result.push('TU');
                    break;
                case 'W':
                    result.push('WE');
                    break;
                case 'R':
                    result.push('TH');
                    break;
                case 'F':
                    result.push('FR');
                    break;
                default:
                    break;
            }
        });

        return result.join(',');
    };

    return (
        <div className="timetable">
            <div className="timetable-header">Fall Semester Timetable</div>
            <Schedule />
            <button onClick={exportImage}> export </button>
            <button
                className={gapi ? '' : 'unselectable'}
                onClick={exportCalendar}
                disabled={!gapi}>
                cale
            </button>
            <div className="added">
                <span className="added-courses">Added Courses:</span>
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
    added: getAddedCourses(state),
    gapi: getGAPI(state)
});

export default connect(mapStateToProps)(Timetable);
