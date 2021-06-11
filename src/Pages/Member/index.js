import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MemberInfo from "./MemberInfo";
import Explore from "./Explore";
import { useDispatch } from "react-redux";
import * as action from "../../Redux/Action";
import Saved from "./Saved";
import Visited from "./Explore/Visited";
import * as firestore from "../../Utils/firebase";

import {
  BrowserRouter as Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 150px 10px 30px;
  justify-content: center;
`;
const Main = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  /* overflow-y: scroll; */
  margin: 0 auto;
  margin-top: 24px;
  width: 100%;
  max-width: 1280px;
  padding: 30px;
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
`;

export default function MapIndex() {
  const [getUid, setGetUid] = useState("none");
  const disPatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firestore.getUserId((uid) => {
      setGetUid(uid);
    });
    return unsubscribe;
  }, []);

  if (getUid === "none") {
    return null;
  }

  return (
    <Container>
      <MemberInfo uid={getUid} />
      <Main>
        {getUid ? (
          <Explore uid={getUid} />
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
    </Container>
  );
}
