import React from "react";
import styled from "styled-components";

const FooterDiv = styled.div`
  bottom: 0;
  width: 100%;
  height: 80px;
  background-color: white;
  /* border-top: 1px solid lightslategrey; */
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1400px;
  justify-content: flex-start;
  margin: 0 auto;
`;

export default function Footer() {
  return (
    <FooterDiv id="footer">
      <Container>
        <div className="footer-info"></div>
      </Container>
    </FooterDiv>
  );
}
