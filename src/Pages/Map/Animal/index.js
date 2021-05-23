import React from "react";
import styled from "styled-components";
import img from "../../../Icons/223.png";
import AnimalsData from "./AnimalsData";

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
  return (
    <AnimalsDiv>
      {/* <div className="imgdiv"></div> */}
      <AnimalsData animal={prop.animal} route={prop.route} />
      {/* <Selector facilities={prop.facilities} /> */}
    </AnimalsDiv>
  );
};

export default Animals;
