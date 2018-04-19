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
        this.state = {
            name: null, 
            timer: false,
            submit: false, 
            done: false,
            intervalId: undefined,
            stroop: "no-stroop"};
        this.onButtonClick = this.onButtonClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.callIncrement = this.callIncrement.bind(this);
    }
    componentWillMount(){
        const {dispatch} = this.props;
        colors.forEach( (color,i) =>{
            dispatch(addQuestion(color,shuffle(colors.slice())))
        })
    } 

    componentDidUpdate(oldProps,oldState){
        const {dispatch} = this.props;
        if(oldState.submit !== this.state.submit){
        }
    }

    componentWillUnmount(){
        clearInterval(this.state.intervalId);
    }

    onButtonClick(color,choice,i){
        const {dispatch, counter} = this.props;
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
            /*
            var databaseRef = firebase.database().ref(`total/${this.state.stroop}/correct/count`);
            databaseRef.transaction( (data)=> {
                console.log(data) 
                if (data) {
                    data = data+ 1;
                }
                return (data || 0) + 1;
            });
            */
        }else{
            dispatch(error({
                title: 'Wrong !',
                message: 'You answered wrong go to the next!',
                position: 'tr',
                autoDismiss: 1,
            }))
            /*
           var databaseRef = firebase.database().ref(`total/${this.state.stroop}/incorrect/count`);
            databaseRef.transaction( (data)=> {
                console.log(data) 
                if (data) {
                    data = data+ 1;
                }
                return (data || 0) + 1;
            });
            */

        }
        //this.firebaseRef = firebase.database().ref(`data/${this.state.name}/${this.state.stroop}`).push(data)
        dispatch(toggleQuestion(i))
        if(i == colors.length -1 && this.state.stroop === "stroop"){
            this.firebaseRef = firebase.database().ref(`time/${this.state.stroop}`)
            .push({
                counter: counter,
                name: this.state.name,
            })
            this.setState({ done: true })
            clearInterval(this.state.intervalId);
        }else if(i == colors.length -1 && this.state.stroop === "no-stroop"){
            this.firebaseRef = firebase.database().ref(`time/${this.state.stroop}`).push({
                counter: counter,
                name: this.state.name,
            })
            colors.forEach( (color,i) =>{
                dispatch(toggleQuestion(i))
            })
            this.props.dispatch({type: 'CLEAR'})
            clearInterval(this.state.intervalId);
            const intervalId = setInterval(this.callIncrement, 1000);
            this.setState({intervalId: intervalId, stroop: "stroop"});
        }
    }

    callIncrement() {
        this.props.dispatch({type: 'INCREMENT'})
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }


    handleSubmit(event) {
        event.preventDefault();
        const intervalId = setInterval(this.callIncrement,1000);
        this.setState({submit: true, intervalId: intervalId});
    }

    handleTimer(){
        this.setState({timer: true})
    }

    render(){
        const { done, submit, timer, stroop } = this.state;
        const { counter } = this.props;
        let render = (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Stroop Effect </h1>
                    <p className="App-intro">
                        Answer All The Questions In The Fastest Time
                    </p>  
                </header>
                <DataAnalysis />
            </div>
        );
        if( !done ){
            render = (
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Stroop Effect </h1>
                        <p className="App-intro">
                            Answer All The Questions In The Fastest Time
                        </p>  
                        { counter > 0 &&
                        <h1> Seconds Elapsed: {counter} </h1>
                        }
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
            )
        }
        return  render;
    }
}
const mapStateToProps = (state) => { 
    return { counter: state.counter};
};

export default connect(mapStateToProps, undefined)(Questions);
