import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import * as action from "../Redux/Action";
import * as firestore from "../Utils/firebase";
import LoginPopup from "../Utils/LoginPopup";
import * as toast from "../Utils/toast";
import { ToastContainer } from "react-toastify";

import {
  BrowserRouter as Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

const HeaderDiv = styled.div`
  position: fixed;
  display: none;
  align-items: center;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 800;
  background-color: rgba(255, 255, 255, 1);
  border-top: 0.5px solid #f2f2f2;
  @media (max-width: 576px) {
    display: flex;
  }
`;
const main = styled.div`
  text-decoration: none;
  color: #f09a8f;
  font-weight: 500;
  letter-spacing: 2px;
  font-size: 18px;
`;
const Container = styled(main)`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  .nav-bar {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 0 30px;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-evenly;
  }
  .select {
    position: relative;
    display: flex;
    width: 18%;
    height: 55px;
    cursor: pointer;
    padding: 10px;
    display: inline-block;
    text-decoration: none;
    transition: all 0.3s;
    justify-content: center;
    align-items: center;
    img {
      display: block;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      height: 28px;
      object-fit: cover;
      object-position: center;
    }
  }
`;

export default function Header() {
  const [getUid, setUid] = useState("none");

  useEffect(() => {
    firestore.getUserId((data) => setUid(data));
  }, []);

  if (getUid === "none") {
    return null;
  }

  return (
    <HeaderDiv id="header-web">
      <Container>
        <div className="nav-bar">
          <Link to="/all" className="select all">
            <img className="logo" src="/elephant.svg" alt="logo" />
          </Link>
          <a href="/map" className="select">
            <img className="map" src="/map.png" alt="map" />
          </a>
          <Link to="/" className="select logo">
            <img className="logo" src="/logo.svg" alt="logo" />
          </Link>
          <a href="/member" className="select">
            <img className="member" src="/user-profile.svg" alt="member" />
          </a>
          <Link to="/entrance" className="select info">
            <img className="logo" src="/information.svg" alt="logo" />
          </Link>
          <LoginPopup />
        </div>
        <ToastContainer />
      </Container>
    </HeaderDiv>
  );
}
