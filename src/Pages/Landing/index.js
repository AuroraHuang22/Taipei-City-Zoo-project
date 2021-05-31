import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  max-width: 1480px;
  padding: 160px 0px 300px;
  justify-content: center;

  .hero {
    box-sizing: border-box;
    width: 100%;
    max-width: 600px;
    height: 200px;
    background-image: url(/Imgs/hero-02.svg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .getStart {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    margin-top: 50px;
    input {
      padding: 3px 5px;
      width: 100%;
      max-width: 250px;
      color: #fbba8f;
      outline: none;
      border: 2px solid #fb7d62;
    }
    button {
      white-space: nowrap;
      background-color: #fb7d62;
      outline: none;
      border: none;
      color: white;
      font-weight: 600;
      padding: 12px 20px;
      border-radius: 0;
    }
  }
`;

export default function Landing() {
  return (
    <Container>
      <div className="hero" />
      <div className="getStart">
        <input placeholder="" />
        <button>get started</button>
      </div>
    </Container>
  );
}
