import React from "react";
import Map from "../Map/MapComponent";
import Animals from "./Animal";
import AnimalsJson from "../../Utils/animals.json";
import FacilitiesJson from "../../Utils/facilities.json";
import RouteJson from "../../Utils/route.json";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 80px 10px 0px;
`;

function MapIndex() {
  return (
    <Container>
      <Animals
        facilities={FacilitiesJson}
        animal={AnimalsJson}
        route={RouteJson}
      />
      <Map facilities={FacilitiesJson} />
    </Container>
  );
}

export default MapIndex;
