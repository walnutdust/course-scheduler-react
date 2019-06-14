import React from 'react';
import Course from './Course';
import './Catalog.css';
import {connect} from 'react-redux';
import {doLoadCourses, doSearchCourse} from '../actions/course';
import {getAllCourses, getLoadedCourses, getSearchedCourses} from '../selectors/course';

class Catalog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            group: 1
        };

        // TODO: create a search function.
        this.props.onSearch('', this.props.catalog);
        this.loadNext();
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll = () => {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 2000 &&
            this.props.catalog.length
        ) {
            this.loadNext();
        }
    };

    loadNext() {
        let courses = [];

        console.log(this.props);
        console.log(this.props.searchedCourses.length);
        console.log(this.props.searchedCourses);
        console.log(this.state.group);

        if (this.props.searchedCourses.length >= 50 * this.state.group)
            courses = this.props.searchedCourses.slice(0, 50 * this.state.group);
        else if (this.props.searchedCourses.length > 50 * this.state.group - 1)
            courses = this.props.searchedCourses;
        else console.log('error!'); // TODO: deal with this case

        console.log(this.state.group);
        this.setState({
            group: this.state.group + 1
        });

        this.props.onLoad(courses);
    }

    render() {
        return (
            <div class="catalog">
                {(this.props.loadedCourses || []).map((course) => (
                    <Course key={course.CLASS_NBR} course={course} />
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    catalog: getAllCourses(state),
    loadedCourses: getLoadedCourses(state),
    searchedCourses: getSearchedCourses(state)
});

const mapDispatchToProps = (dispatch) => ({
    onLoad: (courses) => dispatch(doLoadCourses(courses)),
    onSearch: (param, catalog) => dispatch(doSearchCourse(param, catalog))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Catalog);
