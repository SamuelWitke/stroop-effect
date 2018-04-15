import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {connect} from 'react-redux';
import Notifications, { success, error} from 'react-notification-system-redux';
import Questions from './scenes/Question.js'

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        backgroundColor: "black",
        wnameth: 200,
    },
    menu: {
        wnameth: 200,
    },
});


class App extends Component {
   render() {
        const { notifications} = this.props;
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <Questions />
                <Notifications notifications={notifications} />
            </MuiThemeProvider>
        );
    }
}

export default connect(
    state => ({ notifications: state.notifications }),
)(App);
