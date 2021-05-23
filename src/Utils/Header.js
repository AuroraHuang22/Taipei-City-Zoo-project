import React from "react";
import styled from "styled-components";

const HeaderDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: white;
  border-bottom: 1px solid lightslategrey;
  z-index: 220;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1400px;
  justify-content: flex-start;
  margin: 0 auto;
  .logo {
    padding: 30px;
    margin-right: auto;
  }
  .nav-bar {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    flex-basis: 1;
    padding: 20px;
  }
  .select {
    padding: 10px;
    margin-right: 20px;
  }
`;

export default function Header() {
  return (
    <HeaderDiv>
      <Container>
        <a href="/" className="logo">
          Logo
        </a>
        <div className="nav-bar">
          <a href="/all" className="select">
            動物總覽
          </a>
          <a href="/map" className="select">
            遊園路線規劃
          </a>
          <a href="/trafic" className="select">
            交通資訊
          </a>
          <a href="/member" className="select">
            探索護照
          </a>
        </div>
      </Container>
    </HeaderDiv>
  );
}
