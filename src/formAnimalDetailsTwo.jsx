import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export class FormAnimalDetailsTwo extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    const { values, handleChange } = this.props;
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Enter Animal Details" />
          <TextField
            hintText="Animal Age"
            floatingLabelText="Age"
            onChange={handleChange("animalAge")}
            defaultValue={values.animalAge}
          />
          <br />
          <TextField
            hintText="Animal Gender"
            floatingLabelText="Gender"
            onChange={handleChange("animalGender")}
            defaultValue={values.animalGender}
          />
          <br />
          <TextField
            hintText="Animal Description"
            floatingLabelText="Description"
            onChange={handleChange("animalDescription")}
            defaultValue={values.animalDescription}
          />
          <br />
          <RaisedButton
            label="Continue"
            primary={true}
            style={styles.button}
            onClick={this.continue}
          />
          <RaisedButton
            label="Back"
            primary={false}
            style={styles.button}
            onClick={this.back}
          />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15
  }
};

export default FormAnimalDetailsTwo;
