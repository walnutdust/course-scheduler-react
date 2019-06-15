import React, {Component} from 'react';
import {connect} from 'react-redux';
import {doSearchCourse, doResetLoad, doLoadCourses} from '../actions/course';
import {getSearchedCourses, getLoadedCourses} from '../selectors/course';
import {getFilters} from '../selectors/filter';
import './Search.css';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
            group: 1
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        const {value} = event.target;
        this.setState({query: value});
        this.props.onSearch(value, this.props.filters);
        this.props.resetLoad();
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} class="search">
                <i class="material-icons">search</i>
                <input
                    class="course-search"
                    type="text"
                    placeholder="Enter course title or code"
                    value={this.state.query}
                    onChange={this.onChange}
                />
                <Button type="submit">Search</Button>
            </form>
        );
    }
}

const Button = ({onClick, className, type = 'button', children}) => (
    <button type={type} className={className} onClick={onClick}>
        {children}
    </button>
);

const mapStateToProps = (state) => ({
    catalog: getSearchedCourses(state),
    loadedCourses: getLoadedCourses(state),
    filters: getFilters(state)
});

const mapDispatchToProps = (dispatch) => ({
    onSearch: (query, filters) => dispatch(doSearchCourse(query, filters)),
    onLoad: (courses) => dispatch(doLoadCourses(courses)),
    resetLoad: () => dispatch(doResetLoad())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Search);
