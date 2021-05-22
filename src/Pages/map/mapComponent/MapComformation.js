import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  line-height: 25px;
  padding: 10px 20px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  z-index: 500;
`;

export default function MapComformation() {
  const confoStore = useSelector((state) => state.AnimalsReducer.conformation);
  const recommendStore = useSelector((state) => state.AnimalsReducer.recommend);

  if (!confoStore.length) {
    return null;
  }
  let info = recommendStore.map((item) => item[0]);
  let recom = `入口廣場 ->`;
  info.forEach((element) => {
    if (element !== "列車站") {
      recom += `${element} -> `;
    } else {
      recom += `搭乘遊園列車於鳥園車站下車後，步行至`;
    }
  });
  recom += `快快樂樂回家`;
  let distance = confoStore[0];
  let time = (confoStore[1] * 60 + info.length * 25 * 60) / 60 / 60;

  let recommendRoute = `${recom}`;
  let recommendDistance = `行程總距離約為${distance}公里，預計遊園時間約為${time.toFixed(
    0
  )}小時`;

  return (
    <Container>
      【遊園路線規劃】
      <br />
      <blockquote>{recommendRoute}</blockquote>
      【路程距離】
      <br />
      <blockquote>{recommendDistance}</blockquote>
    </Container>
  );
}
