import React from "react";
import styled from "styled-components";
import AllAnimalas from "./AllAniamls";

const Background = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto 0;
  width: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

function All() {
  return (
    <Background>
      <AllAnimalas />
    </Background>
  );
}

export default All;
