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
      markers:{
      latitude: {},
      longitude: {},
      },
      
      inputItemImage: [],

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
    console.log("state", this.state);
    this.setState({
      viewport: newViewport,
      popuplng: this.state.popuplng.concat({ longetidute: lng }),
      popuplat: this.state.popuplat.concat({ latitude: lat }),
      markerslng: this.state.markerslng.concat(lng),
      markerslat: this.state.markerslat.concat(lat),
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
    this.setState({ inputItemImage: e });
  };
  handleItemName = event => {
    this.setState({ inputItemName: event.target.value });
  };
  handleItemName = event => {
    this.setState({ inputItemName: event.target.value });
  };
  handleItemName = event => {
    this.setState({ inputItemName: event.target.value });
  };
  handleItemName = event => {
    this.setState({ inputItemName: event.target.value });
  };
  handleItemName = event => {
    this.setState({ inputItemName: event.target.value });
  };
  handleSubmit = () => {
    let formData = new FormData();
    formData.append("name", this.state.inputItemName);
    formData.append("description", this.state.inputItemDesc);
    formData.append("cost", this.state.inputItemPrice);
    formData.append("itemImage", this.state.inputItemImage);
    formData.append("available_quantity", this.state.inputItemQuantity);
    fetch("/new-item", {
      method: "POST",
      body: formData
    })
      .then(response => response.text())
      .then(response => {
        let itemId = JSON.parse(response);
        this.setState({ itemId: itemId });
        this.props.getItemId(itemId);
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
              latitude={this.state.markerslat[0]}
              longitude={this.state.markerslng[0]}
            >
              <img src="/pawIcon.png" width="30px" />
            </Marker>
          ) : // )}
          null}
          {this.state.showPopup ? (
            <Popup
              latitude={this.state.popuplat[0].latitude}
              longitude={this.state.popuplng[0].longetidute}
              closeButton={true}
              closeOnClick={false}
              onClose={() =>
                this.setState({ showPopup: false, popuplat: [], popuplng: [] })
              }
              anchor="top"
            >
              <div className="popupFormDiv">
                <form className="popupFormArea">
                  <div className="FormAnimalType">
                    <h3>Did you lost a dog or a cat ?</h3>
                    <input
                      type="radio"
                      name="categorie-cat"
                      value="cat"
                      onChange={this.animalType}
                    />
                    <label htmlFor="cat">Cat</label>
                    <input
                      type="radio"
                      name="categorie-dog"
                      value="dog"
                      onChange={this.animalType}
                    />
                    <label htmlFor="dog">Dog</label>
                  </div>
                  <div className="FormAnimalName">
                    <h3> Enter the name of your pet</h3>
                    <input
                      type="text"
                      className="animalNameInput"
                      onChange={this.animalNameHandler}
                      placeholder="Name of the animal"
                    ></input>
                  </div>
                  <div className="FormAnimalName">
                    <h3>Enter the race of your pet</h3>
                    <input
                      type="text"
                      className="animalNameInput"
                      onChange={this.animalNameHandler}
                      placeholder="Name of the animal"
                    ></input>
                  </div>
                  <div className="FormAnimalName">
                    <h3> Enter the age of your pet</h3>
                    <input
                      type="text"
                      className="animalAgeInput"
                      onChange={this.animalAgeHandler}
                      placeholder="Age of the animal"
                    ></input>
                  </div>
                  <div className="animalPictures">
                    Upload an image:
                    <input
                      type="file"
                      id="input"
                      onChange={e => this.uploadPicture(e.target.files.map())}
                    />
                  </div>
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
