import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MemberInfo from "./MemberInfo";
import Explore from "./Explore";
import { useDispatch } from "react-redux";
import * as action from "../../Redux/Action";
import Saved from "./Saved";
import Visited from "./Visited";
import * as firestore from "../../Utils/firebase";
import animalsJson from "../../Utils/animals.json";
import { Route, Switch } from "react-router-dom";

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  padding: 80px 10px 30px;
  justify-content: center;
  align-items: center;
  height: calc(100vh);
  .index-draw {
    display: none;
    width: 60%;
    position: fixed;
    bottom: 0;
  }
  @media (max-width: 996px) {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 150px 10px 30px;
    justify-content: center;
    height: 100%;
    .draw-left {
      display: block;
      left: 0;
      opacity: 0.4;
    }
    .draw-right {
      display: block;
      right: 0;
    }
  }
  @media (max-width: 576px) {
    padding: 80px 10px 30px;
  }
`;
const Main = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 40vh;
  height: 100%;
  margin: 0 auto;
  width: 70%;
  max-width: 1280px;
  padding: 5px 30px;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  a {
    text-decoration: none;
    color: #3a4d48;
  }
  .button-group {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .header-sm-darkgrey {
    border-radius: 25px;
    border: 1px solid lightgrey;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: #6b6b6b;
    font-weight: 400;
    .btn {
      margin: 0 5px;
      font-weight: 600;
      cursor: pointer;
      transition: color 0.2s;
      border-bottom: 1px solid #6b6b6b;
      :hover {
        color: #5f5c90;
      }
    }
  }
  @media (max-width: 996px) {
    width: 90%;
    padding: 0 10px 50px;
    height: auto;
    min-height: auto;
  }
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const set = new Set();
const catalogs = animalsJson
  .filter((item) => (!set.has(item.Location) ? set.add(item.Location) : false))
  .map((item) => item.Location);

export default function MemberIndex() {
  const [getUid, setGetUid] = useState("none");
  const [getVisited, setGetVisited] = useState([]);
  const disPatch = useDispatch();
  const getAllVisitedAnimalsData = () => {
    const allVisitedAnimalsData = animalsJson
      .filter((animals) => getVisited.includes(animals.Name_Ch))
      .map((result) => [result.Name_Ch, result.Location]);
    return allVisitedAnimalsData;
  };

  useEffect(() => {
    const unsubscribe = firestore.getUserId((uid) => {
      setGetUid(uid);
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    if (getUid && getUid !== "none") {
      firestore
        .firebaseGetMemberData(getUid)
        .then((data) => setGetVisited(data.isVisited));
    }
  }, [getUid]);

  if (getUid === "none") {
    return null;
  }

  const allVisitedAnimalsData = getAllVisitedAnimalsData();
  return (
    <Container>
      <MemberInfo
        uid={getUid}
        catalogs={catalogs}
        allVisitedAnimalsData={allVisitedAnimalsData}
      />
      <Switch>
        <Main>
          {getUid ? (
            <>
              <Route exact path="/member">
                <Explore
                  catalogs={catalogs}
                  allVisitedAnimalsData={allVisitedAnimalsData}
                />
              </Route>
              <Route path="/member/saved">
                <Saved uid={getUid} />
              </Route>
              <Route path="/member/visited">
                <Visited
                  uid={getUid}
                  getVisited={getVisited}
                  catalogs={catalogs}
                  allVisitedAnimalsData={allVisitedAnimalsData}
                />
              </Route>
            </>
          ) : (
            <div className="header-sm-darkgrey">
              請先
              <span
                className="btn"
                onClick={() => {
                  disPatch(action.setLogin());
                  disPatch(action.setLoginOpen());
                }}
              >
                登入會員
              </span>
              呦
            </div>
          )}
        </Main>
      </Switch>
      <img className="draw-left index-draw" src="Imgs/land-35.svg" alt="img" />
    </Container>
  );
}
