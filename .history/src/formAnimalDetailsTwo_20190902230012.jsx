import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

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

    console.log("test world");
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
            hintText="Animal Age"
            floatingLabelText="Age"
            onChange={handleChange("animalAge")}
            defaultValue={values.animalAge}
          />
          <br />
          <TextField
            hintText="Animal Description"
            floatingLabelText="Age"
            onChange={handleChange("animalAge")}
            defaultValue={values.animalAge}
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
