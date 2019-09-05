//Import the libraries
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "./auth.css";

//Create class for the Signup
class UnconnectedSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: ""
    };
  }

  //Handler for the email
  emailChangeHandler = event => {
    console.log(event.target.value);
    this.setState({ email: event.target.value });
  };
  //Handler for the password
  passwordChangeHandler = event => {
    console.log(event.target.value);
    this.setState({ password: event.target.value });
  };
  //Handler for the username
  nameChangeHandler = event => {
    console.log(event.target.value);
    this.setState({ name: event.target.value });
  };
  //This will create a new form that will have add
  // The  full name, the email the password and the address to the body
  // of the response for the backend
  submitHandler = async event => {
    event.preventDefault();
    console.log("The form was submitted with the following body");
    console.log(this.state);
    let data = new FormData();
    data.append("email", this.state.email);
    console.log("email")
    data.append("name", this.state.username);
    data.append("password", this.state.password);
    let response = await fetch("/signup", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    console.log("body.success", body.success);
    if (body.success === false) {
      alert("This username is alreay taken");
      return;
    }

    this.props.dispatch({
      type: "signup-successful"
    });
    // this.props.history.push("/login");
    this.props.history.push("/");
    return;
  };
  render = () => {
    return (
      <div className="App">
        <div className="App__Aside" />
        <div className="App__Form">
          <div className="FormTitle">
            <div className="FormCenter">
              <div className="or">
                <NavLink
                  // to="/Login"
                  to="/login"
                  activeClassName="FormTitle__Link--Active"
                  className="FormTitle__Link"
                >
                  Log In
                </NavLink>{" "}
                or{" "}
                <NavLink
                  exact
                  to="/signup"
                  activeClassName="FormTitle__Link--Active"
                  className="FormTitle__Link"
                >
                  Sign Up
                </NavLink>
              </div>
              <form onSubmit={this.submitHandler}>
                <div className="FormField">
                  <label className="FormField__Label" htmlFor="name">
                    Enter your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="FormField__Input"
                    placeholder="Your username here"
                    name="name"
                    value={this.state.name}
                    onChange={this.nameChangeHandler}
                  />
                </div>
                <div className="FormField">
                  <label className="FormField__Label" htmlFor="email">
                    Enter your E-mail address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="FormField__Input"
                    placeholder="Your e-mail here"
                    name="email"
                    value={this.state.email}
                    onChange={this.emailChangeHandler}
                  />
                </div>
                <div className="FormField">
                  <label className="FormField__Label" htmlFor="password">
                    Enter your password
                  </label>
                  <input
                    type="password"
                    id="password:"
                    className="FormField__Input"
                    placeholder="Your password here"
                    name="password"
                    value={this.state.password}
                    onChange={this.passwordChangeHandler}
                  />
                </div>
                <div className="FormField">
                  <button className="FormField__Button">Sign up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
}
let SignUp = connect()(UnconnectedSignUp);
export default SignUp;
