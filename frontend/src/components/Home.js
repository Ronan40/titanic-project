import { React, useState, useEffect } from 'react'
import List from "./List";
import "./Home.css";
import Login from "../assets/img/login.png";
import Logout from "../assets/img/logout.png";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";

export default function Home() {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);

  };

  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/sign-in");
      } else {
        const { data } = await axios.post(
          "http://localhost:8000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/sign-in");
        } else
          toast(`Hi ${data.user} 🦄`, {
            theme: "dark",
          });
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/sign-in");
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
                <a className="nav-link" href="/sign-in" onClick={logOut}>
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
