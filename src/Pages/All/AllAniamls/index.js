import React from "react";
import styled from "styled-components";
import Filter from "./Filter";
import RenderAnimals from "./RenderAnimals";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
`;

export default function All() {
  return (
    <Container>
      <Filter />
      <RenderAnimals />
    </Container>
  );
}
