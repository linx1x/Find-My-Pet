import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing(3)
  },
  group: {
    margin: theme.spacing(1, 0)
  }
}));

export class FormAnimalDetailsOne extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };
  // No need since it is the first page
  //   back = e => {
  //     e.preventDefault();
  //     this.props.prevStep();
  //   };

  render() {
    const { values, handleChange } = this.props;
    const classes = useStyles();
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Enter Animal Details" />
          <RadioGroup
            aria-label="gender"
            name="gender1"
            className={classes.group}
            value={value}
            onChange={handleChange("animalType")}
          >
            <FormControlLabel value="cat" control={<Radio />} label="cat" />
            <FormControlLabel value="dog" control={<Radio />} label="dog" />
          </RadioGroup>
          <br />
          <TextField
            hintText="Animal Name"
            floatingLabelText="Name"
            onChange={handleChange("animalName")}
            defaultValue={values.city}
          />
          <br />
          <TextField
            hintText="Animal Race"
            floatingLabelText="Race"
            onChange={handleChange("animalRace")}
            defaultValue={values.bio}
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
