import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as firestore from "../../../Utils/firebase";
import AnimalsJson from "../../../Utils/animals.json";
import { BrowserRouter as Switch, Link, useRouteMatch } from "react-router-dom";

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  .render {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 30vh;
    max-height: 80vh;
    overflow: scroll;
    border-radius: 25px;
    border: 1px solid lightgrey;
    .title {
      font-size: 24px;
      color: #5f5c90;
      font-weight: 500;
    }
    .itemBlock {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 40px 120px;
      border-bottom: 1px solid #f2f2f2;
      transition: all 0.2s;
      color: #acacac;
      width: 100%;
      .flex-left {
        display: flex;
        width: 65%;
        flex-direction: column;
        align-items: flex-start;
        .header {
          width: 100px;
          height: 40px;
          background-image: url(/Imgs/passport-titlebg-30.svg);
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100%;
          text-align: center;
          line-height: 40px;
          color: grey;
          margin-bottom: 20px;
        }
        .contentBlock {
          display: flex;
          align-items: center;
          justify-content: start;
          flex-wrap: wrap;
          .content {
            margin: 10px;
            border: 1px solid #acacac;
            padding: 3px 12px;
            border-radius: 12px;
            white-space: nowrap;
          }
        }
      }
      .flex-right {
        display: flex;
        width: 35%;
        flex-direction: column;
        margin-top: 30px;
        .goto,
        .remove {
          background-color: white;
          white-space: nowrap;
          position: relative;
          font-size: 16px;
          margin: 0px 10px;
          border: 1px solid #acacac;
          padding: 4px 24px;
          border-radius: 25px;
          color: #acacac;
          margin-bottom: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .goto::after {
          content: "→";
          opacity: 0;
          visibility: hidden;
          position: absolute;
          right: 50%;
          transition: all 0.3s;
        }
      }
      :hover {
        background-color: #fcfcfc;
        color: black;
        .goto {
          border: 1px solid #ea7a60;
          background-color: white;
          color: #ea7a60;
          padding-right: 32px;
          :hover {
            box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.2);
          }
          ::after {
            opacity: 1;
            visibility: visible;
            right: 6%;
          }
        }
        .remove {
          background-color: grey;
          color: white;
          :hover {
            box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.2);
          }
        }
      }
    }
    .desc {
      color: grey;
      font-size: 16px;
      letter-spacing: 1.8px;
      text-align: center;
    }
  }
  @media (max-width: 996px) {
    .render {
      height: auto;
      min-height: none;
      max-height: none;
      overflow: auto;
      .desc {
        padding: 50px 0;
      }
      .itemBlock {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 40px 20px;
        border-bottom: 1px solid #f2f2f2;
        transition: all 0.2s;
        color: #acacac;
        .flex-left {
          display: flex;
          width: 100%;
          flex-direction: column;
          align-items: flex-start;
        }
        .flex-right {
          display: flex;
          width: 100%;
          flex-direction: row;
          .goto,
          .remove {
            font-size: 14px;
          }
        }
      }
    }
  }
  @media (max-width: 576px) {
    .render {
    }
  }
`;
const animalsjson = AnimalsJson;

export default function Saved(prop) {
  const [savedData, setSaveData] = useState("none");
  const [remove, setRemove] = useState("none");
  const [savedId, setSaveId] = useState("none");

  const uid = prop.uid;

  useEffect(() => {
    return firestore.firebaseGetSavedData(uid, (data) => setSaveData(data));
  }, [remove]);
  useEffect(() => {
    return firestore.firebaseGetSavedId(uid, (data) => setSaveId(data));
  }, [remove]);

  if (savedData === "none") {
    return null;
  }
  return (
    <>
      <Container>
        <div className="render">
          {savedData.length ? (
            savedData.map((item, index) => (
              <div className="itemBlock" key={`item${index}`}>
                <div className="flex-left">
                  <span className="header">儲存行程 {index + 1}</span>
                  <div className="contentBlock">
                    {animalsjson.map((ele) =>
                      item.num.map((na) =>
                        ele.CID === Number(na) ? (
                          <div className="content" key={`span${index}`}>
                            {ele.Name_Ch}
                          </div>
                        ) : null
                      )
                    )}
                  </div>
                </div>
                <div className="flex-right">
                  <button
                    data-index={index}
                    className="goto"
                    onClick={(e) => {
                      window.location.href = `/map?id=${index + 1}`;
                    }}
                  >
                    前往地圖
                  </button>
                  <button
                    className="remove"
                    onClick={(e) => {
                      firestore.firebaseDeleteDoc(uid, savedId[index]);
                      setRemove(savedId[index]);
                    }}
                  >
                    刪除行程
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="desc">
              到 <a href="/map">路線規劃</a> 儲存你的第一個行程吧！
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
