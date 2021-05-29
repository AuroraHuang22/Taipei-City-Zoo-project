import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Visited from "./Visited";
import img from "../../../Icons/111.jpg";
import AnimalsJson from "../../../Utils/animals.json";
import * as firestore from "../../../Utils/firebase";
import {
  BrowserRouter as Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

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

const animalsJson = AnimalsJson;
const set = new Set();
const catalogs = animalsJson
  .filter((item) => (!set.has(item.Location) ? set.add(item.Location) : false))
  .map((item) => item.Location);

export default function Explore(props) {
  let match = useRouteMatch();
  const [getVisited, setGetVisited] = useState("none");
  let uid = props.uid;

  useEffect(() => {
    if (uid) {
      firestore
        .firebaseGetMemberData(uid)
        .then((data) => setGetVisited(data.isVisited));
    } else {
      setGetVisited(false);
    }
  }, []);

  if (getVisited === "none") {
    return null;
  }

  let blocksFilter = [];
  catalogs.forEach((catalogs1) =>
    animalsJson.forEach((animalsJson1) =>
      getVisited.forEach((getVisited1) => {
        if (
          animalsJson1.Name_Ch === getVisited1 &&
          animalsJson1.Location === catalogs1
        ) {
          blocksFilter.push([
            animalsJson1.Name_Ch,
            animalsJson1.Location,
            animalsJson1.Pic01_URL,
          ]);
        }
      })
    )
  );

  let arr = [];
  let arr1 = [];
  let stampPavilions = [];
  catalogs.forEach((catalogs) =>
    blocksFilter.forEach((blocksFilters) => {
      if (blocksFilters[1] === catalogs) {
        arr.push(blocksFilters[1]);
      }
    })
  );
  catalogs.forEach((catalogs) => {
    if (catalogs === "新光特展館(大貓熊館)" || catalogs === "無尾熊館") {
      arr1 = arr.filter((arrs) => arrs === catalogs).length;
      if (arr1 >= 1) {
        stampPavilions.push(catalogs);
      }
    } else if (catalogs === "企鵝館") {
      arr1 = arr.filter((arrs) => arrs === catalogs).length;
      if (arr1 >= 2) {
        stampPavilions.push(catalogs);
      }
    } else {
      arr1 = arr.filter((arrs) => arrs === catalogs).length;
      if (arr1 >= 5) {
        stampPavilions.push(catalogs);
      }
    }
  });

  return (
    <Switch>
      <Route exact path={`${match.path}`}>
        <Container className="imgdiv">
          {/* {catalogs.map((catalogs) =>
            stampPavilions.map((stamp) =>
              stamp === catalogs ? <p key={stamp}>{catalogs}</p> : null
            )
          )} */}
          <div className="visited">
            <Link to={`${match.url}/visited`}>
              <Selector>我的足跡</Selector>
            </Link>
          </div>
        </Container>
      </Route>

      <Route path={`${match.path}/visited`}>
        <Visited
          catalogs={catalogs}
          blocksFilter={blocksFilter}
          getVisited={getVisited}
          stampPavilions={stampPavilions}
        />
      </Route>
    </Switch>
  );
}
