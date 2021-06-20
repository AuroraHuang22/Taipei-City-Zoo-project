import React from "react";
import styled from "styled-components";
import Traffic from "./Information/Traffic";
import Imformance from "./Information/Informance/Index.js";

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
      <Imformance />
      <Traffic />
    </Container>
  );
}
