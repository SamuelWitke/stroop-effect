import React, {Component} from 'react';
import { success, error} from 'react-notification-system-redux';
import firebase from '../firebase.js';
import Form from '../scenes/Form/index.js'
import Countdown from 'react-countdown-now';
import TextField from 'material-ui/TextField';
import QuestionList from '../scenes/QuestionList/index.js'
import FlatButton from 'material-ui/FlatButton';
import {colors, shuffle} from '../colors.js';
import {connect} from 'react-redux';
import {addQuestion, toggleQuestion,} from '../actions/questions.js'
import DataAnalysis from './DataAnalyst/index.js';

class Questions extends Component {
    constructor(props){
        super(props);
        this.state = {name: null, timer: false,submit: false, stroop: "no-stroop"};
        this.onButtonClick = this.onButtonClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.stroopChange = this.stroopChange.bind(this);
        this.renderer = this.renderer.bind(this);
    }
    componentWillMount(){
        const {dispatch} = this.props;
        colors.forEach( (color,i) =>{
            dispatch(addQuestion(color,shuffle(colors.slice())))
        })
    } 

    onButtonClick(color,choice,i){
        const {dispatch} = this.props;
        const correct = color === choice;
        const data ={
            color: color,
            text: choice,
            correct,
            number: i,
        }
        if(correct){
            dispatch(success({
                title: 'Correct!',
                message: 'You answered correctly go to the next!',
                position: 'tr',
                autoDismiss: 1,
            }))
            var databaseRef = firebase.database().ref(`total/${this.state.stroop}/correct/count`);
            databaseRef.transaction( (data)=> {
                console.log(data) 
                if (data) {
                    data = data+ 1;
                }
                return (data || 0) + 1;
            });
        }else{
            dispatch(error({
                title: 'Wrong !',
                message: 'You answered wrong go to the next!',
                position: 'tr',
                autoDismiss: 1,
            }))
            var databaseRef = firebase.database().ref(`total/${this.state.stroop}/incorrect/count`);
            databaseRef.transaction( (data)=> {
                console.log(data) 
                if (data) {
                    data = data+ 1;
                }
                return (data || 0) + 1;
            });

        }
        this.firebaseRef = firebase.database().ref(`data/${this.state.name}/${this.state.stroop}`).push(data)
        dispatch(toggleQuestion(i))
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    stroopChange(event){
        event.preventDefault();
        const {dispatch} = this.props;
        colors.forEach( (color,i) =>{
            dispatch(toggleQuestion(i))
        })
        this.setState({stroop: "stroop"})  
    }


    handleSubmit(event) {
        event.preventDefault();
        this.setState({submit: true});
    }

    handleTimer(){
        this.setState({timer: true})
    }

    renderer({ hours, minutes, seconds, completed }){
        if (completed) {
            this.handleTimer();
            return <DataAnalysis />;
        } else {
            if(this.state.timer ) return <DataAnalysis />;
            return <h2>{hours}:{minutes}:{seconds}</h2>;
        }
    };

    render(){
        const { submit, timer, stroop } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Stroop Effect</h1>
                    <p className="App-intro">Answer All The Questions In The Fastest Time</p>  
                </header>
                    <br/>
                {!submit &&
                <Form 
                    change={this.handleChange}
                    submit={this.handleSubmit}
                />
                }
                { submit &&
                <div>
                    <Countdown
                        date={Date.now() + 16000}
                        renderer={this.renderer}
                        intervalDelay={0}
                        precision={3}
                    />

                {!timer &&
                <div>
                    {stroop === "no-stroop" ?
                    <div>
                        <br/>
                        <QuestionList 
                            stroop={false}
                            onClick={this.onButtonClick}
                            colors ={colors}/>
                        <br/>
                        <FlatButton backgroundColor="rgb(0, 188, 212)" style={{color: "#fffff"}} onClick={this.stroopChange}  primary={true} label="Next" fullWidth={true} />
                    </div>
                            :
                            <QuestionList 
                                stroop={true}
                                onClick={this.onButtonClick}
                            />
                    }
                </div>
                }
            </div>
                }
            </div>
        )}
}
export default connect(null, null)(Questions);
