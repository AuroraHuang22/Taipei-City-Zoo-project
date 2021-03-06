import React from "react";
import styled from "styled-components";
import AnimalsData from "./AnimalsData";
import FacilitySelector from "./FacilitySelector";

const AnimalsDiv = styled.div`
  padding: 15px 5px;
  position: relative;
`;

const Animals = (prop) => {
  return (
    <AnimalsDiv id="animalDiv">
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
