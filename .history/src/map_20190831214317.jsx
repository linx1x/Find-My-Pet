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
      displayLostForm: false,
      displayMarker: false,
      showPopup: false,
      popuplnglat: [],
      markers: [],
      viewport: {
        width: "100vw",
        height: "80vh",
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
    // console.log("lnglatTest", lnglat);
    let newViewport = {
      height: this.state.viewport.height,
      width: this.state.viewport.width,
      zoom: 15,
      latitude: lnglat[1],
      longitude: lnglat[0],
      markersActivation: true
    };
    console.log("state", this.state);
    this.setState({
      viewport: newViewport,
      popuplnglat: this.state.popuplnglat.concat(lnglat)
    });
    console.log("state", this.state);
    this.setState({
      markers: this.state.markers.concat(lnglat),
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
  render() {
    console.log(this.state);
    console.log("markerslng", this.state.markers);
    // const { showPopup } = this.state.showPopup;
    const { viewport } = this.state;
    const { showPopup } = this.state;
    const poplat = this.state.popuplnglat
      .filter((elem, i) => {
        if (i % 2 === 1) return elem;
      })
      .map(x => x * 1);
    console.log("poplat", poplat);
    const poplng = this.state.popuplnglat
      .filter((elem, i) => {
        if (i % 2 === 0) return elem;
      })
      .map(x => { x * 1);
    console.log("poplng", poplng);
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
              latitude={this.state.markers[1]}
              longitude={this.state.markers[0]}
            >
              <img src="/pawIcon.png" width="30px" />
            </Marker>
          ) : // )}
          null}
          {this.state.showPopup ? (
            <Popup
              latitude={poplat}
              longitude={poplng}
              closeButton={true}
              closeOnClick={false}
              onClose={() => this.setState({ showPopup: false })}
              anchor="top"
            >
              <div>You are here</div>
            </Popup>
          ) : null}
        </ReactMapGL>
        <div className="FormDisplayArea">
          <div className="FormDisplayButton">
            <button className="FormButton" onClick={this.displayLostForm}>
              {this.state.displayLostForm
                ? "Close the form"
                : "Lost your animal? Click here"}
            </button>
          </div>
          <div
            className="FormInputArea"
            style={{
              display: this.state.displayLostForm ? "block" : "none"
            }}
          >
            <form>
              Cat or Dog? :
              <input type="radio" name="categorie-cat" value="cat" />
              <label htmlFor="cat">Cat</label>
              <input type="radio" name="categorie-dog" value="dog" />
              <label htmlFor="dog">Dog</label>
            </form>
          </div>
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
