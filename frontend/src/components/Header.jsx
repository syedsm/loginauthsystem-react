// import React from "react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Contextapi } from "../App";

const Header = () => {
  const { token, setToken } = useContext(Contextapi);
  let navigate = useNavigate();
  function handleLogout() {
    setToken(localStorage.removeItem("token"));
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <div className="container  align-items-center justify-content-center ">
        <Link className="navbar-brand" to="/">
          FUll STACK PROFILE & POST MANAGEMENT APP{" "}
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button className=" btn btn-success " onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
