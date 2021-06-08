import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Visited from "./Visited";
import Saved from "../Saved";
import AnimalsJson from "../../../Utils/animals.json";
import * as firestore from "../../../Utils/firebase";
import {
  BrowserRouter as Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
const getRandomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  height: auto;
  .bg-img {
    object-fit: cover;
  }
  a {
    text-decoration: none;
    color: #3a4d48;
  }
  .visited {
    box-sizing: border-box;
    font-size: 16px;
    padding: 5px 20px;
    border-radius: 25px;
    text-align: right;
    border: 2px solid lightgrey;
    margin: 10px;
    background-color: none;
    cursor: pointer;
    transition: all 0.3s;
    ::after {
      content: "→";
      margin-left: 3px;
      margin-right: 10px;
      transition: all 0.3s;
    }
    :hover {
      background-color: #f2ecea;
      ::after {
        margin-left: 13px;
        margin-right: 0px;
      }
    }
  }
  .btn {
    box-sizing: border-box;
    font-size: 16px;
    padding: 5px 20px;
    border-radius: 25px;
    text-align: right;
    border: 2px solid lightgrey;
    margin: 10px;
    background-color: none;
    cursor: pointer;
    transition: all 0.3s;
    ::before {
      content: "←";
      margin-right: 3px;
      margin-left: 10px;
      transition: all 0.3s;
    }
    :hover {
      background-color: #f2ecea;
      ::before {
        margin-right: 13px;
        margin-left: 0px;
      }
    }
  }
  .stamp {
    position: absolute;
    width: 250px;
    transform: translate(50%, 50%);
  }
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
          <div className="button-group">
            <Link to={`${match.url}/saved`}>
              <div className="btn">儲存行程</div>
            </Link>
            <Link to={`${match.url}/visited`}>
              <div className="visited">我的足跡</div>
            </Link>
          </div>
          <img
            className="bg-img"
            src="/Imgs/passport-bg-29.svg"
            alt="passport"
          />
          {catalogs.map((catalogs) =>
            stampPavilions.map((stamp) =>
              stamp === catalogs ? (
                <img
                  className="stamp"
                  style={{
                    top: `${getRandomNumber(0, 700)}px`,
                    left: `${getRandomNumber(0, 700)}px`,
                  }}
                  src={`/Imgs/stamp/${stamp}.png`}
                  alt={stamp}
                />
              ) : null
            )
          )}
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
      <Route path={`${match.url}/saved`}>
        <Saved uid={uid} />
      </Route>
    </Switch>
  );
}
