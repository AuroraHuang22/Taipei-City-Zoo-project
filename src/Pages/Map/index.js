import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Map from "../Map/MapComponent";
import Animals from "./Animal";
import AnimalsJson from "../../Utils/animals.json";
import FacilitiesJson from "../../Utils/facilities.json";
import RouteJson from "../../Utils/route.json";
import styled from "styled-components";
import { useReactToPrint } from "react-to-print";
import * as firestore from "../../Utils/firebase";

const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  padding: 80px 1px 0px;
  height: calc(100vh - 80px);
  .animalsDiv {
    height: 100%;
    box-sizing: border-box;
    width: 35%;
    padding: 0 30px;
    height: calc(100vh - 160px);
    .printMap {
      width: 80%;
      padding: 12px;
      margin-top: 20px;
      margin-bottom: 20px;
      background-color: white;
      position: relative;
      font-size: 16px;
      border: 1px solid #acacac;
      border-radius: 25px;
      color: #acacac;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 18px;
      font-weight: 500;
      ::after {
        content: "⏍";
        opacity: 0;
        font-size: 18px;
        visibility: hidden;
        position: absolute;
        right: 50%;
        transition: all 0.3s;
      }
      :hover {
        border: 1px solid #ea7a60;
        background-color: white;
        color: #ea7a60;
        padding-right: 20px;
        ::after {
          opacity: 1;
          visibility: visible;
          right: 10%;
        }
      }
    }
  }
  @media (max-width: 1024px) {
    flex-direction: column;
    padding-bottom: 60px;
    height: auto;

    .animalsDiv {
      width: 100%;
      padding: 10px 30px;
      height: 100%;
    }
  }
  @media (max-width: 768px) {
    padding-top: 40px;
  }
  @media (max-width: 576px) {
    padding-top: 10px;
    padding-bottom: 100px;
    .animalsDiv {
      padding: 0 10px;
    }
  }
`;

function MapIndex() {
  const componentRef = useRef();
  const [getUid, setGetUid] = useState("none");
  const isRowBased = window.matchMedia("(max-width: 1020px)").matches;

  const displayDiv = useSelector(
    (state) => state.AnimalsReducer.disPlayforFacility
  );

  const handlePrint = useReactToPrint({
    removeAfterPrint: true,
    documentTitle: "安心上Zoo",
    copyStyles: true,
    content: () => componentRef.current,
  });

  useEffect(() => {
    const unsubscribe = firestore.getUserId((uid) => {
      setGetUid(uid);
    });
    return unsubscribe;
  }, []);

  if (getUid === "none") {
    return null;
  }

  return (
    <Container>
      <div className="animalsDiv">
        <Animals
          facilities={FacilitiesJson}
          animal={AnimalsJson}
          route={RouteJson}
          uid={getUid}
        />
        <button
          className="printMap"
          style={{ display: isRowBased ? "none" : displayDiv }}
          onClick={handlePrint}
        >
          下載地圖至ＰＤＦ
        </button>
      </div>
      <Map ref={componentRef} facilities={FacilitiesJson} />
    </Container>
  );
}

export default MapIndex;
