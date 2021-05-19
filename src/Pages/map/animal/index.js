import React, { useState, useEffect } from "react";
import styled from "styled-components";
import img from "../../../icons/223.png";
import Selector from "./selector";
// import AnimalsData from "./animalsData";

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

const AnimalsData = (prop) => {
  const [animalsData, setAnimalsData] = useState(null);

  useEffect(() => {
    prop.animal.then((data) => {
      setAnimalsData(data);
    });
  }, []);

  if (!animalsData) {
    return null;
  }
  console.log(animalsData);
  return null;
};

const Animals = (prop) => {
  return (
    <AnimalsDiv>
      {/* <div className="imgdiv"></div> */}
      <AnimalsData animal={prop.animal} />
      <Selector facilities={prop.facilities} />
    </AnimalsDiv>
  );
};

export default Animals;
