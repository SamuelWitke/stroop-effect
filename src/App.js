import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Index from './scenes/HomePage/index.js'
import {colors} from './colors.js'
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Stroop from './scenes/Stroop.js'




class App extends Component {

    constructor(props){
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this)
    }
    onButtonClick(color,choice){
        console.log(color,choice)
        alert(color === choice)
    }
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">
                        To get started, edit <code>src/App.js</code> and save to reload.
                    </p>
                    <Paper className="container">
                        <List>
                            {
                                colors.map( (color,i) => (
                                    <ListItem>
                                        <div key={i}>
                                            <Index 
                                                color={color} 
                                                i={i}
                                                onClick={this.onButtonClick}
                                            />
                                        </div>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Paper>
                    <span> Other Test </span>
                <Paper className="container">
                        <List>
                            {
                                colors.map( (color,i) => (
                                    <ListItem>
                                        <div key={i}>
                                            <Stroop 
                                                color={color} 
                                                i={i}
                                                onClick={this.onButtonClick}
                                            />
                                        </div>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Paper>

                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
