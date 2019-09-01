import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Component } from "react";
import "./map.css";
import ReactMapGL, {
  NavigationControl,
  GeolocateControl,
  Marker,
  Popup
} from "react-map-gl";
class unconnectedMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayMarker: false,
      showPopup: false,
      popup: {
        latitude: {},
        longitude: {}
      },
      markers: {
        latitude: {},
        longitude: {}
      },
      formInput: {
        animalType: "",
        animalName: "",
        animalRace: "",
        animalAge: "",
        animalGender: "",
        animalImage: [],
        animalDescription: "",
        animalEvent: ""
      },
      viewport: {
        width: "100vw",
        height: "96vh",
        latitude: 45.451625,
        longitude: -73.575608,
        zoom: 12
      }
    };
  }
  onSelected = (viewport, item) => {
    this.setState({ viewport, selected: item.geometry.coordinates });
    // console.log("Selected: ", item);
  };
  clickHandler = (event, viewport) => {
    console.log("event: ", event, viewport);

    let lnglat = event.lngLat;
    console.log("lnglat", lnglat);
    let lng = lnglat[0];
    console.log("lng", lng);
    let lat = lnglat[1];
    console.log("lat", lat);
    // console.log("lnglatTest", lnglat);
    let newViewport = {
      height: this.state.viewport.height,
      width: this.state.viewport.width,
      zoom: 15,
      latitude: lnglat[1],
      longitude: lnglat[0]
    };
    let newPopup = {
      latitude: lat,
      longitude: lng
    };
    let newMarker = {
      latitude: lat,
      longitude: lng
    };
    console.log("state", this.state);
    this.setState({
      viewport: newViewport,
      popup: newPopup,
      markers: newMarker,
      displayMarker: true,
      showPopup: true
    });
    console.log("state", this.state);
  };
  displayLostForm = () => {
    this.setState({
      ...this.state,
      displayLostForm: !this.state.displayLostForm
    });
    // console.log("this.state.displayLostForm", this.state.displayLostForm);
  };
  logoutHandler = async () => {
    console.log("clicked logout");
    let response = await (await fetch("/logout", { method: "POST" })).text();
    let body = JSON.parse(response);
    if (body.success) {
      this.props.dispatch({
        type: "logout"
      });
      console.log("loggedIn", this.state.loggedIn);
    }
    return;
  };
  geocoderHandler = async event => {
    event.preventDefault();
    // console.log("input", event.target.value);
    let str = event.target.value;
    let encodedUrl = str.replace(" ", "+");
    let response = await (await fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        encodedUrl +
        "&key=AIzaSyCCdevCVVY-LTMoB9Hsm4pWaxHsWC_ojMg",
      { method: "POST" }
    )).text();
    let body = JSON.parse(response);
    if (body.length != 0) {
      console.log("body", body);
      this.state.address = body;
      let newViewport = {
        height: this.state.viewport.height,
        width: this.state.viewport.width,
        zoom: 15,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      };
      this.setState({ viewport: newViewport });
      console.log(this.state.address);
      console.log(
        "test ",
        body.results[0].geometry,
        body.results[0].geometry.location.lat
      );
    }
  };
  uploadPicture = e => {
    let newFormInput = {
      animalType: this.state.formInput.animalType,
      animalName: this.state.formInput.animalName,
      animalAge: this.state.formInput.animalAge,
      animalGender: this.state.formInput.animalGender,
      animalEvent: this.state.formInput.animalEvent,
      AnimalDescription: this.state.formInput.animalDescription,
      AnimalImage: [e]
    };
    this.setState({ formInput: newFormInput });
  };
  animalTypeHandler = event => {
    let newFormInput = {
      animalType: event.target.value,
      animalName: this.state.formInput.animalName,
      animalAge: this.state.formInput.animalAge,
      animalGender: this.state.formInput.animalGender,
      animalEvent: this.state.formInput.animalEvent,
      AnimalDescription: this.state.formInput.animalDescription,
      AnimalImage: this.state.formInput.animalImage
    };
    this.setState({ formInput: newFormInput });
  };
  animalNameHandler = event => {
    let newFormInput = {
      animalType: this.state.formInput.animalType,
      animalName: event.target.value,
      animalAge: this.state.formInput.animalAge,
      animalGender: this.state.formInput.animalGender,
      animalEvent: this.state.formInput.animalEvent,
      AnimalDescription: this.state.formInput.animalDescription,
      AnimalImage: this.state.formInput.animalImage
    };
    this.setState({ formInput: newFormInput });
  };
  animalRaceHandler = event => {
    let newFormInput = {
      animalType: this.state.formInput.animalType,
      animalName: this.state.formInput.animalName,
      animalRace: event.target.value,
      animalAge: this.state.formInput.animalAge,
      animalGender: this.state.formInput.animalGender,
      animalEvent: this.state.formInput.animalEvent,
      AnimalDescription: this.state.formInput.animalDescription,
      AnimalImage: this.state.formInput.animalImage
    };
    this.setState({ formInput: newFormInput });
  };
  animalAgeHandler = event => {
    let newFormInput = {
      animalType: this.state.formInput.animalType,
      animalName: this.state.formInput.animalName,
      animalAge: event.target.value,
      animalGender: this.state.formInput.animalGender,
      animalEvent: this.state.formInput.animalEvent,
      AnimalDescription: this.state.formInput.animalDescription,
      AnimalImage: this.state.formInput.animalImage
    };
    this.setState({ formInput: newFormInput });
  };
  animalGenderHandler = event => {
    let newFormInput = {
      animalType: this.state.formInput.animalType,
      animalName: this.state.formInput.animalName,
      animalAge: this.state.formInput.animalAge,
      animalGender: event.target.value,
      animalEvent: this.state.formInput.animalEvent,
      AnimalDescription: this.state.formInput.animalDescription,
      AnimalImage: this.state.formInput.animalImage
    };
    this.setState({ formInput: newFormInput });
  };
  animalEventHandler = event => {
    let newFormInput = {
      animalType: this.state.formInput.animalType,
      animalName: this.state.formInput.animalName,
      animalAge: this.state.formInput.animalAge,
      animalGender: this.state.formInput.animalGender,
      animalEvent: event.target.value,
      AnimalDescription: this.state.formInput.animalDescription,
      AnimalImage: this.state.formInput.animalImage
    };
    this.setState({ formInput: newFormInput });
  };
  animalDescriptionHandler = event => {
    let newFormInput = {
      animalType: this.state.formInput.animalType,
      animalName: this.state.formInput.animalName,
      animalAge: this.state.formInput.animalAge,
      animalGender: this.state.formInput.animalGender,
      animalEvent: this.state.formInput.animalEvent,
      AnimalDescription: event.target.value,
      AnimalImage: this.state.formInput.animalImage
    };
    this.setState({ formInput: newFormInput });
  };
  handleItemName = event => {
    this.setState({ inputItemName: event.target.value });
  };
  handleSubmit = () => {
    let formData = new FormData();
    formData.append("type", this.state.formInput.animalType);
    formData.append("name", this.state.formInput.animalName);
    formData.append("race", this.state.formInput.animalRace);
    formData.append("age", this.state.formInput.animalAge);
    formData.append("gender", this.state.formInput.animalGender);
    formData.append("event", this.state.formInput.animalEvent);
    formData.append("description", this.state.formInput.animalDescription);
    formData.append("animalImage", this.state.formInput.AnimalImage);
    fetch("/new-pet", {
      method: "POST",
      body: formData
    })
      .then(response => response.text())
      .then(response => {
        let petId = JSON.parse(response);
        this.setState({ petId: petId });
        this.props.getItemId(petId);
        // receives the itemID from the backend
      });
  };
  render() {
    console.log(this.state);
    const { viewport } = this.state;
    const { showPopup } = this.state;
    // if (this.props.loggedIn) {
    return (
      <div className="MainDiv">
        <div className="GeocoderDiv">
          Search Bar
          <input
            type="text"
            className="GeocoderText"
            value={this.state.addressInfo}
            placeholder="Enter your address here"
            onChange={this.geocoderHandler}
          ></input>
        </div>
        <div className="NavBar">
          <Link to="/signup" className="signupLink">
            Signup
          </Link>
          <button onClick={this.logoutHandler}>Logout</button>
          <button className="Home">Home</button>
        </div>
        <ReactMapGL
          {...viewport}
          mapStyle="mapbox://styles/vincentlinx/cjzsriwql096b1climsp972oc"
          mapboxApiAccessToken="pk.eyJ1IjoidmluY2VudGxpbngiLCJhIjoiY2p6c2x6Mm5hMHg5bzNkbjR2d2dvYnhpeiJ9.agg51yZYDvNIHBwXSPcBrQ"
          onViewportChange={viewport => this.setState({ viewport })}
          onClick={this.clickHandler}
        >
          <div className="navigationControl">
            <NavigationControl />
          </div>
          {/* This will be the place for the geolocation button */}
          {this.state.displayMarker ? (
            // {this.state.markers.map(markers =>(
            <Marker
              latitude={this.state.markers.latitude}
              longitude={this.state.markers.longitude}
            >
              <img src="/pawIcon.png" width="30px" />
            </Marker>
          ) : // )}
          null}

          {/* Area for the popup class interaction when clicked on the map  */}
          {this.state.showPopup ? (
            <Popup
              latitude={this.state.popup.latitude}
              longitude={this.state.popup.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() =>
                this.setState({ showPopup: false, popuplat: [], popuplng: [] })
              }
              anchor="top"
            >
              {/*This is the render of form popup created when clicked on the map */}
              <div className="popupFormDiv">
                <form className="popupFormArea" onSubmit={this.handleSubmit}>
                  {/* For animal type, if dog or cat, the form will adjust depending on this choice */}
                  <div className="FormAnimalType">
                    <h3>Did you lost a dog or a cat ?</h3>
                    <input
                      type="radio"
                      name="categorie-cat"
                      value="cat"
                      onChange={this.animalTypeHandler}
                    />
                    <label htmlFor="cat">Cat</label>
                    <input
                      type="radio"
                      name="categorie-dog"
                      value="dog"
                      onChange={this.animalTypeHandler}
                    />
                    <label htmlFor="dog">Dog</label>
                  </div>
                  {/* For the animal name */}
                  <div className="FormAnimalName">
                    <h3> Enter the name of your pet</h3>
                    <input
                      type="text"
                      className="animalNameInput"
                      onChange={this.animalNameHandler}
                      placeholder="Name of the animal"
                    ></input>
                  </div>
                  {/* For the race of the animal */}
                  <div className="FormAnimalRace">
                    <h3>Enter the race of your pet</h3>
                    <input
                      type="text"
                      className="animalNameInput"
                      onChange={this.animalRaceHandler}
                      placeholder="Race of the animal"
                    ></input>
                  </div>
                  {/* For the age of the pet */}
                  <div className="FormAnimalAge">
                    <h3> Enter the age of your pet</h3>
                    <input
                      type="text"
                      className="animalAgeInput"
                      onChange={this.animalAgeHandler}
                      placeholder="Age of the animal"
                    ></input>
                  </div>
                  {/* For the gender of the pet */}
                  <div className="FormAnimalGender">
                    <h3>Enter the gender of your pet </h3>
                    <input
                      type="radio"
                      name="gender-female"
                      value="female"
                      onChange={this.animalGenderHandler}
                    />
                    <label htmlFor="female">female</label>
                    <input
                      type="radio"
                      name="gender-male"
                      value="male"
                      onChange={this.animalGenderHandler}
                    />
                    <label htmlFor="male">male</label>
                  </div>
                  <div className="FormAnimalEvent">
                    <h3> Write a description of how you lost your pet</h3>
                    <input
                      type="text"
                      className="animalEvent"
                      onChange={this.animalEventHandler}
                      placeholder="Describe the event"
                    ></input>
                  </div>
                  <div className="FormAnimalDescription">
                    <h3> Write a description of your pet</h3>
                    <input
                      type="text"
                      className="animalEvent"
                      onChange={this.animalDescriptionHandler}
                      placeholder="Describe your pet"
                    ></input>
                  </div>
                  {/* For the uploaded pictures of the animals */}
                  <div className="animalPictures">
                    Upload an image:
                    <input
                      type="file"
                      id="input"
                      onChange={e => this.uploadPicture(e.target.file[]())}
                    />
                  </div>
                  <input type="submit" className="submitFormButton" />
                </form>
              </div>
            </Popup>
          ) : null}
        </ReactMapGL>
      </div>
    );
    // } else {
    //   return <Redirect to="/signup" />;
    // }
  }
}

let mapStatetoProps = state => {
  return { loggedIn: state.loggedIn };
};
let Map = connect(mapStatetoProps)(unconnectedMap);
export default Map;
