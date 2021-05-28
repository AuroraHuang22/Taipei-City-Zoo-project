import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MemberInfo from "./MemberInfo";
import Explore from "./Explore";
import Saved from "./Saved";
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
  padding: 80px 10px 0px;
  justify-content: center;
`;
const Main = styled.div`
  display: flex;
  box-sizing: border-box;
  max-height: 65vh;
  overflow-y: scroll;
  margin: 0 auto;
  width: 100%;
  padding: 30px;
  justify-content: center;
`;
const Selector = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  padding: 160px 120px;
  border-radius: 25px;
  align-items: center;
  border: 1px solid lightgrey;
  margin: 10px;
`;

export default function MapIndex() {
  const [getUid, setGetUid] = useState("none");

  let match = useRouteMatch();

  useEffect(() => {
    const unsubscribe = firestore.getUserId((uid) => {
      setGetUid(uid);
    });
    return unsubscribe;
  }, []);

  if (getUid === "none") {
    return null;
  }

  console.log(getUid);

  return (
    <Container>
      <MemberInfo uid={getUid} />
      {getUid ? (
        <Main>
          <Switch>
            <Route exact path={`${match.path}`}>
              <Link to={`${match.url}/saved`}>
                <Selector>儲存行程</Selector>
              </Link>
              <Link to={`${match.url}/explore`}>
                <Selector>探險護照</Selector>
              </Link>
            </Route>
            <Route path={`${match.path}/explore`}>
              <Explore uid={getUid} />
            </Route>
            <Route path={`${match.path}/saved`}>
              <Saved uid={getUid} />
            </Route>
          </Switch>
        </Main>
      ) : (
        <Main>
          <div>請登入會員</div>
        </Main>
      )}
    </Container>
  );
}
