import React from 'react';
import './AdditionalOptions.css';
import Checkbox from './Checkbox';
import {connect} from 'react-redux';
import {getSearchedCourses} from '../selectors/course';
import {
    doToggleConflict,
    doToggleOthers,
    doToggleLevel,
    doToggleSem,
    doToggleDist,
    doToggleDiv
} from '../actions/filter';

const AdditionalOptions = ({
    catalog,
    semClick,
    distClick,
    divClick,
    othersClick,
    conflictClick,
    levelClick
}) => {
    const numFound = (length) => {
        if (length === 1) return <span class="num-found">1 course found</span>;
        return <span class="num-found">{length} courses found</span>;
    };

    const courseBySem = [0, 0, 0];
    const courseByLevel = [0, 0, 0, 0];
    const courseByDiv = [0, 0, 0];
    const courseByDist = [0, 0, 0];

    catalog.forEach((course) => {
        switch (course.STRM) {
            case '1201':
                courseBySem[0]++;
                break;
            case '1202':
                courseBySem[1]++;
                break;
            case '1203':
                courseBySem[2]++;
                break;
            default:
                break;
        }

        const level = Math.floor(parseInt(course.CATALOG_NBR) / 100);
        if (level > 0 && level <= 4) courseByLevel[level - 1]++;

        const attributes = course.WMS_ATTR_SRCH.split(',');
        attributes.forEach((attr) => {
            if (attr === 'DIV_D1') courseByDiv[0]++;
            if (attr === 'DIV_D2') courseByDiv[1]++;
            if (attr === 'DIV_D3') courseByDiv[2]++;

            if (attr === 'DPE_DPE') courseByDist[0]++;
            if (attr === 'WAC_WAC') courseByDist[1]++;
            if (attr === 'QFR_QFR') courseByDist[2]++;
        });
    });

    return (
        <div class="additional-options">
            {numFound(catalog.length)}
            <span class="refine">Refine by</span>
            <span class="ul-header">Semester</span>
            <ul class="semester">
                <li>
                    <Checkbox onClick={() => semClick(0)} />
                    Fall ({courseBySem[0]})
                </li>
                <li>
                    <Checkbox onClick={() => semClick(1)} />
                    Winter ({courseBySem[1]})
                </li>
                <li>
                    <Checkbox onClick={() => semClick(2)} />
                    Spring ({courseBySem[2]})
                </li>
            </ul>
            <span class="ul-header">Level</span>
            <ul class="Level">
                <li>
                    <Checkbox onClick={() => levelClick(0)} />
                    100 ({courseByLevel[0]})
                </li>
                <li>
                    <Checkbox onClick={() => levelClick(1)} />
                    200 ({courseByLevel[1]})
                </li>
                <li>
                    <Checkbox onClick={() => levelClick(2)} />
                    300 ({courseByLevel[2]})
                </li>
                <li>
                    <Checkbox onClick={() => levelClick(3)} />
                    400 ({courseByLevel[3]})
                </li>
            </ul>
            <span class="ul-header">Division</span>
            <ul class="Division">
                <li>
                    <Checkbox onClick={() => divClick(0)} />
                    Division I ({courseByDiv[0]})
                </li>
                <li>
                    <Checkbox onClick={() => divClick(1)} />
                    Division II ({courseByDiv[1]})
                </li>
                <li>
                    <Checkbox onClick={() => divClick(2)} />
                    Division III ({courseByDiv[2]})
                </li>
            </ul>
            <span class="ul-header">Distributions</span>
            <ul class="Distribution">
                <li>
                    <Checkbox onClick={() => distClick(0)} />
                    Diversity, Power, and Equality (DPE) ({courseByDist[0]})
                </li>
                <li>
                    <Checkbox onClick={() => distClick(1)} />
                    Writing Intensive (WI) ({courseByDist[1]})
                </li>
                <li>
                    <Checkbox onClick={() => distClick(2)} />
                    Quantitative/Formal Reasoning (QFR) ({courseByDist[2]})
                </li>
            </ul>
            <span class="ul-header">Conflicts</span>
            <ul class="no-conflict">
                <li>
                    <Checkbox onClick={() => conflictClick()} />
                    Only classes that fit my current schedule
                </li>
            </ul>
            <span class="ul-header">Others</span>
            <ul class="pffc">
                <li>
                    <Checkbox onClick={() => othersClick(0)} />
                    Pass Fail Available
                </li>
                <li>
                    <Checkbox onClick={() => othersClick(1)} />
                    Fifth Course Available
                </li>
            </ul>
            <ul class="time">
                <li>Start Time</li>
                <li>End Time</li>
            </ul>
        </div>
    );
};

const mapStateToProps = (state) => ({
    catalog: getSearchedCourses(state)
});

const mapDispatchToProps = (dispatch) => ({
    conflictClick: () => dispatch(doToggleConflict()),
    othersClick: (index) => dispatch(doToggleOthers(index)),
    divClick: (index) => dispatch(doToggleDiv(index)),
    distClick: (index) => dispatch(doToggleDist(index)),
    levelClick: (index) => dispatch(doToggleLevel(index)),
    semClick: (index) => dispatch(doToggleSem(index))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdditionalOptions);
