import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as firestore from "../../../Utils/firebase";
import AnimalsJson from "../../../Utils/animals.json";
import { BrowserRouter as Switch, Link, useRouteMatch } from "react-router-dom";

const Button = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  .btn {
    box-sizing: border-box;
    font-size: 16px;
    padding: 5px 20px;
    border-radius: 25px;
    text-align: right;
    border: 2px solid lightgrey;
    margin: 10px;
    margin-left: auto;
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
  .title {
    font-size: 24px;
    color: #5f5c90;
    font-weight: 500;
  }

  .itemBlock {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 40px 120px;
    border-bottom: 1px solid #f2f2f2;
    transition: all 0.2s;
    color: #acacac;
    .flex-left {
      /* width: 60%; */
      display: flex;
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
        margin-right: auto;
        .content {
          margin: 0px 10px;
          border: 1px solid #acacac;
          padding: 3px 12px;
          border-radius: 12px;
        }
      }
    }
    .flex-right {
      display: flex;
      margin-left: auto;
      flex-direction: column;
      .goto,
      .remove {
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
      <Button>
        <Link to={`/member`}>
          <div className="btn">回護照</div>
        </Link>
      </Button>
      <Container>
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
          <h4>
            還沒有儲存行程的紀錄喔,只要在路線規劃印出地圖,地圖資料就會自動儲存到這裡囉！
          </h4>
        )}
      </Container>
    </>
  );
}
