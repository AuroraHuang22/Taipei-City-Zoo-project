import React from "react";
import styled from "styled-components";
import Traffic from "./Traffic";
import Infomation from "./Information/Index";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 80px 30px 0px;
  justify-content: center;
  @media (max-width: 576px) {
    padding: 0;
  }
`;

export default function Entrance() {
  return (
    <Container>
      <Infomation />
      <Traffic />
    </Container>
  );
}
