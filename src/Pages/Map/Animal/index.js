import React, { useState, useEffect } from "react";
import styled from "styled-components";
import img from "../../../Icons/223.png";
import AnimalsData from "./AnimalsData";
import firebase from "firebase";

import * as firestore from "../../../Utils/firebase";

const AnimalsDiv = styled.div`
  height: 80vh;
  width: 30%;
  padding: 15px 5px;
  position: relative;
  overflow: scroll;
  .imgdiv {
    background-image: url(${img});
    background-position: top left;
    background-repeat: no-repeat;
    background-size: 95%;

    width: 100%;
    height: 80%;
  }
`;

const Animals = (prop) => {
  const [getUid, setGetUid] = useState("none");

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
    <AnimalsDiv>
      {/* <div className="imgdiv"></div> */}
      <AnimalsData animal={prop.animal} route={prop.route} uid={getUid} />
      {/* <Selector facilities={prop.facilities} /> */}
    </AnimalsDiv>
  );
};

export default Animals;
