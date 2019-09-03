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
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Enter Animal Details" />
          <div>
            <RadioGroup
              aria-label="type"
              name="type"
              //   className={classes.group}
              //   value={value}
              onChange={handleChange("animalType")}
            >
              <FormControlLabel
                value="cat"
                control={<Radio />}
                label="cat"
                onChange={
                  (handleChange("animalType"), console.log("values", values))
                }
              />
              <FormControlLabel
                value="dog"
                control={<Radio />}
                label="dog"
                onChange={
                  (handleChange("animalType"), console.log("values", values))
                }
              />
            </RadioGroup>
          </div>

          <TextField
            hintText="Animal Name"
            floatingLabelText="Name"
            onChange={handleChange("animalName", console.log("values", values))}
            defaultValue={values.animalName}
          />
          <br />
          <TextField
            hintText="Animal Race"
            floatingLabelText="Race"
            onChange={handleChange("animalRace", console.log("values", values))}
            defaultValue={values.animalRace}
          />
          <br />
          <RaisedButton
            label="Continue"
            primary={true}
            style={styles.button}
            onClick={this.continue}
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
