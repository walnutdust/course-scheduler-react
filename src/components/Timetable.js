import React, {Component} from 'react';
import {connect} from 'react-redux';
import {doAddCourse} from '../actions/course';
import {getAddedCourses} from '../selectors/course';
import Schedule from './Schedule';

class Timetable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.added);
        return (
            <div class="timetable">
                <Schedule />
                <div class="added">
                    <span>Added Courses:</span>
                    {(this.props.added || []).map((course) => course.COURSE_TITLE_LONG)}
                </div>
                <div class="bookmarked">
                    <span>Bookmarked Courses:</span>
                </div>
            </div>
        );
    }
}

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
