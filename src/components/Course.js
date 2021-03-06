import React from 'react';
import './Course.css';
import {connect} from 'react-redux';
import {doAddCourse, doRemoveCourse, doHideCourse, doUnhideCourse} from '../actions/course';
import {getAddedCourses, getHiddenCourses, getUnhiddenCourses} from '../selectors/course';
import {BORDER_PALATTE} from '../constants/constants';

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
        if (STRM === '1201') return 'Fall';
        else if (STRM === '1202') return 'Winter';
        else if (STRM === '1203') return 'Spring';
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
        if (event.target.localName === 'button' || event.target.localName === 'a') return;
        let bodyVisibility = event.currentTarget.children[1].hidden;
        event.currentTarget.children[1].hidden = bodyVisibility ? false : true;
    };

    const passfail = () => {
        if (GRADING_BASIS) {
            switch (GRADING_BASIS) {
                case 'WPP':
                    return 'Winter Study Course';
                case 'GRD':
                    return 'No Pass/Fail or Fifth Course Available';
                case 'OPT':
                    return 'Pass/Fail Available, Fifth Course Available';
                case 'OPX':
                    return 'Pass/Fail Unavailable, Fifth Course Available';
                case 'OPP':
                    return 'Pass/Fail Available, Fifth Course Unavailable';
                default:
                    return;
            }
        }
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
                        <i class="material-icons">{isAdded ? 'event_busy' : 'event_available'} </i>
                        <span>{isAdded ? 'Remove' : 'Add'}</span>
                    </button>
                </div>
            );
    };

    const distributionIcons = () => {
        if (WMS_ATTR_SRCH) {
            return (
                <div class="dis-icons">
                    {WMS_ATTR_SRCH.split(',').map((attr) => distributionIcon(attr))}
                </div>
            );
        }
    };

    const distributionIcon = (dist) => {
        switch (dist) {
            case 'DIV_D1':
                return <i class={'dreq d1'}>I</i>;
            case 'DIV_D2':
                return <i class={'dreq d2'}>II</i>;
            case 'DIV_D3':
                return <i class={'dreq d3'}>III</i>;
            case 'WAC_WAC':
                return <i class={'dreq wi'}>W</i>;
            case 'DPE_DPE':
                return <i class={'dreq dpe'}>D</i>;
            case 'QFR_QFR':
                return <i class={'dreq qfr'}>Q</i>;
            default:
                return;
        }
    };

    const ssrComponent = (comp) => {
        switch (comp) {
            case 'LEC':
                return 'Lecture';
            case 'SEM':
                return 'Seminar';
            case 'TUT':
                return 'Tutorial';
            case 'STU':
                return 'Studio';
            case 'IND':
                return 'Independent Study';
            default:
                return comp;
        }
    };

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div
            class="course"
            style={
                isAdded
                    ? {borderLeft: '5px solid ' + BORDER_PALATTE[addIndex % BORDER_PALATTE.length]}
                    : {}
            }
            onClick={toggleBody}>
            <div class="course-header">
                <div class="row course-title">
                    <div class="row title">
                        {SUBJECT} {CATALOG_NBR} {COURSE_TITLE_LONG}
                    </div>
                    <div class="row header-info">
                        <div class="column">{distributionIcons()}</div>
                        <div class="column ra">
                            {semester() + ', ' + ssrComponent(SSR_COMPONENT)}, Section{' '}
                            {CLASS_SECTION}
                        </div>
                    </div>
                </div>
                <div class="row course-summary">
                    <div class="column">
                        <div class="row">
                            <span>{instructors()}</span>
                            <span>{courseTime()}</span>
                        </div>
                        <div class="row">
                            <p>
                                <strong class="course-prereqs">Pre-Requisites:&nbsp;</strong>{' '}
                                {WMS_PREREQS}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="course-body" hidden>
                <p class="course-description">{WMS_DESCR_SRCH}</p>
                <p class="course-format">
                    <strong>Class Format:</strong> {capitalize(WMS_CLASS_FORMAT)}
                </p>

                <p class="course-enroll-pref">
                    <strong>Enrollment Preferences:</strong> {capitalize(WMS_RQMT_EVAL)}
                </p>

                <p class="course-distributions">
                    <strong>Distributions:</strong> {courseDistributions()}
                </p>

                <p class="pass-fail">
                    <strong>{passfail()}</strong>
                </p>

                <p class="extra-information">
                    <strong>Extra Information:</strong> {extraInfo()}
                </p>
            </div>

            {courseButtons()}
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
