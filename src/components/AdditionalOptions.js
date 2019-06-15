import React from 'react';
import './AdditionalOptions.css';
import Checkbox from './Checkbox';
import {connect} from 'react-redux';
import {getSearchedCourses} from '../selectors/course';

const AdditionalOptions = ({catalog}) => {
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
                    <Checkbox />
                    Fall ({courseBySem[0]})
                </li>
                <li>
                    <Checkbox />
                    Winter ({courseBySem[1]})
                </li>
                <li>
                    <Checkbox />
                    Spring ({courseBySem[2]})
                </li>
            </ul>
            <span class="ul-header">Level</span>
            <ul class="Level">
                <li>
                    <Checkbox />
                    100 ({courseByLevel[0]})
                </li>
                <li>
                    <Checkbox />
                    200 ({courseByLevel[1]})
                </li>
                <li>
                    <Checkbox />
                    300 ({courseByLevel[2]})
                </li>
                <li>
                    <Checkbox />
                    400 ({courseByLevel[3]})
                </li>
            </ul>
            <span class="ul-header">Division</span>
            <ul class="Division">
                <li>
                    <Checkbox />
                    Division I ({courseByDiv[0]})
                </li>
                <li>
                    <Checkbox />
                    Division II ({courseByDiv[1]})
                </li>
                <li>
                    <Checkbox />
                    Division III ({courseByDiv[2]})
                </li>
            </ul>
            <span class="ul-header">Distributions</span>
            <ul class="Distribution">
                <li>
                    <Checkbox />
                    Diversity, Power, and Equality (DPE) ({courseByDist[0]})
                </li>
                <li>
                    <Checkbox />
                    Writing Intensive (WI) ({courseByDist[1]})
                </li>
                <li>
                    <Checkbox />
                    Quantitative/Formal Reasoning (QFR) ({courseByDist[2]})
                </li>
            </ul>
            <span class="ul-header">Conflicts</span>
            <ul class="no-conflict">
                <li>
                    <Checkbox />
                    Only classes that fit my current schedule
                </li>
            </ul>
            <span class="ul-header">Others</span>
            <ul class="pffc">
                <li>
                    <Checkbox />
                    Pass Fail Available
                </li>
                <li>
                    <Checkbox />
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

export default connect(mapStateToProps)(AdditionalOptions);
