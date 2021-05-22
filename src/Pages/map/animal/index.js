import React from "react";
import styled from "styled-components";
import img from "../../../icons/223.png";
import Selector from "./selector";
import AnimalsData from "./animalsData";

const AnimalsDiv = styled.div`
  height: 100%;
  width: 28vw;
  padding: 15px 5px;
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
