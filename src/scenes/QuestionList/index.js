import Paper from 'material-ui/Paper';
import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Index from '../Stroop/index.js'
import { connect } from 'react-redux'
import {shuffle} from '../../colors.js'

const QuestionList = ({onClick, questions, stroop})=>{
    return (
        <Paper className="container">
            <List>
                {
                    questions.map( (obj,i) => (
                        <ListItem key={i}>
                            <Index 
                                color={obj.color} 
                                questionNumber={i}
                                onClick={onClick}
                                stroop={stroop}
                                disabled={obj.completed}
                                colorsQuestions={obj.colors.slice()}
                            />
                        </ListItem>
                    ))
                }
            </List>
        </Paper>
    )
}

const mapStateToProps = state => ({
    questions: state.questions
})

export default connect(
    mapStateToProps,
    null,
)(QuestionList);
