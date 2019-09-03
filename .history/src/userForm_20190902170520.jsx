import React, { Component } from "react";
import FormAnimalDetailsOne from "./formAnimalDetailsOne.jsx";
// import FormAnimalDetailsTwo from "./FormPersonalDetails";
// import FormAnimalDetailsEvent from "./FormUserDetails";
// import FormAnimalPicture from "./FormUserDetails";
// import Success from "./Success";

export class UserForm extends Component {
  state = {
    step
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
    console.log("test hello");
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
    console.log("test hola");
    switch (step) {
      case 1:
        return (
          <FormAnimalDetailsOne
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      //   case 2:
      //     return (
      //       <FormAnimalDetailsTwo
      //         nextStep={this.nextStep}
      //         prevStep={this.prevStep}
      //         handleChange={this.handleChange}
      //         values={values}
      //       />
      //     );
      //   case 3:
      //     return (
      //       <FormAnimalDetailsEvent
      //         nextStep={this.nextStep}
      //         prevStep={this.prevStep}
      //         values={values}
      //       />
      //     );
      //   case 4:
      //     return (
      //       <FormAnimalPicture
      //         nextStep={this.nextStep}
      //         prevStep={this.prevStep}
      //         values={values}
      //       />
      //     );
      //   case 5:
      //     return <Success />;
    }
  }
}

export default UserForm;
