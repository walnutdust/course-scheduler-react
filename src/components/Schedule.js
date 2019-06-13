import React from 'react';
import {connect} from 'react-redux';
import {getUnhiddenCourses} from '../selectors/course';
import './Schedule.css';

const Schedule = ({unhidden}) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const startHour = 8;
    const endHour = 22;
    const hours = [];
    for (let i = startHour; i < endHour; i++) {
        hours.push(i);
    }
    const courseDay = {
        Mon: [[]],
        Tue: [[]],
        Wed: [[]],
        Thu: [[]],
        Fri: [[]]
    };

    const HourTitles = (hour) => {
        return <div class="hour-title">{hour}</div>;
    };

    const CourseSlot = (slot) => {
        if (slot.length === 0) return;
        const leftAttr = ((parseInt(slot[0]) - 8 * 60) * (100 / 14)) / 60 + '%';
        const widthAttr = (parseInt(slot[1]) * (100 / 14)) / 60 + '%';
        const course = slot[2];

        return (
            <div class="course-slot" style={{left: leftAttr, width: widthAttr}}>
                <div class="course-slot-title">{course.SUBJECT + ' ' + course.CATALOG_NBR}</div>
                <div>{course.SSR_COMPONENT + ' [' + course.CLASS_SECTION + ']'}</div>
                <div>{course.FACIL_DESCR1}</div>
                <div>{stringTime(slot[0], slot[1])}</div>
            </div>
        );
    };

    const stringTime = (start, duration) => {
        const startTime = Math.floor(start / 60) + ':' + padZero(start % 60, 2);
        const end = start + duration;
        const endTime = Math.floor(end / 60) + ':' + padZero(end % 60, 2);
        return startTime + ' - ' + endTime;
    };

    const padZero = (number, width) => {
        width -= number.toString().length;

        if (width > 0) {
            return new Array(width + 1).join('0') + number;
        }

        return number.toString();
    };

    const DayComponent = (day) => {
        return (
            <li class="day row">
                <div class="day-title">
                    <span>{day}</span>
                </div>
                {(courseDay[day] || []).map((row) => DayCourseComponent(row))}
            </li>
        );
    };

    const DayCourseComponent = (row) => {
        return (
            <div class="column">
                {row.map((slot) => {
                    return <div class="course-containers">{CourseSlot(slot)}</div>;
                })}
                {row.length === 0 && <div class="course-containers" />}
            </div>
        );
    };

    const courseTimeParsed = (course) => {
        const result = [];

        // Check for tutorials or TBA?
        if (course.WMS_STND_MTG_PAT1 !== ' ') {
            const courseDays = getCourseDays(course.WMS_STND_MTG_PAT1);

            for (const day of courseDays) {
                const slot = [];
                slot.push(day);
                slot.push(parseTime(course.WMS_START_TIME1));
                const slotLength =
                    parseTime(course.WMS_END_TIME1) - parseTime(course.WMS_START_TIME1);
                slot.push(slotLength);
                result.push(slot);
            }
        }

        if (course.WMS_STND_MTG_PAT2 !== ' ') {
            const courseDays = getCourseDays(course.WMS_STND_MTG_PAT2);

            for (const day of courseDays) {
                const slot = [];
                slot.push(day);
                slot.push(parseTime(course.WMS_START_TIME2));
                const slotLength =
                    parseTime(course.WMS_END_TIME2) - parseTime(course.WMS_START_TIME2);
                slot.push(slotLength);
                result.push(slot);
            }
        }

        if (course.WMS_STND_MTG_PAT3 !== ' ') {
            const courseDays = getCourseDays(course.WMS_STND_MTG_PAT3);

            for (const day of courseDays) {
                const slot = [];
                slot.push(day);
                slot.push(parseTime(course.WMS_START_TIME3));
                const slotLength =
                    parseTime(course.WMS_END_TIME3) - parseTime(course.WMS_START_TIME3);
                slot.push(slotLength);
                result.push(slot);
            }
        }

        return result;
    };

    const parseTime = (time) => {
        const splitTime = time.split(':');
        return parseInt(splitTime[0]) * 60 + parseInt(splitTime[1]);
    };

    const getCourseDays = (days) => {
        if (days === 'M-F') return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

        const splitDays = days.split('');
        const result = [];

        for (const day of splitDays) {
            switch (day) {
                case 'M':
                    result.push('Mon');
                    break;
                case 'T':
                    result.push('Tue');
                    break;
                case 'W':
                    result.push('Wed');
                    break;
                case 'R':
                    result.push('Thu');
                    break;
                case 'F':
                    result.push('Fri');
                    break;
                default:
                    break;
            }
        }

        return result;
    };

    const checkConflict = (this_slot, other_slot) => {
        if (this_slot[1] < other_slot[1] + other_slot[2] && this_slot[1] > other_slot[1])
            return true;
        if (other_slot[1] < this_slot[1] + this_slot[2] && other_slot[1] > this_slot[1])
            return true;

        return false;
    };

    const addSlot = (slot, course) => {
        for (const dayRow of courseDay[slot[0]]) {
            let conflict_present = false;
            for (const other_slot of dayRow) {
                if (checkConflict(slot, other_slot)) {
                    conflict_present = true;
                    break;
                }
            }

            if (conflict_present) continue;
            else {
                dayRow.push([slot[1], slot[2], course]);
                return;
            }
        }

        courseDay[slot[0]].push([[slot[1], slot[2], course]]);
    };

    for (const course of unhidden) {
        const parsedSlots = courseTimeParsed(course);

        for (const slot of parsedSlots) {
            addSlot(slot, course);
        }
    }

    return (
        <div class="schedule">
            <ol>
                <li class="hour-labels">
                    <div class="buffer">&nbsp;</div>
                    {hours.map((hour) => HourTitles(hour))}
                </li>
                {days.map((day) => DayComponent(day))}
            </ol>
        </div>
    );
};

const mapStateToProps = (state) => ({
    unhidden: getUnhiddenCourses(state)
});

export default connect(mapStateToProps)(Schedule);
