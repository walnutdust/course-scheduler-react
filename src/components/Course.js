import React from 'react';
import './Course.css';
import {connect} from 'react-redux';
import {doAddCourse, doRemoveCourse, doHideCourse, doUnhideCourse} from '../actions/course';
import {getAddedCourses, getHiddenCourses, getUnhiddenCourses} from '../selectors/course';
import {START_F, END_F, START_W, END_W, START_S, END_S, PALATTE} from '../constants/constants';

const Course = ({added, hidden, course, location, onAdd, onRemove, onHide, onUnhide}) => {
    const {
        WMS_ACAD_YEAR,
        OFFERED,
        STRM,
        CRSE_ID,
        EFFDT,
        SUBJECT,
        CATALOG_NBR,
        CLASS_SECTION,
        CLASS_NBR,
        CONSENT,
        GRADING_BASIS,
        SSR_COMPONENT,
        DESCR,
        UNITS_MINIMUM,
        COURSE_TITLE_LONG,
        WMS_FIRST_NAME1,
        WMS_MID_NAME1,
        WMS_LAST_NAME1,
        URL_1,
        WMS_FIRST_NAME2,
        WMS_MID_NAME2,
        WMS_LAST_NAME2,
        URL_2,
        WMS_FIRST_NAME3,
        WMS_MID_NAME3,
        WMS_LAST_NAME3,
        URL_3,
        WMS_FIRST_NAME4,
        WMS_MID_NAME4,
        WMS_LAST_NAME4,
        URL_4,
        WMS_FIRST_NAME5,
        WMS_MID_NAME5,
        WMS_LAST_NAME5,
        URL_5,
        WMS_FIRST_NAME6,
        WMS_MID_NAME6,
        WMS_LAST_NAME6,
        URL_6,
        WMS_STND_MTG_PAT1,
        WMS_START_TIME1,
        WMS_END_TIME1,
        WMS_FACIL_DESCR1,
        WMS_STND_MTG_PAT2,
        WMS_START_TIME2,
        WMS_END_TIME2,
        WMS_FACIL_DESCR2,
        WMS_STND_MTG_PAT3,
        WMS_START_TIME3,
        WMS_END_TIME3,
        WMS_FACIL_DESCR3,
        WMS_ATTR_SRCH,
        WMS_CLASS_FORMAT,
        WMS_RQMT_EVAL,
        WMS_EXTRA_INFO,
        WMS_EXTRA_INFO2,
        WMS_INSTR_OTH,
        WMS_PREREQS,
        WMS_ENFRL_PREF,
        WMS_DEPT_NOTES,
        WMS_MATL_FEE,
        WMS_EXP_ENRL,
        WMS_ENRL_LIMIT,
        WMS_NC,
        CAMPUS,
        WMS_DESCR140,
        WMS_SHORT_DESCR,
        WMS_DISTRIB_NT1,
        WMS_DISTRIB_NT2,
        WMS_DISTRIB_NT3,
        WMS_DESCR_SRCH,
        WMS_DISTRIB_NOTES
    } = course;

    const semester = () => {
        if (STRM === '1201') return '(Fall)';
        else if (STRM === '1202') return '(Winter)';
        else if (STRM === '1203') return '(Spring)';
    };

    const instructors = () => {
        const names = [
            [WMS_FIRST_NAME1, WMS_MID_NAME1, WMS_LAST_NAME1, URL_1],
            [WMS_FIRST_NAME2, WMS_MID_NAME2, WMS_LAST_NAME2, URL_2],
            [WMS_FIRST_NAME3, WMS_MID_NAME3, WMS_LAST_NAME3, URL_3],
            [WMS_FIRST_NAME4, WMS_MID_NAME4, WMS_LAST_NAME4, URL_4],
            [WMS_FIRST_NAME5, WMS_MID_NAME5, WMS_LAST_NAME5, URL_5],
            [WMS_FIRST_NAME6, WMS_MID_NAME6, WMS_LAST_NAME6, URL_6]
        ];
        let result = [];

        names.forEach((name) => {
            if (name[0] !== ' ') {
                let data = name[0] + ' ';
                if (name[1] !== ' ') data += name[1] + ' ';
                data += name[2];
                let prof = {name: data, url: name[3]};
                result.push(prof);
            }
        });

        return (
            <span>
                {result.map((prof, index) => (
                    <a key={index} href={prof.url}>
                        {prof.name}
                    </a>
                ))}
                &emsp;
            </span>
        );
    };

    const courseTime = () => {
        let result = '';

        if (WMS_STND_MTG_PAT1 !== ' ')
            result +=
                WMS_STND_MTG_PAT1 +
                ' ' +
                WMS_START_TIME1 +
                ' - ' +
                WMS_END_TIME1 +
                ' ' +
                WMS_FACIL_DESCR1;
        if (WMS_STND_MTG_PAT2 !== ' ')
            result +=
                WMS_STND_MTG_PAT2 +
                ' ' +
                WMS_START_TIME2 +
                ' - ' +
                WMS_END_TIME2 +
                ' ' +
                WMS_FACIL_DESCR2;
        if (WMS_STND_MTG_PAT3 !== ' ')
            result +=
                WMS_STND_MTG_PAT3 +
                ' ' +
                WMS_START_TIME3 +
                ' - ' +
                WMS_END_TIME3 +
                ' ' +
                WMS_FACIL_DESCR3;

        return result;
    };

    const gcalUrl = () => {
        let result = [];

        if (WMS_STND_MTG_PAT1 !== ' ' && WMS_STND_MTG_PAT1 !== 'TBA')
            result.push(
                gcalUrlGenerator(
                    WMS_START_TIME1,
                    WMS_END_TIME1,
                    WMS_STND_MTG_PAT1,
                    WMS_FACIL_DESCR1
                )
            );
        if (WMS_STND_MTG_PAT2 !== ' ')
            result.push(
                gcalUrlGenerator(
                    WMS_START_TIME2,
                    WMS_END_TIME2,
                    WMS_STND_MTG_PAT2,
                    WMS_FACIL_DESCR2
                )
            );
        if (WMS_STND_MTG_PAT3 !== ' ')
            result.push(
                gcalUrlGenerator(
                    WMS_START_TIME3,
                    WMS_END_TIME3,
                    WMS_STND_MTG_PAT3,
                    WMS_FACIL_DESCR3
                )
            );

        return result;
    };

    const gcalUrlGenerator = (start, end, days, location) => {
        let start_string = start.split(':')[0].rjust(2, '0') + start.split(':')[1] + '00';
        let end_string = end.split(':')[0].rjust(2, '0') + end.split(':')[1] + '00';
        return (
            'https://calendar.google.com/calendar/r/eventedit?text=' +
            SUBJECT +
            ' ' +
            CATALOG_NBR +
            ' ' +
            COURSE_TITLE_LONG +
            '&dates=' +
            START_F +
            'T' +
            start_string +
            '/' +
            START_F +
            'T' +
            end_string +
            +'&recur=rrule:freq=WEEKLY;until=' +
            END_F +
            'T000000;byday=' +
            dayConversionGCal(days) +
            '&details=' +
            WMS_DESCR_SRCH +
            '&location=' +
            location +
            '&sf=true&output=xml'
        );
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

    const extraInfo = () => {
        if (WMS_EXTRA_INFO === ' ') return 'None';
        else {
            if (WMS_EXTRA_INFO2 === ' ') return WMS_EXTRA_INFO;
            else return WMS_EXTRA_INFO + '; ' + WMS_EXTRA_INFO2;
        }
    };

    const courseDistributions = () => {
        let result = '';
        if (WMS_ATTR_SRCH) {
            WMS_ATTR_SRCH.split(',').forEach((attr) => {
                switch (attr) {
                    case 'DIV_D1':
                        result += ' Division I;';
                        break;
                    case 'DIV_D2':
                        result += ' Division II;';
                        break;
                    case 'DIV_D3':
                        result += ' Division III;';
                        break;
                    case 'DPE_DPE':
                        result += ' Difference, Power, and Equity;';
                        break;
                    case 'WAC_WAC':
                        result += ' Writing Intensive;';
                        break;
                    case 'QFR_QFR':
                        result += ' Quantitative/Formal Reasoning (QFR);';
                        break;
                    default:
                        break;
                }
            });
        }
        return result.slice(1, -1);
    };

    const toggleBody = (event) => {
        console.log(event.target);
        if (event.target.localName !== 'div') return;
        let bodyVisibility = event.currentTarget.children[1].hidden;
        event.currentTarget.children[1].hidden = bodyVisibility ? false : true;
    };

    const addIndex = added.indexOf(course);
    const isAdded = addIndex !== -1;
    const isHidden = hidden.indexOf(course) !== -1;

    const courseButtons = () => {
        if (location === 'timetable')
            return (
                <div class="course-buttons">
                    <button onClick={() => onRemove(course)}>
                        <i class="material-icons">delete_forever</i>
                    </button>
                    <button onClick={() => (isHidden ? onUnhide(course) : onHide(course))}>
                        <i class="material-icons">{isHidden ? 'visibility_off' : 'visibility'}</i>
                    </button>
                </div>
            );
        else
            return (
                <div class="course-buttons">
                    <button onClick={() => (isAdded ? onRemove(course) : onAdd(course))}>
                        {isAdded ? 'Remove from Calendar' : 'Add to Calendar'}
                    </button>
                </div>
            );
    };

    return (
        <div
            class="course"
            style={isAdded ? {backgroundColor: PALATTE[addIndex % PALATTE.length]} : {}}
            onClick={toggleBody}>
            <div class="course-header">
                <div class="row course-title">
                    {SUBJECT} {CATALOG_NBR} - {CLASS_SECTION} {semester()} {COURSE_TITLE_LONG} (
                    {SSR_COMPONENT})
                </div>
                <div class="row">
                    <span>{instructors()}</span>
                    <span>{courseTime()}</span>
                    {courseButtons()}
                </div>
            </div>

            <div class="course-body">
                <p class="course-description">{WMS_DESCR_SRCH}</p>
                <p class="course-format">
                    <strong>Class Format:</strong> {WMS_CLASS_FORMAT}
                </p>

                <p class="course-enroll-pref">
                    <strong>Enrollment Preferences:</strong> {WMS_RQMT_EVAL}
                </p>

                <p class="course-prereqs">
                    <strong>Pre-Requisites:</strong> {WMS_PREREQS}
                </p>

                <p class="course-distributions">
                    <strong>Distributions:</strong> {courseDistributions()}
                </p>

                <p class="extra-information">
                    <strong>Extra Information:</strong> {extraInfo()}
                </p>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    hidden: getHiddenCourses(state),
    unhidden: getUnhiddenCourses(state),
    added: getAddedCourses(state)
});

const mapDispatchToProps = (dispatch) => ({
    onAdd: (course) => dispatch(doAddCourse(course)),
    onRemove: (course) => dispatch(doRemoveCourse(course)),
    onHide: (course) => dispatch(doHideCourse(course)),
    onUnhide: (course) => dispatch(doUnhideCourse(course))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Course);
