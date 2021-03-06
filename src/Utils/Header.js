import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import * as action from "../Redux/Action";
import * as firestore from "../Utils/firebase";
import * as toast from "../Utils/toast";
import HeaderSm from "./Header-sm";
import { ToastContainer } from "react-toastify";

import { Link, useLocation } from "react-router-dom";

const HeaderDiv = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 800;
  background-color: rgba(255, 255, 255, 0.8);
  @media (max-width: 768px) {
    height: 60px;
  }
  @media (max-width: 576px) {
    display: none;
  }
`;
const main = styled.div`
  text-decoration: none;
  color: #f09a8f;
  font-weight: 500;
  letter-spacing: 2px;
  font-size: 18px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
const Container = styled(main)`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  .logo {
    width: 35px;
    height: 35px;
    background-image: url(/logo.svg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .nav-bar {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
  }
  .select {
    cursor: pointer;
    padding: 10px;
    margin: 0 10px;
    display: inline-block;
    color: #f09a8f;
    text-decoration: none;
    transition: all 0.3s;
    :hover {
      color: #7f7da7;
    }
  }
  .select.active {
    color: #7f7da7;
  }
  .signBox {
    display: flex;
    align-items: center;
    position: absolute;
    right: 20px;
  }
  .signup {
    cursor: pointer;
    padding: 1px 12px;
    color: #a7a6d1;
    border: 1px solid #a7a6d1;
    border-radius: 20px;
    margin-right: 8px;
    transition: all 0.3s;

    :hover {
      color: #5f5c90;
      border: 1px solid #5f5c90;
    }
  }
  .signin {
    cursor: pointer;
    color: #a7a6d1;
    border-radius: 20px;
    transition: all 0.3s;
    :hover {
      color: #5f5c90;
    }
  }
  .signout {
    cursor: pointer;
    position: absolute;
    right: 20px;
    color: #a7a6d1;
    border-radius: 20px;
    transition: all 0.3s;

    :hover {
      color: #5f5c90;
    }
  }
  @media (max-width: 768px) {
    .logo {
      width: 25px;
      height: 25px;
      background-image: url(/logo.svg);
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100%;
    }
    .select {
      cursor: pointer;
      padding: 10px;
      margin-right: 10px;
      display: inline-block;
      color: #f09a8f;
      text-decoration: none;
      transition: all 0.3s;
      :hover {
        color: #5f5c90;
      }
    }
  }
`;

export default function Header() {
  const [getUid, setUid] = useState("none");
  const disPatch = useDispatch();
  const id = useLocation().pathname;

  useEffect(() => {
    firestore.getUserId((data) => setUid(data));
  }, []);

  if (getUid === "none") {
    return null;
  }

  return (
    <>
      <HeaderDiv id="header-web">
        <Container>
          <div className="nav-bar">
            <Link
              to="/all"
              className={id === "/all" ? "select active" : "select"}
            >
              ????????????
            </Link>
            <a
              href="/map"
              className={id === "/map" ? "select active" : "select"}
            >
              ??????????????????
            </a>
            <Link
              to="/"
              className={id === "/" ? "select active logo" : "select logo"}
            />
            <a
              href="/member"
              className={
                id === "/member" ||
                id === "/member/saved" ||
                id === "/member/visited"
                  ? "select active"
                  : "select"
              }
            >
              ????????????
            </a>
            <Link
              to="/entrance"
              className={id === "/entrance" ? "select active" : "select"}
            >
              ????????????
            </Link>
          </div>
          {getUid ? (
            <div
              className="signout"
              onClick={() => {
                toast.remove("??????????????????");
                disPatch(action.setLogout());
                firestore.signOut();
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }}
            >
              ??????
            </div>
          ) : (
            <div className="signBox">
              <div
                className="signup"
                onClick={() => {
                  disPatch(action.setLoginOpen());
                }}
              >
                ??????
              </div>
              <div
                className="signin"
                onClick={() => {
                  disPatch(action.setLoginOpen());
                }}
              >
                ??????
              </div>
            </div>
          )}
          <ToastContainer />
        </Container>
      </HeaderDiv>
      <HeaderSm />
    </>
  );
}
