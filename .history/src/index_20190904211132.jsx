import ReactDOM from "react-dom";
import "./main.css";
import App from "./app.jsx";
import { Provider } from "react-redux";
import { createStore } from "redux";
import React from "react";

import reloadMagic from "./reload-magic-client.js"; // automatic reload
reloadMagic(); // automatic reload

let reducer = (state, action) => {
  if (action.type === "signup-successful") {
    return { ...state, signedIn: true };
  }
  if (action.type === "login-successful") {
    console.log("email")
    return { ...state, loggedIn: true, email: action.email};
  }
  if (action.type === "logout") {
    console.log("action logout engaged");
    return { ...state, loggedIn: false };
  }
  if (action.type === "getaddress") {
    console.log("address information fetched");
    return { ...state, address: action.address };
  }
  if (action.type === "animalDetails") {
    console.log("animal image uploaded");
    return { ...state, animalsDetails: action.payload };
  }
  if (action.type === "set-animals") {
    return { ...state, animals: action.animals };
  }
  return state;
};
const store = createStore(
  reducer,
  {
    loggedIn: false,
    signedIn: false,
    email: "",
    animalsDetails: {
      animalId: "",
      animalType: "",
      animalName: "",
      animalRace: "",
      animalAge: "",
      animalGender: "",
      animalImage: [],
      animalDescription: "",
      animalEvent: "",
      animalLatitude: "",
      animalLongitude: ""
    },
    animals: []
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
