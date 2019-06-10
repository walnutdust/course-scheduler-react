import React, {Component} from 'react';
import './App.css';
import Catalog from './Catalog';
import Navbar from './Navbar';
import Footer from './Footer';
import SubMenu from './SubMenu';
import Search from './Search';
import Timetable from './Timetable';
import Checkbox from './Checkbox';
import AdditionalOptions from './AdditionalOptions';
import {getCurrSubMenu} from '../selectors/utils';
import {connect} from 'react-redux';

class App extends Component {
    constructor(props) {
        super(props);

        this.getActive = this.getActive.bind(this);
    }

    getActive() {
        if (this.props.active === 'Catalog') {
            return (
                <div class="row">
                    <div class="column">
                        <Search />
                        <Catalog />
                    </div>
                    <div class="additional-options">
                        <AdditionalOptions />
                    </div>
                </div>
            );
        }

        if (this.props.active === 'Timetable') {
            return (
                <div class="row">
                    <Timetable />
                </div>
            );
        }
    }

    render() {
        return (
            <div class="app">
                <Navbar />
                <div class="row">
                    <div class="sub-menu-column">
                        <SubMenu />
                    </div>
                    <div class="main-container">{this.getActive()}</div>
                </div>

                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    active: getCurrSubMenu(state)
});

export default connect(mapStateToProps)(App);
