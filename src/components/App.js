import React, {Component} from 'react';
import './App.css';
import Catalog from './Catalog';
import Navbar from './Navbar';
import SubMenu from './SubMenu';
import Search from './Search';
import Timetable from './Timetable';
import AdditionalOptions from './AdditionalOptions';
import {getCurrSubMenu, getGAPI, getSignInStatus} from '../selectors/utils';
import {connect} from 'react-redux';
import {updateGAPI, updateSignIn} from '../actions/utils';

class App extends Component {
    constructor(props) {
        super(props);

        this.getActive = this.getActive.bind(this);
    }

    componentDidMount() {
        require('google-client-api')().then((gapi) => {
            console.log('initializing GAPI...');
            const CLIENT_ID =
                '99903103727-mcppob91tlqitcd7g11ud46vg0gr90im.apps.googleusercontent.com';
            const SCOPES = 'https://www.googleapis.com/auth/calendar';
            const DISCOVERY_DOCS = [
                'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
            ];
            const API_KEY = 'AIzaSyAxGwi55Zk2mg-Hs-O3qLBcoEMx__cceD0';

            gapi.client
                .init({
                    clientId: CLIENT_ID,
                    scope: SCOPES,
                    discoveryDocs: DISCOVERY_DOCS,
                    apiKey: API_KEY
                })
                .then(
                    function() {
                        console.log('GAPI Initialized.');

                        // Listen for sign-in state changes.
                        this.props.doUpdateGAPI(gapi);
                        this.props.doUpdateSignIn(gapi.auth2.getAuthInstance().isSignedIn.get());
                    }.bind(this)
                );
        });
    }

    getActive() {
        if (this.props.active === 'Catalog') {
            return (
                <div className="row">
                    <div className="column">
                        <Search />
                        <Catalog />
                    </div>
                    <div className="additional-options">
                        <AdditionalOptions />
                    </div>
                </div>
            );
        }

        if (this.props.active === 'Timetable') {
            return (
                <div className="row">
                    <Timetable />
                </div>
            );
        }
    }

    render() {
        return (
            <div className="app">
                <Navbar />
                <div className="row">
                    <div className="sub-menu-column">
                        <SubMenu />
                    </div>
                    <div className="main-container">{this.getActive()}</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    active: getCurrSubMenu(state),
    gapi: getGAPI(state),
    signedIn: getSignInStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
    doUpdateGAPI: (gapi) => dispatch(updateGAPI(gapi)),
    doUpdateSignIn: (signedIn) => dispatch(updateSignIn(signedIn))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
