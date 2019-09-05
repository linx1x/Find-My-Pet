import React, { Component } from "react";
import { NavLink, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./auth.css";
class Unconnectedlogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  handleEmailChange = event => {
    console.log("new account email: ", event.target.value);
    this.setState({ email: event.target.value });
  };
  handlePasswordChange = event => {
    console.log("new password", event.target.value);
    this.setState({ password: event.target.value });
  };
  submitHandler = async event => {
    event.preventDefault();
    console.log("login form submitted");
    let data = new FormData();
    data.append("email", this.state.email);
    data.append("password", this.state.password);
    let response = await fetch("/login", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    console.log("responseBody from login: ", responseBody);
    let body = JSON.parse(responseBody);
    if (body.success) {
      console.log("logIn successful");
      this.setState({ email: this.state.email });
      this.props.dispatch({
        type: "login-successful",
        email: this.state.email
      });
      this.props.history.push("/login");
      return;
    }
    this.setState({ email: "", password: "" });
    alert("Oops, wrong username or password, please try again");
  };
  render = () => {
    console.log("I am in the loggin endpoint");
    console.log(this.props.loggedIn);
    if (this.props.loggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div className="App">
        <div className="App__Aside" />

        <div className="App__Form">
          <div className="FormTitle">
            <div className="FormCenter">
              <div class="or">
                <NavLink
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
                    onChange={this.handleEmailChange}
                  />
                </div>

                <div className="FormField">
                  <label className="FormField__Label" htmlFor="password">
                    Enter your password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="FormField__Input"
                    placeholder="Your password here"
                    name="password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  />
                </div>
                <div className="FormField">
                  <input
                    type="submit"
                    className="FormField__Button"
                    value="login"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
}
let mapStatetoProps = state => {
  return { loggedIn: state.loggedIn };
};
let login = connect(mapStatetoProps)(Unconnectedlogin);
export default withRouter(login);
