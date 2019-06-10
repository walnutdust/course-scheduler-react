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

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: 'Timetable'
        };
        this.getActive = this.getActive.bind(this);
        this.editActive = this.editActive.bind(this);
    }

    editActive(newActive) {
        console.log(newActive);
        this.setState({
            active: newActive
        });
    }

    getActive() {
        if (this.state.active === 'Catalog') {
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

        if (this.state.active === 'Timetable') {
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
                        <SubMenu handler={this.editActive} />
                    </div>
                    <div class="main-container">{this.getActive()}</div>
                </div>

                <Footer />
            </div>
        );
    }
}

export default App;
