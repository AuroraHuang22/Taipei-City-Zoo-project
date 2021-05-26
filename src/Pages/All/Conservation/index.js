import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1480px;
  padding: 120px 0px;
  background-color: white;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  font-size: 43px;
`;

function Conservation() {
  return <Container>保育廊道</Container>;
}

export default Conservation;
