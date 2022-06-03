import { React, useState, useEffect } from "react";
import List from "./List";
import Logout from "../assets/img/logout.png";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import data from "../data/train.json"

data.map((i) => {
  let gender = i.Sex;
});

export default function Home() {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  // Check if user is already connected

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
        } else return;
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  // Logout function

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
          <div className="input-info">
            <label htmlFor="">Sex : </label>
            <select name="sex" id="sex">
              <option value=""> Choose a gender </option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
          <div className="input-info">
            <label htmlFor="">Class : </label>
            <select name="class" id="class">
              <option value=""> Choose a class </option>
              <option value="1">1st class</option>
              <option value="2">2nd class</option>
              <option value="3">3rd class</option>
            </select>
          </div>
          <div className="input-info">
            <label htmlFor="">Age : </label>
            <select name="class" id="class">
              <option value=""> Choose a category </option>
              <option value="child">Child (0 to 12)</option>
              <option value="teen">Teenage (12 to 21)</option>
              <option value="adult">Adult (22 to 59)</option>
              <option value="senior">Senior ({">="} 60) </option>
            </select>
          </div>
          <div className="input-info">
            <button>
              <Link to="/result">Analyse</Link>
            </button>
          </div>

          <div className="input-info passenger">
            <label htmlFor="">Passenger name : </label>
            <input
              id="outlined-basic"
              variant="outlined"
              label="Search"
              onChange={inputHandler}
            />
          </div>
        </div>
        <List input={inputText} />
      </div>
    </div>
  );
}
console.log();