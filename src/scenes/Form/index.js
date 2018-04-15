import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField'
/*
const MyForm=({handleSubmit,change})=>( 
<form onSubmit={handleSubmit}>
    <RaisedButton label="Submit" type="submit" />
</form>
     )
export default MyForm;
*/

export default class Form extends React.Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const {change,submit} = this.props;
        const twoClickJimmy = (event) =>{
            submit(event);
            this.handleClose();
        }
        const actions = [
        <TextField floatingLabelText="Enter Your Name" onChange={change} />,
        <FlatButton
            label="Cancel"
            primary={true}
            onClick={this.handleClose}
        />,
    <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={twoClickJimmy}
    />,
        ];

        return (
            <div>
                <RaisedButton 
                    style={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: '300px', 
                        height: '100px'}}
                    labelStyle={{ fontSize: '50px'}}
                    label="Start" 
                    onClick={this.handleOpen} />
                <Dialog
                    title="Dialog With Actions"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    The actions in this window were passed in as an array of React objects.
                </Dialog>
            </div>
        );
    }
}
