import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MemberInfo from "./MemberInfo";
import Explore from "./Explore";
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
`;

export default function MapIndex() {
  const [getUid, setGetUid] = useState("none");

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
      <Main>{getUid ? <Explore uid={getUid} /> : <div>請登入會員</div>}</Main>
    </Container>
  );
}
