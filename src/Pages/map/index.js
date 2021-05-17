import React, { useState, useEffect } from "react";
import Map from "./map";
import Selector from "./selector";
import Animals from "./animals";
import styled from "styled-components";
import { firebaseGetData } from "../../Utils/Firebase";

const Flexbox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100vh;
  width: 60vw;
  display: flex;
  flex-direction: column;
`;

function MapIndex() {
  return (
    <div className="App" style={{ display: "flex", flexDirection: "row" }}>
      <Animals />
      <Flexbox>
        <Map facilities={firebaseGetData("Facilities")} />
        <Selector facilities={firebaseGetData("Facilities")} />
      </Flexbox>
    </div>
  );
}

export default MapIndex;
