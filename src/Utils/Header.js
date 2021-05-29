import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import * as action from "../Redux/Action";
import * as firestore from "../Utils/firebase";
import LoginPopup from "../Utils/LoginPopup";
import {
  BrowserRouter as Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

const HeaderDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: white;
  border-bottom: 1px solid lightslategrey;
  z-index: 220;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1400px;
  justify-content: flex-start;
  margin: 0 auto;
  .logo {
    padding: 30px;
    margin-right: auto;
  }
  .nav-bar {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    flex-basis: 1;
    padding: 20px;
  }
  .select {
    cursor: pointer;
    padding: 10px;
    margin-right: 20px;
    text-decoration: none;
  }
`;

export default function Header() {
  const [getUid, setUid] = useState("none");
  const disPatch = useDispatch();

  useEffect(() => {
    firestore.getUserId((data) => setUid(data));
  }, []);

  if (getUid === "none") {
    return null;
  }

  return (
    <HeaderDiv id="header">
      <Container>
        <Link to="/" className="logo">
          Logo
        </Link>
        <div className="nav-bar">
          <Link to="/all" className="select">
            動物總覽
          </Link>
          <a href="/map" className="select">
            遊園路線規劃
          </a>
          <a href="/member" className="select">
            探索護照
          </a>
          <Link to="/entrance" className="select">
            入園資訊
          </Link>
          {getUid ? (
            <div
              className="select"
              onClick={() => {
                firestore.signOut();
                disPatch(action.setLogout());
                disPatch(action.setLoginOpen());
              }}
            >
              登出
            </div>
          ) : (
            <div
              className="select"
              onClick={() => {
                disPatch(action.setLogin());
                disPatch(action.setLoginOpen());
              }}
            >
              登入
            </div>
          )}

          <LoginPopup />
        </div>
      </Container>
    </HeaderDiv>
  );
}
