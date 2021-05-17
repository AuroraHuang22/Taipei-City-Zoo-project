import React, { useState, useEffect } from "react";
import Map from "./map";
import Animals from "./animals";
import styled from "styled-components";
import { firebaseGetData } from "../../Utils/Firebase";

const Flexbox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 70vw;
  display: flex;
  flex-direction: column;
`;

function MapIndex() {
  return (
    <div className="App" style={{ display: "flex", flexDirection: "row" }}>
      <Animals facilities={firebaseGetData("Facilities")} />
      <Map facilities={firebaseGetData("Facilities")} />
    </div>
  );
}

export default MapIndex;
