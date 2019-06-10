import React, {Component} from 'react';
import {connect} from 'react-redux';
import {doAddCourse} from '../actions/course';
import {getAddedCourses} from '../selectors/course';

class Timetable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.added);
        return (
            <div class="timetable">
                {(this.props.added || []).map((course) => course.COURSE_TITLE_LONG)}
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
