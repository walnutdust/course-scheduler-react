import React from 'react';
import './AdditionalOptions.css';
import Checkbox from './Checkbox';
import Select from './Select';
import {connect} from 'react-redux';
import {getSearchedCourses, getStartTimes, getEndTimes} from '../selectors/course';
import {getFilters} from '../selectors/filter';
import {doSearchCourse} from '../actions/course';
import {SEMESTERS, DISTRIBUTIONS, DIVISIONS, OTHERS, LEVELS} from '../constants/constants';
import {
    doToggleConflict,
    doToggleOthers,
    doToggleLevel,
    doToggleSem,
    doToggleDist,
    doToggleDiv,
    doUpdateStart,
    doUpdateEnd
} from '../actions/filter';

const AdditionalOptions = ({
    catalog,
    semClick,
    distClick,
    divClick,
    othersClick,
    conflictClick,
    levelClick,
    filters,
    onSearch,
    startTimes,
    endTimes,
    startChange,
    endChange
}) => {
    const numFound = (length) => {
        if (length === 1) return <span className="num-found">1 course found</span>;
        return <span className="num-found">{length} courses found</span>;
    };

    const courseBySem = [0, 0, 0];
    const courseByLevel = [0, 0, 0, 0];
    const courseByDiv = [0, 0, 0];
    const courseByDist = [0, 0, 0];
    const courseByOthers = [0, 0];

    catalog.forEach((course) => {
        switch (course.STRM) {
            case SEMESTERS[0]:
                courseBySem[0]++;
                break;
            case SEMESTERS[1]:
                courseBySem[1]++;
                break;
            case SEMESTERS[2]:
                courseBySem[2]++;
                break;
            default:
                break;
        }

        const level = Math.floor(parseInt(course.CATALOG_NBR) / 100);
        if (level > 0 && level <= 4) courseByLevel[level - 1]++;

        const attributes = course.WMS_ATTR_SRCH.split(',');
        attributes.forEach((attr) => {
            if (attr === DIVISIONS[0]) courseByDiv[0]++;
            if (attr === DIVISIONS[1]) courseByDiv[1]++;
            if (attr === DIVISIONS[2]) courseByDiv[2]++;

            if (attr === DISTRIBUTIONS[0]) courseByDist[0]++;
            if (attr === DISTRIBUTIONS[1]) courseByDist[1]++;
            if (attr === DISTRIBUTIONS[2]) courseByDist[2]++;
        });

        const grading = course.GRADING_BASIS;
        if (grading === 'OPT') {
            courseByOthers[0]++;
            courseByOthers[1]++;
        } else if (grading === OTHERS[0]) courseByOthers[0]++;
        else if (grading === OTHERS[1]) courseByOthers[1]++;
    });

    const clickLoader = (funct, param) => {
        if (param.target) {
            funct(param.target.value);
        } else funct(param);
        onSearch(undefined, filters);
    };

    return (
        <div class="additional-options">
            {numFound(catalog.length)}
            <span className="refine">Refine by</span>
            <span className="ul-header">Semester</span>
            <ul className="semester">
                <li>
                    <Checkbox onClick={() => clickLoader(semClick, 0)} />
                    Fall ({courseBySem[0]})
                </li>
                <li>
                    <Checkbox onClick={() => clickLoader(semClick, 1)} />
                    Winter ({courseBySem[1]})
                </li>
                <li>
                    <Checkbox onClick={() => clickLoader(semClick, 2)} />
                    Spring ({courseBySem[2]})
                </li>
            </ul>
            <span className="ul-header">Level</span>
            <ul className="Level">
                <li>
                    <Checkbox onClick={() => clickLoader(levelClick, 0)} />
                    100 ({courseByLevel[0]})
                </li>
                <li>
                    <Checkbox onClick={() => clickLoader(levelClick, 1)} />
                    200 ({courseByLevel[1]})
                </li>
                <li>
                    <Checkbox onClick={() => clickLoader(levelClick, 2)} />
                    300 ({courseByLevel[2]})
                </li>
                <li>
                    <Checkbox onClick={() => clickLoader(levelClick, 3)} />
                    400 ({courseByLevel[3]})
                </li>
            </ul>
            <span className="ul-header">Division</span>
            <ul className="Division">
                <li>
                    <Checkbox onClick={() => clickLoader(divClick, 0)} />
                    Division I ({courseByDiv[0]})
                </li>
                <li>
                    <Checkbox onClick={() => clickLoader(divClick, 1)} />
                    Division II ({courseByDiv[1]})
                </li>
                <li>
                    <Checkbox onClick={() => clickLoader(divClick, 2)} />
                    Division III ({courseByDiv[2]})
                </li>
            </ul>
            <span className="ul-header">Distributions</span>
            <ul className="Distribution">
                <li>
                    <Checkbox onClick={() => clickLoader(distClick, 0)} />
                    Diversity, Power, and Equality (DPE) ({courseByDist[0]})
                </li>
                <li>
                    <Checkbox onClick={() => clickLoader(distClick, 1)} />
                    Writing Intensive (WI) ({courseByDist[1]})
                </li>
                <li>
                    <Checkbox onClick={() => clickLoader(distClick, 2)} />
                    Quantitative/Formal Reasoning (QFR) ({courseByDist[2]})
                </li>
            </ul>
            <span className="ul-header">Conflicts</span>
            <ul className="no-conflict">
                <li>
                    <Checkbox onClick={() => clickLoader(conflictClick)} />
                    Only classes that fit my current schedule
                </li>
            </ul>
            <span className="ul-header">Others</span>
            <ul className="pffc">
                <li>
                    <Checkbox onClick={() => clickLoader(othersClick, 0)} />
                    Pass Fail Available ({courseByOthers[0]})
                </li>
                <li>
                    <Checkbox onClick={() => clickLoader(othersClick, 1)} />
                    Fifth Course Available ({courseByOthers[1]})
                </li>
            </ul>
            <ul class="time">
                <li>Start Time</li>
                <Select
                    onChange={(event) => clickLoader(startChange, event)}
                    times={startTimes}
                    defaultValue={''}
                />
                <li>End Time</li>
                <Select
                    onChange={(event) => clickLoader(endChange, event)}
                    times={endTimes}
                    defaultValue={''}
                />
            </ul>
        </div>
    );
};

const mapStateToProps = (state) => ({
    catalog: getSearchedCourses(state),
    filters: getFilters(state),
    startTimes: getStartTimes(state),
    endTimes: getEndTimes(state)
});

const mapDispatchToProps = (dispatch) => ({
    onSearch: (query = undefined, filters) => dispatch(doSearchCourse(query, filters)),
    conflictClick: () => dispatch(doToggleConflict()),
    othersClick: (index) => dispatch(doToggleOthers(index)),
    divClick: (index) => dispatch(doToggleDiv(index)),
    distClick: (index) => dispatch(doToggleDist(index)),
    levelClick: (index) => dispatch(doToggleLevel(index)),
    semClick: (index) => dispatch(doToggleSem(index)),
    startChange: (time) => dispatch(doUpdateStart(time)),
    endChange: (time) => dispatch(doUpdateEnd(time))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdditionalOptions);
