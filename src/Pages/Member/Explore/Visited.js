import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AnimalsJson from "../../../Utils/animals.json";
import * as firestore from "../../../Utils/firebase";
import { BrowserRouter as Switch, Link, useRouteMatch } from "react-router-dom";
import { routing } from "leaflet";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  height: 100%;
`;
const Render = styled.div`
  padding: 20px 50px;
`;

const ItemBlock = styled.div`
  position: relative;
  font-size: 10px;
  font-weight: bold;
  min-height: 120px;
  border: 1px solid lightgray;
  margin: 5px 5px;
  padding: 3px 5px;
  border-radius: 10px;
  .greyGround {
    position: absolute;
  }
  .animalsBlock {
  }
  .greyGround-p {
    font-size: 20px;
    color: lightgray;
    line-height: 40px;
  }
  .blocksFilter-p {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: normal;
    width: 85%;
    height: 85%;
    border-radius: 50%;
  }
`;

export default function Visited(props) {
  let { catalogs } = props;
  let { blocksFilter } = props;
  let { getVisited } = props;
  let { stampPavilions } = props;

  return (
    <Container>
      <Render>
        {getVisited.length ? (
          catalogs.map((item, index) => (
            <ItemBlock key={`${index}858`}>
              {item}
              <div className="greyGround">
                {catalogs.map((pav, pavIndex) =>
                  item === "新光特展館(大貓熊館)" && pavIndex === 1 ? (
                    <div
                      key={pav}
                      style={{
                        boxSizing: "border-box",
                        display: "inline-block",
                        textAlign: "center",
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        margin: "15px",
                        border: "2px dashed lightgrey",
                      }}
                    >
                      <p className="greyGround-p">🈳</p>
                    </div>
                  ) : item === "企鵝館" && pavIndex < 2 ? (
                    <div
                      key={pav}
                      style={{
                        boxSizing: "border-box",
                        display: "inline-block",
                        textAlign: "center",
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        margin: "15px",
                        border: "2px dashed lightgrey",
                      }}
                    >
                      <p className="greyGround-p">🈳</p>
                    </div>
                  ) : item === "無尾熊館" && pavIndex === 1 ? (
                    <div
                      key={pav}
                      style={{
                        boxSizing: "border-box",
                        display: "inline-block",
                        textAlign: "center",
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        margin: "15px",
                        border: "2px dashed lightgrey",
                      }}
                    >
                      <p className="greyGround-p">🈳</p>
                    </div>
                  ) : item !== "無尾熊館" &&
                    item !== "企鵝館" &&
                    item !== "新光特展館(大貓熊館)" &&
                    pavIndex < 5 ? (
                    <div
                      key={pav}
                      style={{
                        boxSizing: "border-box",
                        display: "inline-block",
                        textAlign: "center",
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        margin: "15px",
                        border: "2px dashed lightgrey",
                      }}
                    >
                      <p className="greyGround-p">🈳</p>
                    </div>
                  ) : null
                )}
              </div>
              <div className="animalsBlock">
                {blocksFilter.map((ele) =>
                  ele[1] === item ? (
                    <div
                      key={ele[0]}
                      style={{
                        display: "inline-block",
                        textAlign: "center",
                        width: "80px",
                        position: "relative",
                        height: "80px",
                        borderRadius: "50%",
                        margin: "15px",
                      }}
                    >
                      <div className="blocksFilter-p">{ele[0]}</div>
                      <div
                        style={{
                          boxSizing: "border-box",
                          display: "inline-block",
                          width: "90%",
                          height: "90%",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%)",
                          borderRadius: "50%",
                          backgroundImage: `url(${ele[2]})`,
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          filter: "grayscale(70%)",
                          border: "4px solid pink",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.opacity = 0.2;
                        }}
                        onMouseOut={(e) => {
                          e.target.style.opacity = 1;
                        }}
                      ></div>
                    </div>
                  ) : null
                )}
              </div>
              {/* {stampPavilions.map((stamp) =>
                item === stamp ? (
                  <div
                    key={`stamp-${stamp}`}
                    className="stampBlock"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "-20px",
                      transform: "translate(0,-50%)",
                      fontSize: "40px",
                    }}
                  >
                    🎉
                  </div>
                ) : null
              )} */}
            </ItemBlock>
          ))
        ) : (
          <div>
            糟糕 護照還沒有任何紀錄！
            快到總覽去新增看過的動物,或是現在起身規劃探索旅程吧！
          </div>
        )}
      </Render>
      <div className="explore">
        <Link to={`/member/explore`}>
          <div>回護照</div>
        </Link>
      </div>
    </Container>
  );
}
