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
  flex-direction: row;
  padding: 80px 10px 0px;
  .animalsDiv {
    height: 80vh;
    width: 30%;
    overflow: scroll;
  }
`;

function MapIndex() {
  const componentRef = useRef();
  const [displayDiv, setDisplayDiv] = useState("none");
  const [getUid, setGetUid] = useState("none");

  const displayStore = useSelector(
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

  useEffect(() => {
    if (displayStore) {
      setDisplayDiv("block");
    }
  }, [displayStore]);

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
        <button style={{ display: displayDiv }} onClick={handlePrint}>
          print
        </button>
      </div>
      <Map ref={componentRef} facilities={FacilitiesJson} />
    </Container>
  );
}

export default MapIndex;
