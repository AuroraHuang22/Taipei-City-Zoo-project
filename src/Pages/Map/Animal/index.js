import React, { useState, useEffect } from "react";
import styled from "styled-components";
import img from "../../../Icons/223.png";
import AnimalsData from "./AnimalsData";
import FacilitySelector from "./FacilitySelector";

import * as firestore from "../../../Utils/firebase";

const AnimalsDiv = styled.div`
  padding: 15px 5px;
  position: relative;
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
    <AnimalsDiv id="animalDiv">
      {/* <div className="imgdiv"></div> */}
      <AnimalsData animal={prop.animal} route={prop.route} uid={getUid} />
      <FacilitySelector facilities={prop.facilities} />
    </AnimalsDiv>
  );
};

export default Animals;
