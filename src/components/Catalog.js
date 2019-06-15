import React from 'react';
import Course from './Course';
import './Catalog.css';
import {connect} from 'react-redux';
import {doLoadCourses} from '../actions/course';
import {getLoadedCourses} from '../selectors/course';

class Catalog extends React.Component {
    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () => {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 2000 &&
            this.props.loaded.length
        ) {
            this.props.onLoad(this.props.loaded.length / 50 + 1);
        }
    };

    render() {
        return (
            <div class="catalog">
                {(this.props.loaded || []).map((course) => (
                    <Course key={course.CLASS_NBR} course={course} />
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    loaded: getLoadedCourses(state)
});

const mapDispatchToProps = (dispatch) => ({
    onLoad: (newLoadGroup) => dispatch(doLoadCourses(newLoadGroup))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Catalog);
