import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AnimalsJson from "../../../Utils/animals.json";
import { useSelector, useDispatch } from "react-redux";
import * as action from "../../../Redux/Action";
import img from "../../../Icons/stamp-02.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1480px;
  justify-content: center;
  height: 100%;
  border: 1px solid lightgrey;
  border-radius: 20px;
`;
const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 20px 100px;
  align-items: center;
  justify-content: start;
`;
const Render = styled.div`
  padding: 20px 50px;
`;

export default function Explore() {
  const [filter, setFilter] = useState("all");
  const visitedStore = useSelector(
    (state) => state.ExploreReducer.visitedAnimals
  );
  const disPatch = useDispatch();

  let novisitedArray = AnimalsJson.filter(
    (i) => visitedStore.findIndex((j) => j === i.Name_Ch) === -1
  );

  return (
    <Container>
      <Navbar>
        <span
          id="ex-all"
          style={{
            marginRight: "12px",
            padding: "5px 10px",
            border: "1px solid grey",
            borderRadius: "20px",
          }}
          onClick={() => setFilter("all")}
        >
          總覽
        </span>
        <span
          id="ex-novisited"
          style={{
            marginRight: "12px",
            padding: "5px 10px",
            border: "1px solid grey",
            borderRadius: "20px",
          }}
          onClick={() => setFilter("novisited")}
        >
          那些你還沒造訪過的
        </span>
        <span
          id="ex-visited"
          style={{
            padding: "5px 10px",
            border: "1px solid grey",
            borderRadius: "20px",
          }}
          onClick={() => setFilter("visited")}
        >
          想知道你累積多少Stamp?
        </span>
      </Navbar>
      <Render>
        {filter === "all"
          ? AnimalsJson.map((item) => (
              <div
                key={item.Name_Ch}
                style={{
                  display: "inline-block",
                  width: "80px",
                  position: "relative",
                  height: "80px",
                  borderRadius: "50%",
                  margin: "15px",
                  backgroundColor: "lightgray",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    width: "80px",
                    height: "80px",
                    position: "absolute",
                    borderRadius: "50%",
                    lineHeight: "80px",
                    fontSize: "8px",
                    whiteSpace: "normal",
                    textAlign: "center",
                  }}
                >
                  {item.Name_Ch}
                </div>
                <div
                  style={{
                    display: "inline-block",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    borderRadius: "50%",
                    backgroundImage: `url(${item.Pic01_URL})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    transition: "all 0.1s",
                    filter: "grayscale(0%)",
                  }}
                  onClick={() => {
                    disPatch(action.addVisited(item.Name_Ch));
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = 0.4;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.opacity = 1;
                  }}
                ></div>
                {visitedStore.map((name) =>
                  name === item.Name_Ch ? (
                    <div
                      key={`v${item.Name_Ch}`}
                      style={{
                        display: "inline-block",
                        width: "130%",
                        height: "120%",
                        transform: "rotate(-15deg)",
                        position: "absolute",
                        top: 0,
                        left: "-5px",
                        backgroundImage: `url(${img})`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        opacity: "0.6",
                      }}
                      onClick={() => {
                        console.log("看過");
                      }}
                    ></div>
                  ) : null
                )}
              </div>
            ))
          : filter === "visited"
          ? AnimalsJson.map((item) =>
              visitedStore.map((ani, index) =>
                item.Name_Ch === ani ? (
                  <div
                    key={`no-${item.Name_Ch}`}
                    style={{
                      display: "inline-block",
                      width: "80px",
                      position: "relative",
                      height: "80px",
                      borderRadius: "50%",
                      margin: "15px 20px",
                      backgroundColor: "lightgray",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-block",
                        width: "80px",
                        height: "80px",
                        position: "absolute",
                        borderRadius: "50%",
                        lineHeight: "80px",
                        fontSize: "8px",
                        whiteSpace: "normal",
                        textAlign: "center",
                      }}
                    >
                      {item.Name_Ch}
                    </div>
                    <div
                      style={{
                        display: "inline-block",
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        borderRadius: "50%",
                        backgroundImage: `url(${item.Pic01_URL})`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        transition: "all 0.1s",
                        // opacity: 0.4,
                        filter: "grayscale(70%)",
                      }}
                      onClick={() => {
                        disPatch(action.addVisited(item.Name_Ch));
                      }}
                    ></div>
                    <div
                      key={`v${item.Name_Ch}`}
                      style={{
                        display: "inline-block",
                        width: "130%",
                        height: "120%",
                        transform: "rotate(-15deg)",
                        position: "absolute",
                        top: 0,
                        left: "-5px",
                        backgroundImage: `url(${img})`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        opacity: "0.6",
                      }}
                      onClick={() => {
                        console.log("看過");
                      }}
                    ></div>
                  </div>
                ) : null
              )
            )
          : filter === "novisited"
          ? novisitedArray.map((item) => (
              <div
                key={item.Name_Ch}
                style={{
                  display: "inline-block",
                  width: "80px",
                  position: "relative",
                  height: "80px",
                  borderRadius: "50%",
                  margin: "15px",
                  backgroundColor: "lightgray",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    width: "80px",
                    height: "80px",
                    position: "absolute",
                    borderRadius: "50%",
                    lineHeight: "80px",
                    fontSize: "8px",
                    whiteSpace: "normal",
                    textAlign: "center",
                  }}
                >
                  {item.Name_Ch}
                </div>
                <div
                  style={{
                    display: "inline-block",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    borderRadius: "50%",
                    backgroundImage: `url(${item.Pic01_URL})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    transition: "all 0.1s",
                    // opacity: 0.4,
                    filter: "grayscale(70%)",
                  }}
                  onClick={() => {
                    disPatch(action.addVisited(item.Name_Ch));
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = 0.4;
                  }}
                  onMouseOut={(e) => {
                    e.target.style.opacity = 1;
                  }}
                ></div>
              </div>
            ))
          : null}
      </Render>
    </Container>
  );
}
