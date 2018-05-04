import React, {Component} from 'react';
import firebase from '../../firebase.js';
import PieChart from "react-svg-piechart"
import {Bar} from"react-chartjs";



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
        const chartData1 = {
            labels: ["Correct Answers"],
            datasets: [
                {
                    label: "With Stroop Effect",
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: [stroopCorrectData]
                    },
                {
                    label: "Without Stroop Effect",
                    fillColor: "rgba(22,220,220,0.5)",
                    strokeColor: "rgba(22,220,220,0.8)",
                    highlightFill: "rgba(22,220,220,0.75)",
                    highlightStroke: "rgba(22,220,220,1)",
                    data: [noStroopCorrectData]
                    }
                ]
        };
        const chartData2 ={
            labels: ["Average Time"],
            datasets: [
                {
                label: "With Stroop Effect",
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,0.8)",
                highlightFill: "rgba(151,187,205,0.75)",
                highlightStroke: "rgba(151,187,205,1)",
                data: [avgStroopTime]
                }, 
                {
                label: "Without Stroop Effect",
                fillColor: "rgba(15,187,205,0.5)",
                strokeColor: "rgba(15,187,205,0.8)",
                highlightFill: "rgba(15,187,205,0.75)",
                highlightStroke: "rgba(15,187,205,1)",
                data: [avgNoStroopTime]
                }
            ]
            }
        const chartOptions =  {
            scaleBeginAtZero : true,
            scaleShowGridLines : true,
            scaleGridLineColor : "rgba(0,0,0,.05)",
            scaleGridLineWidth : 1,
            scaleShowHorizontalLines: true,
            scaleShowVerticalLines: true,
            barShowStroke : true,
            barStrokeWidth : 2,
            barValueSpacing : 5,
            barDatasetSpacing : 1,
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>"
        } 
        return (
            <div>
                <h1>The Results Of The Test</h1>
                <Bar data={chartData1} options={chartOptions} width={600} height={500}/>
                <Bar data={chartData2} options={chartOptions} width={600} height={500}/>
            </div>
        );
    }
}
/*<PieChart
                data={data}
                expandOnHover
            />
            <h1>The Time Average Of The Test</h1>
            <PieChart
                data={timeData}
                expandOnHover
            />
  const data = [
            {title: "With The Stroop Effect Correct Data "+stroopCorrectData, value: stroopCorrectData, color: "#22594e"},
            {title: "Without The Stroop Effect Correct Data "+noStroopCorrectData, value: noStroopCorrectData, color: "#2f7d6d"},
        ]

        const timeData = [
            {title: "Time Taken With The Stroop Effect "+avgStroopTime, value: avgStroopTime, color: "#22594e"},
            {title: "Time Taken Without The Stroop Effect "+avgNoStroopTime, value: avgNoStroopTime, color: "#2f7d6d"},
        ]

*/
