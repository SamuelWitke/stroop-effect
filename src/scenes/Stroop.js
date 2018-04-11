import React,{Fragment} from 'react';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {colors,shuffle} from '../colors.js'

let colorsQuestions = colors.slice();
colorsQuestions = shuffle(colorsQuestions)

const Stroop = ({color,i,onClick}) => (
    <div key={i}>
        <Card 
            key={i}>
            <CardHeader
                titleStyle={{'fontSize':'20px', 'fontWeight':'bold'}}
                title={<span style={{display: 'inline-block'}}>Select the <p style={{'display': 'inline-block', 'color': colorsQuestions[colorsQuestions.length -1-i]}}>{color}</p> Button ?</span>}
                subtitle= {"Question "+i}
            />
            <CardActions>
                {
                    colorsQuestions.map( (question,i) =>(
                        <Fragment key={i}>
                            <RaisedButton label={question} onClick={ () =>onClick(color,question)} backgroundColor={question}/> 
                        </Fragment>
                    ))
                }
            </CardActions>
        </Card>
    </div>
);
export default Stroop;
