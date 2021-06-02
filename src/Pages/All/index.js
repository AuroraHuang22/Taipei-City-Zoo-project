import React from "react";
import styled from "styled-components";
import Conservation from "./Conservation";
import AllAnimalas from "./AllAniamls";

const Background = styled.div`
  display: flex;
  flex-direction: column;
  margin: 80px auto 0;
  width: 100%;
  justify-content: center;
  align-items: center;
  /* background-color: pink; */
`;

function All() {
  return (
    <Background>
      {/* <Conservation /> */}
      <AllAnimalas />
    </Background>
  );
}

export default All;
