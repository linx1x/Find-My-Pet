// uploadPicture = e => {
  //   let newFormInput = {
  //     animalType: this.state.formInput.animalType,
  //     animalName: this.state.formInput.animalName,
  //     animalAge: this.state.formInput.animalAge,
  //     animalGender: this.state.formInput.animalGender,
  //     animalEvent: this.state.formInput.animalEvent,
  //     AnimalDescription: this.state.formInput.animalDescription,
  //     AnimalImage: [e]
  //   };
  //   this.setState({ formInput: newFormInput });
  // };
  // animalTypeHandler = event => {
  //   let newFormInput = {
  //     animalType: event.target.value,
  //     animalName: this.state.formInput.animalName,
  //     animalAge: this.state.formInput.animalAge,
  //     animalGender: this.state.formInput.animalGender,
  //     animalEvent: this.state.formInput.animalEvent,
  //     AnimalDescription: this.state.formInput.animalDescription,
  //     AnimalImage: this.state.formInput.animalImage
  //   };
  //   this.setState({ formInput: newFormInput });
  // };
  // animalNameHandler = event => {
  //   let newFormInput = {
  //     animalType: this.state.formInput.animalType,
  //     animalName: event.target.value,
  //     animalAge: this.state.formInput.animalAge,
  //     animalGender: this.state.formInput.animalGender,
  //     animalEvent: this.state.formInput.animalEvent,
  //     AnimalDescription: this.state.formInput.animalDescription,
  //     AnimalImage: this.state.formInput.animalImage
  //   };
  //   this.setState({ formInput: newFormInput });
  // };
  // animalRaceHandler = event => {
  //   let newFormInput = {
  //     animalType: this.state.formInput.animalType,
  //     animalName: this.state.formInput.animalName,
  //     animalRace: event.target.value,
  //     animalAge: this.state.formInput.animalAge,
  //     animalGender: this.state.formInput.animalGender,
  //     animalEvent: this.state.formInput.animalEvent,
  //     AnimalDescription: this.state.formInput.animalDescription,
  //     AnimalImage: this.state.formInput.animalImage
  //   };
  //   this.setState({ formInput: newFormInput });
  // };
  // animalAgeHandler = event => {
  //   let newFormInput = {
  //     animalType: this.state.formInput.animalType,
  //     animalName: this.state.formInput.animalName,
  //     animalAge: event.target.value,
  //     animalGender: this.state.formInput.animalGender,
  //     animalEvent: this.state.formInput.animalEvent,
  //     AnimalDescription: this.state.formInput.animalDescription,
  //     AnimalImage: this.state.formInput.animalImage
  //   };
  //   this.setState({ formInput: newFormInput });
  // };
  animalFormChangeHandler = input => event => {
    console.log("forminput", this.state);
    this.setState({ [input]: event.target.value });
  };
  // let newFormInput = {
  //   animalType: this.state.formInput.animalType,
  //   animalName: this.state.formInput.animalName,
  //   animalAge: this.state.formInput.animalAge,
  //   animalGender: event.target.value,
  //   animalEvent: this.state.formInput.animalEvent,
  //   AnimalDescription: this.state.formInput.animalDescription,
  //   AnimalImage: this.state.formInput.animalImage
  // };

  // animalEventHandler = event => {
  //   let newFormInput = {
  //     animalType: this.state.formInput.animalType,
  //     animalName: this.state.formInput.animalName,
  //     animalAge: this.state.formInput.animalAge,
  //     animalGender: this.state.formInput.animalGender,
  //     animalEvent: event.target.value,
  //     AnimalDescription: this.state.formInput.animalDescription,
  //     AnimalImage: this.state.formInput.animalImage
  //   };
  //   this.setState({ formInput: newFormInput });
  // };
  // animalDescriptionHandler = event => {
  //   let newFormInput = {
  //     animalType: this.state.formInput.animalType,
  //     animalName: this.state.formInput.animalName,
  //     animalAge: this.state.formInput.animalAge,
  //     animalGender: this.state.formInput.animalGender,
  //     animalEvent: this.state.formInput.animalEvent,
  //     AnimalDescription: event.target.value,
  //     AnimalImage: this.state.formInput.animalImage
  //   };
  //   this.setState({ formInput: newFormInput });
  // };