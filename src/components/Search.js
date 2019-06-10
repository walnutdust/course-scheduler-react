import React, {Component} from 'react';
import './Search.css';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        const {query} = this.state;
        if (query) {
            this.props.onFetchStories(query);

            this.setState({query: ''});
        }

        event.preventDefault();
    }

    onChange(event) {
        const {value} = event.target;
        this.setState({query: value});
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

export default Search;
