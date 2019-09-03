import React, { Component } from "react";
import { connect } from "react-redux";
import FormAnimalDetailsOne from "./formAnimalDetailsOne.jsx";
import FormAnimalDetailsTwo from "./formAnimalDetailsTwo.jsx";
import FormAnimalDetailsEvent from "./formAnimalDetailsEvent.jsx";
import FormAnimalPicture from "./formAnimalPicture.jsx";
// import Success from "./Success";

export class UnconnectedUserForm extends Component {
  state = {
    step: 1,

    animalType: "",
    animalName: "",
    animalRace: "",
    animalAge: "",
    animalGender: "",
    animalDescription: "",
    animalEvent: "",
    animalImage: []
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.props.dispatch({
      type: "animalDetails",
      payload: {
        animalType: this.state.animalType,
        animalName: this.state.animalName,
        animalRace: this.state.animalRace,
        animalAge: this.state.animalAge,
        animalGender: this.state.animalGender,
        animalDescription: this.state.animalDescription,
        animalEvent: this.state.animalEvent,
        animalImage: this.state.animalImage
      }
    });
    this.setState({
      step: step + 1
    });
    console.log(this.state);
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };
  render() {
    const { step } = this.state;
    const {
      animalType,
      animalName,
      animalRace,
      animalAge,
      animalGender,
      animalImage,
      animalDescription,
      animalEvent
    } = this.state;
    const values = {
      animalType,
      animalName,
      animalRace,
      animalAge,
      animalGender,
      animalImage,
      animalDescription,
      animalEvent
    };
    switch (step) {
      case 1:
        return (
          <FormAnimalDetailsOne
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );

      case 2:
        console.log("state after first form", this.state);
        return (
          <FormAnimalDetailsTwo
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <FormAnimalDetailsEvent
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 4:
        return (
          <FormAnimalPicture
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            handleSubmit={this.props.handleSubmit}
          />
        );
      //   case 5:
      //     return <Success />;
    }
  }
}
let UserForm = connect()(UnconnectedUserForm);
export default UserForm;
