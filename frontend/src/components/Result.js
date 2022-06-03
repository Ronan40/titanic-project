import axios from "axios";
import { React, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import Logout from "../assets/img/logout.png";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Result() {
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

  const logOut = () => {
    removeCookie("jwt");
    navigate("/sign-in");
  };

  // Pie chart template

  const data = {
    labels: ["Our research", "All passengers"],
    datasets: [
      {
        label: "# of Votes",
        data: [19, 12],
        backgroundColor: ["rgba(63,94,251,0.8)", "rgba(252,70,107,0.8)"],
        borderColor: ["rgba(63,94,251,1)", "rgba(252,70,107,1)"],
        borderWidth: 1,
      },
    ],
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
        <h1>Result</h1>
        <Pie data={data} />
        <button className="btn-reset">
          <Link to="/home">Clear</Link>
        </button>
      </div>
    </div>
  );
}
