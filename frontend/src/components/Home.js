import { React, useState } from 'react'
import List from "./List";
import "./Home.css";
import Login from "../assets/img/login.png";
import Logout from "../assets/img/logout.png";

export default function Home() {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/home">
            Titanic Project
          </a>
          <div
            className="collapse navbar-collapse div-img"
            id="navbarTogglerDemo02"
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/sign-in">
                  <img src={Login} alt="" className="log-img" />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/sign-in">
                  <img src={Logout} alt="" className="log-img" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="main">
        <h1>Passenger Search</h1>
        <div className="search">
          <input id="outlined-basic" variant="outlined" label="Search" onChange={inputHandler}/>
        </div>
        <List input={inputText}/>
      </div>
    </div>
  );
}
