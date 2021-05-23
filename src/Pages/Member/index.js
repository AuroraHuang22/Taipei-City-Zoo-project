import React from "react";
import styled from "styled-components";
import MemberInfo from "./MemberInfo";
import Explore from "./Explore";
import Saved from "./Saved";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
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

function MapIndex() {
  let match = useRouteMatch();
  return (
    <Container>
      <MemberInfo />
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
          <Route path={`${match.path}/explore`} component={Explore} />
          <Route path={`${match.path}/saved`} component={Saved} />
        </Switch>
      </Main>
    </Container>
  );
}

export default MapIndex;
