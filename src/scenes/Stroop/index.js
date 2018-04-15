import React,{Fragment} from 'react';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';


const Index = ({disabled, color,stroop,questionNumber,onClick,colorsQuestions}) => (
    <Card 
        key={questionNumber}>
        <CardHeader
            titleStyle={{'fontSize':'20px', 'fontWeight':'bold'}}
            title={
                stroop ? <span style={{display: 'inline-block'}}>Select the <p style={{'display': 'inline-block', 'color': colorsQuestions[questionNumber]}}>{color}</p> Button ?</span>
                : <span style={{display: 'inline-block'}}>Select the <p style={{'display': 'inline-block', 'color': color}}>{color}</p> Button ?</span>
            }
            subtitle= {"Question "+questionNumber}
        />
        <CardActions>
            {
                colorsQuestions.map( (question,i) =>(
                    <Fragment key={i}>
                        <RaisedButton disabled={disabled} label={question} onClick={ () =>onClick(color,question,questionNumber)} backgroundColor={question}/> 
                    </Fragment>
                ))
            }
        </CardActions>
    </Card>
);
export default Index;

