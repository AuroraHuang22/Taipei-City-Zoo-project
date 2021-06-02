import React from "react";
import styled from "styled-components";
import img from "../../../Icons/223.png";
import AnimalsData from "./AnimalsData";
import FacilitySelector from "./FacilitySelector";

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
  return (
    <AnimalsDiv id="animalDiv">
      {/* <div className="imgdiv"></div> */}
      <AnimalsData animal={prop.animal} route={prop.route} uid={prop.uid} />
      <FacilitySelector
        facilities={prop.facilities}
        uid={prop.uid}
        animal={prop.animal}
      />
    </AnimalsDiv>
  );
};

export default Animals;
