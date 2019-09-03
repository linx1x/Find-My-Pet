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

export class FormAnimalDetailsOne extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;

    console.log("test world");
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Enter Animal Details" />
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={value}
              onChange={handleChange("animalType")}
            >
              <FormControlLabel value="cat" control={<Radio />} label="cat" />
              <FormControlLabel value="dog" control={<Radio />} label="dog" />
            </RadioGroup>
          </FormControl>
          <br />
          <TextField
            hintText="Animal Name"
            floatingLabelText="Name"
            onChange={handleChange("animalName")}
            defaultValue={values.animalName}
          />
          <br />
          <TextField
            hintText="Animal Race"
            floatingLabelText="Race"
            onChange={handleChange("animalRace")}
            defaultValue={values.animalRace}
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

export default FormAnimalDetailsOne;
