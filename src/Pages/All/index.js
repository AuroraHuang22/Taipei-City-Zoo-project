import React from "react";
import styled from "styled-components";
import Conservation from "./Conservation";
import AllAnimalas from "./AllAniamls";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 80px auto 0;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: grey;
`;

function All() {
  return (
    <Container>
      <Conservation />
      <AllAnimalas />
    </Container>
  );
}

export default All;
