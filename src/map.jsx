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
      searchMarker: false,
      displayMarker: true,
      showPopupForm: false,
      showPopupMarker: false,
      popup: {
        latitude: "",
        longitude: ""
      },
      markers: {
        latitude: "",
        longitude: ""
      },
      viewport: {
        width: "90vw",
        height: "88vh",
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
    if (this.state.showPopupForm === true) {
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

        showPopupForm: true
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
    setInterval(updateMarkers, 1000);
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
      this.state.address = body;
      let newViewport = {
        height: this.state.viewport.height,
        width: this.state.viewport.width,
        zoom: 15,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      };
      let newMarkers = {
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      };
      this.setState({
        viewport: newViewport,
        searchMarker: true,
        markers: newMarkers
      });
    }
  };

  animalFormChangeHandler = input => event => {
    console.log("forminput", this.state);
    this.setState({ [input]: event.target.value });
  };
  animalPopup = index => {
    event.preventDefault();
    this.setState({ showPopupMarker: true, popupIndex: index });
  };

  handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    let formData = new FormData();
    formData.append("owner", this.props.email);
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
    this.setState(
      {
        showPopupForm: false
      },
      () => {
        console.log("state change", this.state);
      }
    );
  };

  render() {
    let animalsInfos = this.props.animals;
    let allMarkers = animalsInfos.map((animal, index) => {
      if (animal.type === "dog") {
        return (
          <Marker
            longitude={parseFloat(animal.longitude)}
            latitude={parseFloat(animal.latitude)}
          >
            <img
              onClick={() => this.animalPopup(index)}
              src="./images/dogIcon.png"
              className="MarkerIcon"
              width="30px"
            />
          </Marker>
        );
      } else {
        return (
          <Marker
            longitude={parseFloat(animal.longitude)}
            latitude={parseFloat(animal.latitude)}
          >
            <img
              onClick={() => this.animalPopup(index)}
              src="./images/catIcon.png"
              className="MarkerIcon"
              width="30px"
            />
          </Marker>
        );
      }
    });

    // console.log(this.state);
    const { viewport } = this.state;
    // if (this.props.loggedIn) {
    return (
      <div className="MainDiv">
        <div className="NavBar">
          {this.props.loggedIn ? (
            <button onClick={this.logoutHandler}>Logout</button>
          ) : (
            <Link to="/signup" className="signupLink">
              <span className="signupbutton">Signup</span>
            </Link>
          )}
        </div>
        <div className="searchcontainer">
          <form>
            <input
              type="text"
              className="searchinput"
              value={this.state.addressInfo}
              placeholder="Enter an address here"
              onChange={this.geocoderHandler}
            ></input>
          </form>
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
            {this.state.showPopupForm ? (
              <div className="popupdiv">
                <Popup
                  className="popup"
                  latitude={this.state.popup.latitude}
                  longitude={this.state.popup.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  captureClick={true}
                  dynamicPosition={false}
                  anchor="left"
                  onClose={() =>
                    this.setState({
                      showPopupForm: false,
                      popuplat: [],
                      popuplng: []
                    })
                  }
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
            {/* Space to enter the popup on each marker to show the infos */}
            {this.state.showPopupMarker ? (
              <Popup
                className="popup"
                latitude={parseFloat(
                  this.props.animals[this.state.popupIndex].latitude
                )}
                longitude={parseFloat(
                  this.props.animals[this.state.popupIndex].longitude
                )}
                closeButton={true}
                closeOnClick={false}
                captureClick={true}
                dynamicPosition={true}
                anchor="left"
                onClose={() =>
                  this.setState({
                    showPopupMarker: false,
                    popuplat: [],
                    popuplng: []
                  })
                }
              >
                <div className="popupDiv">
                  <img
                    className="popupImage"
                    src={this.props.animals[this.state.popupIndex].image}
                    alt=""
                  />
                  <h2 className="popupName">
                    {this.props.animals[this.state.popupIndex].name}
                  </h2>
                  <h3 className="popupRace">
                    {this.props.animals[this.state.popupIndex].race}
                  </h3>
                  <h3 className="popupOwner">
                    Contact the owner :
                    <br />
                    {this.props.animals[this.state.popupIndex].owner}
                  </h3>
                  <div className="popupGender">
                    {this.props.animals[this.state.popupIndex].gender}
                  </div>
                </div>
              </Popup>
            ) : null}
            {this.state.searchMarker ? (
              <Marker
                latitude={this.state.markers.latitude}
                longitude={this.state.markers.longitude}
              >
                <img src="./images/searchIcon.png" width="30px" />
              </Marker>
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
    animals: state.animals,
    email: state.email
  };
};
let Map = connect(mapStatetoProps)(unconnectedMap);
export default Map;
