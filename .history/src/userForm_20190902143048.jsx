import React, { Component } from "react";
import FormAnimalDetailsOne from "./FormUserDetails";
import FormAnimalDetailsTwo from "./FormPersonalDetails";
import FormAnimalDetailsOne from "./FormUserDetails";
import FormAnimalDetailsOne from "./FormUserDetails";
import FormAnimalDetailsOne from "./FormUserDetails";
import Confirm from "./Confirm";
import Success from "./Success";

export class UserForm extends Component {
  state = {
    animalType: "",
    animalName: "",
    animalRace: "",
    animalAge: "",
    animalGender: "",
    animalImage: [],
    animalDescription: "",
    animalEvent: ""
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
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
            values={values}
          />
        );
      case 4:
        return (
          <FormAnimalPicture
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 5:
        return <Success />;
    }
  }
}

export default UserForm;