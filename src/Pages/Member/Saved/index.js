import React, { useState, useEffect } from "react";
import * as firestore from "../../../Utils/firebase";
import animalsjson from "../../../Utils/animals.json";
import { Container } from "./style";

export default function Saved(prop) {
  const [savedData, setSaveData] = useState("none");
  const [remove, setRemove] = useState("none");
  const [savedId, setSaveId] = useState("none");
  const { uid } = prop;

  useEffect(() => {
    return firestore.firebaseGetSavedData(uid, (data) => setSaveData(data));
  }, [remove, uid]);
  useEffect(() => {
    return firestore.firebaseGetSavedId(uid, (data) => setSaveId(data));
  }, [remove, uid]);

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
