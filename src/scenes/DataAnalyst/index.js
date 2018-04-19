import React, {Component} from 'react';
import firebase from '../../firebase.js';
import PieChart from "react-svg-piechart"

export default class DataAnalysis extends Component {
    constructor(props){
        super(props);
        this.state ={
            stroopCorrectData: 0,
            noStroopCorrectData: 0,
            avgStroopTime: 0,
            avgNoStroopTime: 0,
        }
    }
    componentWillMount(){
        var dataRef = firebase.database().ref('total');
        var timeRef = firebase.database().ref('time/stroop');
        dataRef.once('value').then( snapshot => {
            const noStroopCorrectData = snapshot.child('no-stroop').child('correct').child('count').val();
            const stroopCorrectData= snapshot.child('stroop').child('correct').child('count').val();
            this.setState({noStroopCorrectData: noStroopCorrectData,stroopCorrectData: stroopCorrectData})
        });
        let avg = 0;
        let amt = 0;
        timeRef.once('value').then( snapshot => {
            snapshot.forEach( data =>{
                avg += data.val()['counter']
                amt++;
            })
            this.setState({avgStroopTime: parseInt(avg/amt)})
        });
        var timeRef = firebase.database().ref('time/no-stroop');
        avg = 0;
        amt = 0;
        timeRef.once('value').then( snapshot => {
            snapshot.forEach( data =>{
                avg += data.val()['counter']
                amt++;
            })
            this.setState({avgNoStroopTime: parseInt(avg/amt)})
        });
    }
    render() {
        const { stroopCorrectData, noStroopCorrectData, avgStroopTime, avgNoStroopTime } = this.state;
        const data = [
            {title: "With The Stroop Effect Correct Data", value: stroopCorrectData, color: "#22594e"},
            {title: "Without The Stroop Effect Correct Data", value: noStroopCorrectData, color: "#2f7d6d"},
        ]
        
        const timeData = [
            {title: "Time Taken With The Stroop Effect", value: avgStroopTime, color: "#22594e"},
            {title: "Time Taken Without The Stroop Effect", value: avgNoStroopTime, color: "#2f7d6d"},
        ]

        return (
            <div>
                <h1>The Results Of The Test</h1>
            <PieChart
                data={data}
                expandOnHover
            />
                <h1>The Time Average Of The Test</h1>
             <PieChart
                data={timeData}
                expandOnHover
            />
        </div>
        );
    }
}
