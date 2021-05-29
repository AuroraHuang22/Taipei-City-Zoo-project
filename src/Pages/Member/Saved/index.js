import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as firestore from "../../../Utils/firebase";
import AnimalsJson from "../../../Utils/animals.json";

const Container = styled.div`
  position: relative;
  width: 80%;

  .itemBlock {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    padding: 20px 20px;
    border: 1px solid grey;
    border-radius: 25px;
    margin: 20px 0px;
  }
  .contentBlock {
    display: flex;
    align-items: center;
    justify-content: start;
    margin-right: auto;
  }
  .content {
    margin: 0px 10px;
    border: 1px solid grey;
    padding: 3px 8px;
    border-radius: 12px;
    color: black;
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

  if (savedData === "none" || savedData.length === 0) {
    return null;
  }

  return (
    <Container>
      {savedData.map((item, index) => (
        <div className="itemBlock" key={`item${index}`}>
          <div className="contentBlock">
            儲存行程 {index + 1}
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
          <button
            data-index={index}
            onClick={(e) => {
              window.location.href = `/map?id=${index + 1}`;
            }}
          >
            go to map
          </button>
          <button
            onClick={(e) => {
              firestore.firebaseDeleteDoc(uid, savedId[index]);
              setRemove(savedId[index]);
            }}
          >
            delete
          </button>
        </div>
      ))}
    </Container>
  );
}
