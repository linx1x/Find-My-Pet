import React from "react";
import {
  Link,
  Redirect,
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import { connect } from "react-redux";
import { Component } from "react";
import UserForm from "./userForm.jsx";
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
      displayMarker: true,
      showPopup: false,
      popup: {
        latitude: "",
        longitude: ""
      },
      markers: {
        latitude: "",
        longitude: ""
      },
      viewport: {
        width: "100vw",
        height: "96vh",
        latitude: 45.451625,
        longitude: -73.575608,
        zoom: 12
      }
      // animalType: "",
      // animalName: "",
      // animalRace: "",
      // animalAge: "",
      // animalGender: "",
      // animalImage: [],
      // animalDescription: "",
      // animalEvent: ""
    };
  }
  clickHandler = (event, viewport) => {
    if (this.state.showPopup === true) {
      return;
    } else {
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

      // console.log("state", this.state);
      this.setState({
        viewport: newViewport,
        popup: newPopup,

        showPopup: true
      });
      // console.log("state", this.state);
    }
  };
  componentDidMount = () => {
    let updateMarkers = async () => {
      // get all items from the server
      let response = await fetch("/animals");
      let responseBody = await response.text();
      //   console.log("responseBody", responseBody);
      let parsed = JSON.parse(responseBody);
      // console.log("parsed", parsed);
      this.props.dispatch({ type: "set-animals", animals: parsed });
    };
    setInterval(updateMarkers, 500);
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
    }
  };

  animalFormChangeHandler = input => event => {
    console.log("forminput", this.state);
    this.setState({ [input]: event.target.value });
  };
  animalPopup = () => {
    let animalsInfos = this.props.animals;
      return (
        <Popup
          longitude={parseFloat(animalsInfos.longitude)}
          latitude={parseFloat(animal.latitude)}
          closeButton={true}
          closeOnClick={false}
          captureClick={true}
          dynamicPosition={true}
          anchor="top"
          onClose={() =>
          this.setState({
            showPopup: false
          })
        }
      >
        <span>Hello</span>
      </Popup>
    );
  }
}
  handleSubmit = event => {
    event.preventDefault();
    let markerlat = this.state.popup.latitude;
    let markerlng = this.state.popup.longitude;

    let newMarker = {
      latitude: markerlat,
      longitude: markerlng
    };
    console.log("newMarker", newMarker);
    this.setState({
      markers: newMarker,
      displayMarker: true
    });
    let formData = new FormData();
    formData.append("type", this.props.animalsDetails.animalType);
    console.log("animalType", this.props.animalsDetails.animalType);
    formData.append("name", this.props.animalsDetails.animalName);
    formData.append("race", this.props.animalsDetails.animalRace);
    formData.append("age", this.props.animalsDetails.animalAge);
    formData.append("gender", this.props.animalsDetails.animalGender);
    formData.append("event", this.props.animalsDetails.animalEvent);
    formData.append("description", this.props.animalsDetails.animalDescription);
    formData.append("image", this.props.animalsDetails.animalImage);
    console.log("image", this.props.animalsDetails.animalImage);
    formData.append("latitude", this.state.popup.latitude);
    formData.append("longitude", this.state.popup.longitude);
    fetch("/new-pet", {
      method: "POST",
      body: formData
    });

    // .then(response => response.text())
    // .then(response => {
    //   let petId = JSON.parse(response);
    //   this.setState({ petId: petId });
    //   this.props.getItemId(petId);
    //   // receives the itemID from the backend
    // });
  };

  render() {
    let animalsInfos = this.props.animals;
    let allMarkers = animalsInfos.map(animal => {
      return (
        <Marker
          longitude={parseFloat(animal.longitude)}
          latitude={parseFloat(animal.latitude)}
        >
          <img
            onClick={this.animalPopup}
            src="./images/pawIcon.png"
            className="MarkerIcon"
            width="30px"
          />
        </Marker>
      );
    });

    // console.log(this.state);
    const { viewport } = this.state;
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
        <div className="MapArea">
          <ReactMapGL
            {...viewport}
            mapStyle="mapbox://styles/vincentlinx/cjzsriwql096b1climsp972oc"
            mapboxApiAccessToken="pk.eyJ1IjoidmluY2VudGxpbngiLCJhIjoiY2p6c2x6Mm5hMHg5bzNkbjR2d2dvYnhpeiJ9.agg51yZYDvNIHBwXSPcBrQ"
            onViewportChange={viewport => this.setState({ viewport })}
            onClick={this.clickHandler}
            className="theMap"
          >
            <div className="navigationControl">
              <NavigationControl />
            </div>
            {allMarkers}
            {/* This will be the place for the geolocation button */}
            {/* Area for the popup class interaction when clicked on the map  */}
            {this.state.showPopup ? (
              <div className="popupdiv">
                <Popup
                  className="popup"
                  latitude={this.state.popup.latitude}
                  longitude={this.state.popup.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  captureClick={true}
                  dynamicPosition={true}
                  onClose={() =>
                    this.setState({
                      showPopup: false,
                      popuplat: [],
                      popuplng: []
                    })
                  }
                  anchor="top"
                >
                  {/* Space to enter the form for missing animal */}
                  <UserForm
                    latitude={this.state.popup.latitude}
                    longitude={this.state.popup.longitude}
                    handleSubmit={this.handleSubmit}
                  />
                </Popup>
              </div>
            ) : null}
          </ReactMapGL>
        </div>
      </div>
    );
    // } else {
    //   return <Redirect to="/signup" />;
    // }
  }
}

let mapStatetoProps = state => {
  return {
    loggedIn: state.loggedIn,
    animalsDetails: state.animalsDetails,
    animals: state.animals
  };
};
let Map = connect(mapStatetoProps)(unconnectedMap);
export default Map;
