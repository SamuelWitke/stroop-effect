import React, {Component} from 'react';
import firebase from '../../firebase.js';
import PieChart from "react-svg-piechart"



export default class DataAnalysis extends Component {
    constructor(props){
        super(props);
        this.state ={
            stroopCorrectData: 0,
            noStroopCorrectData: 0,
        }
    }
    componentWillMount(){
        var dataRef = firebase.database().ref('total');
        dataRef.once('value').then( snapshot => {
            const noStroopCorrectData = snapshot.child('no-stroop').child('correct').child('count').val();
            const stroopCorrectData= snapshot.child('stroop').child('correct').child('count').val();
            this.setState({noStroopCorrectData: noStroopCorrectData,stroopCorrectData: stroopCorrectData})
        });
    }
    render() {
        const { stroopCorrectData, noStroopCorrectData } = this.state;
        const data = [
            {title: "With The Stroop Effect Correct Data", value: stroopCorrectData, color: "#22594e"},
            {title: "Without The Stroop Effect Correct Data", value: noStroopCorrectData, color: "#2f7d6d"},
        ]

        return (
            <div>
                <h1>The Results Of The Test</h1>
            <PieChart
                data={data}
                expandOnHover
                onSectorHover={(d, i, e) => {
                    if (d) {
                        console.log("Mouse enter - Index:", i, "Data:", d, "Event:", e)
                    } else {
                        console.log("Mouse leave - Index:", i, "Event:", e)
                    }
                }}
            />
        </div>
        );
    }
}
