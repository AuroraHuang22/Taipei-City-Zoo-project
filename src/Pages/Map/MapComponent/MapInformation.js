import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AnimalsJson from "../../../Utils/animals.json";

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  font-size: 14px;
  position: absolute;
  padding: 20px 20px;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  z-index: 500;
  color: #554d4b;
  justify-content: center;

  .recommend {
    display: flex;
    flex-direction: column;
    margin: 0 20px;
    max-width: 60%;
  }
  .wrap {
    white-space: nowrap;
  }
  .title {
    font-size: 16px;
    font-weight: 500;
    color: #ea7a60;
    margin-bottom: 3px;
  }
  .content {
    margin-bottom: 8px;
  }
  .num {
    display: inline-block;
    font-weight: 500;
    color: #ea7a60;
    width: 30px;
  }
  .svg {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    margin-right: 10px;
  }
`;

const animalsJson = AnimalsJson;
export default function MapComformation() {
  const confoStore = useSelector((state) => state.AnimalsReducer.conformation);
  const recommendStore = useSelector((state) => state.AnimalsReducer.recommend);
  const chooseAnimal = useSelector(
    (state) => state.AnimalsReducer.showAnimals.num
  );
  const facilitiesStore = useSelector(
    (state) => state.SelectorReducer.showFacilities
  );

  if (!confoStore.length) {
    return null;
  }
  let info = recommendStore.map((item) => item[0]);
  let recom = `入口廣場 ⇢`;
  info.forEach((element) => {
    if (element !== "列車站") {
      recom += `${element} ⇢ `;
    } else {
      recom += ` 搭乘遊園列車於鳥園車站下車後，步行至`;
    }
  });
  recom += `往出口方向移動 ⇢ 回家囉`;
  let distance = confoStore[0];
  let time = (confoStore[1] * 60 + info.length * 25 * 60) / 60 / 60;

  let recommendRoute = `${recom}`;
  let recommendDistance = `行程總距離約為${distance}公里，預計遊園時間約為${time.toFixed(
    0
  )}小時`;

  return (
    <Container id="map-info">
      <div className="recommend">
        <span className="title">遊園路線規劃</span>
        <div className="content">{recommendRoute}</div>
        <span className="title">路程距離</span>
        <div className="content">{recommendDistance}</div>
      </div>
      <div className="recommend wrap">
        <span className="title">要造訪的動物</span>
        <div className="content">
          {animalsJson.map((item) =>
            chooseAnimal.map((num) =>
              item.CID === Number(num) ? (
                <div key={num}>
                  <span className="num">{num}</span>
                  <span className="content">{item.Name_Ch}</span>
                </div>
              ) : null
            )
          )}
        </div>
      </div>
      {facilitiesStore.length ? (
        <div className="recommend wrap">
          <span className="title">標記設施</span>
          <div className="content">
            {facilitiesStore.map((item) => (
              <div key={item}>
                <span
                  className="svg"
                  style={{
                    backgroundImage: `url(./Labels/${item}-02.svg)`,
                  }}
                />
                {item}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </Container>
  );
}
