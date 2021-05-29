import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  BrowserRouter as Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import Visited from "./Visited";
import img from "../../../Icons/111.jpg";

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  height: 85vh;
  padding: 20px 30px;

  background-image: url(${img});
  background-position: top left;
  background-repeat: no-repeat;
  background-size: 100%;

  .visited {
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

const Selector = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 25px;
  align-items: center;
  border: 1px solid lightgrey;
  margin: 10px;
  background-color: #fff;
`;

export default function Explore(props) {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <Container className="imgdiv">
          <div className="visited">
            <Link to={`${match.url}/visited`}>
              <Selector>我的足跡</Selector>
            </Link>
          </div>
        </Container>
      </Route>
      <Route path={`${match.path}/visited`}>
        <Visited uid={props.uid} />
      </Route>
    </Switch>
  );
}
