import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import "./formAnimalPicture.css";
export class FormAnimalPicture extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    const { values, handleChange, handleSubmit } = this.props;

    console.log("test world");
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <div className="container">
            <div className="row">
              <div class="col-md-6">
                <form method="post" action="#" id="#">
                  <div class="form-group files color">
                    <label className="form-label">
                      Upload pictures of your pet
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      multiple=""
                      onChange={handleChange("animalImage")}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <RaisedButton
            label="Submit"
            primary={true}
            style={styles.button}
            onClick={handleSubmit}
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

export default FormAnimalPicture;
