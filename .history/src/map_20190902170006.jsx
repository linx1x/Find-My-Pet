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
      displayMarker: false,
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
      }animalType: "",
      animalName: "",
      animalRace: "",
      animalAge: "",
      animalGender: "",
      animalImage: [],
      animalDescription: "",
      animalEvent: "",
      
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

    console.log("state", this.state);
    this.setState({
      viewport: newViewport,
      popup: newPopup,

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

  animalFormChangeHandler = input => event => {
    console.log("forminput", this.state);
    this.setState({ [input]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    let testlat = this.state.popup.latitude;
    let testlng = this.state.popup.latitude;
    this.state.popup.longitude;

    let newMarker = {
      latitude: testlat,
      longitude: testlng
    };
    console.log("newMarker", newMarker);
    this.setState({
      markers: newMarker,
      displayMarker: true
    });
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
    console.log(this.state);
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
        <div>
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
              <Marker
                latitude={this.state.popup.latitude}
                longitude={this.state.popup.longitude}
              >
                <img src="/pawIcon.png" className="MarkerIcon" width="30px" />
              </Marker>
            ) : null}

            {/* Area for the popup class interaction when clicked on the map  */}
            {this.state.showPopup ? (
              <Popup
                latitude={this.state.popup.latitude}
                longitude={this.state.popup.longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() =>
                  this.setState({
                    showPopup: false,
                    popuplat: [],
                    popuplng: []
                  })
                }
                anchor="top"
              >
                <UserForm />
              </Popup>
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
  return { loggedIn: state.loggedIn };
};
let Map = connect(mapStatetoProps)(unconnectedMap);
export default Map;
