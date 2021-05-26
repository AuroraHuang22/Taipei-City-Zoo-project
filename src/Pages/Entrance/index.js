import React from "react";
import styled from "styled-components";
import Traffic from "./Traffic";
import Infomation from "./Infomation";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 80px 10px 0px;
  justify-content: center;
`;

export default function Entrance() {
  return (
    <Container>
      <Infomation />
      <Traffic />
    </Container>
  );
}
