import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import img from "../../Icons/223.png";
import Selector from "./selector";

const AnimalsDiv = styled.div`
  height: 100vh;
  width: 30vw;
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
      <div className="imgdiv"></div>
      <Selector facilities={prop.facilities} />
    </AnimalsDiv>
  );
};

export default Animals;
