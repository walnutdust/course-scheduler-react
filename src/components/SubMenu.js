import React from 'react';
import './SubMenu.css';
import {connect} from 'react-redux';
import {doSubmenuChange} from '../actions/utils';

const SubMenu = ({handler}) => {
    // editActive(newActive) {
    // console.log(newActive);
    // this.setState({
    // active: newActive
    // });
    // }
    const subSelection = (event) => {
        const allListItems = event.currentTarget.parentElement.parentElement.children;
        for (let child of allListItems) {
            child.classList.add('unselected');
        }
        event.currentTarget.parentElement.classList.toggle('unselected');
        handler(event.currentTarget.children[1].innerText);
    };

    const ListItem = ({image, text, className}) => {
        let classes = 'list-item ' + className;
        return (
            <li class={classes}>
                <div onClick={subSelection}>
                    <i className="material-icons">{image}</i>
                    <div>{text}</div>
                </div>
            </li>
        );
    };
    return (
        <div class="submenu">
            <ul>
                <ListItem image="calendar_today" text="Timetable" className="" />
                <ListItem image="filter_none" text="Catalog" className="unselected" />
                <ListItem image="help_outline" text="Help" className="unselected" />
            </ul>
        </div>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
    handler: (newState) => dispatch(doSubmenuChange(newState))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SubMenu);
