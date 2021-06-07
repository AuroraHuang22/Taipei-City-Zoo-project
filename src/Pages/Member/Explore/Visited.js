import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Switch, Link, useRouteMatch } from "react-router-dom";

const Button = styled.span`
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
  a {
    text-decoration: none;
    color: #3a4d48;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  height: 100%;
  border-radius: 25px;
  padding: 15px;
  border: 1px solid lightgrey;
  box-sizing: border-box;
  margin-top: 18px;
`;
const Render = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ItemBlock = styled.div`
  box-sizing: border-box;
  width: 48%;
  position: relative;
  font-size: 10px;
  font-weight: bold;
  min-height: 160px;
  margin: 5px 5px;
  padding: 3px 5px;
  border-radius: 10px;

  .title-bg {
    height: 40px;
    object-fit: cover;
  }
  .greyGround {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    box-sizing: border-box;
    position: absolute;
    .grey-bg {
      box-sizing: border-box;
      display: inline-block;
      text-align: center;
      height: 80px;
      width: 80px;
      border-radius: 50%;
      margin: 15px;
      border: 2px dashed lightgrey;
    }
    .greyGround-p {
      font-size: 20px;
      color: lightgray;
      line-height: 40px;
      box-sizing: border-box;
    }
  }
  .animalsBlock {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    box-sizing: border-box;
    .inner-animal {
      display: inline-block;
      text-align: center;
      width: 80px;
      position: relative;
      height: 80px;
      border-radius: 50%;
      margin: 15px;
      box-sizing: border-box;
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
      box-sizing: border-box;
    }
    .animal-img {
      box-sizing: border-box;
      display: inline-block;
      width: 90%;
      height: 90%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      filter: grayscale(60%);
      border: 4px solid pink;
      transition: all 0.2s;
      cursor: pointer;
      :hover {
        opacity: 0.3;
      }
    }
  }
`;

export default function Visited(props) {
  let { catalogs } = props;
  let { blocksFilter } = props;
  let { getVisited } = props;

  return (
    <>
      <div className="button-group">
        <Link to={`/member`}>
          <Button>回護照</Button>
        </Link>
      </div>
      <Container>
        <Render>
          {getVisited.length ? (
            catalogs.map((item, index) => (
              <ItemBlock key={`${index}858`}>
                <span className="title">
                  <img
                    className="title-bg"
                    src={`/Icons/${item}-32.svg`}
                    alt="outline"
                  />
                </span>
                <div className="greyGround">
                  {catalogs.map((pav, pavIndex) =>
                    item === "新光特展館(大貓熊館)" && pavIndex === 1 ? (
                      <div key={pav} className="grey-bg">
                        <p className="greyGround-p">🈳</p>
                      </div>
                    ) : item === "企鵝館" && pavIndex < 2 ? (
                      <div key={pav} className="grey-bg">
                        <p className="greyGround-p">🈳</p>
                      </div>
                    ) : item === "無尾熊館" && pavIndex === 1 ? (
                      <div key={pav} className="grey-bg">
                        <p className="greyGround-p">🈳</p>
                      </div>
                    ) : item !== "無尾熊館" &&
                      item !== "企鵝館" &&
                      item !== "新光特展館(大貓熊館)" &&
                      pavIndex < 5 ? (
                      <div key={pav} className="grey-bg">
                        <p className="greyGround-p">🈳</p>
                      </div>
                    ) : null
                  )}
                </div>
                <div className="animalsBlock">
                  {blocksFilter.map((ele) =>
                    ele[1] === item ? (
                      <div key={ele[0]} className="inner-animal">
                        <div className="blocksFilter-p">{ele[0]}</div>
                        <div
                          className="animal-img"
                          style={{
                            backgroundImage: `url(${ele[2]})`,
                          }}
                        ></div>
                      </div>
                    ) : null
                  )}
                </div>
              </ItemBlock>
            ))
          ) : (
            <div>
              糟糕 護照還沒有任何紀錄！
              快到總覽去新增看過的動物,或是現在起身規劃探索旅程吧！
            </div>
          )}
        </Render>
      </Container>
    </>
  );
}
