import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import animalsJson from "../../../Utils/animals.json";

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
  @media (max-width: 576px) {
    background-color: rgba(255, 255, 255, 1);
    flex-direction: column;
    position: relative;
    padding: 20px 20px;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    .title {
      font-size: 16px;
      font-weight: 500;
      color: #ea7a60;
      margin-top: 10px;
      margin-bottom: 3px;
    }
  }
  @media print {
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
  }
`;

export default function MapComformation() {
  const storedInformation = useSelector(
    (state) => state.AnimalsReducer.conformation
  );
  const recommendStore = useSelector((state) => state.AnimalsReducer.recommend);
  const selectedAnimals = useSelector(
    (state) => state.AnimalsReducer.showAnimals.num
  );
  const facilitiesStore = useSelector(
    (state) => state.SelectorReducer.showFacilities
  );
  const getHowManyStop = () => {
    const stop = recommendStore.map((item) => item[0]);
    return stop;
  };
  const setRecommendRoute = (stops) => {
    let content = `入口廣場 ⇢`;
    stops.forEach((element) => {
      if (element !== "列車站") {
        content += `${element} ⇢ `;
      } else {
        content += ` 搭乘遊園列車於鳥園車站下車後，步行至`;
      }
    });
    content += `往出口方向移動 ⇢ 回家囉`;
    return content;
  };
  const setRecommendDistance = (stops) => {
    const distance = storedInformation[0];
    const time = (storedInformation[1] * 60 + stops.length * 25 * 60) / 60 / 60;
    const recommendDistance = `行程總距離約為${distance}公里，預計遊園時間約為${time.toFixed(
      0
    )}小時`;
    return recommendDistance;
  };
  const setAnimalsSort = () => {
    const selectAnimalsData = animalsJson
      .filter((animals) => selectedAnimals.includes(animals.CID))
      .map((result) => ({
        num: result.CID,
        name: result.Name_Ch,
        index: result.Index,
      }));

    const animalSort = selectAnimalsData.sort(function (a, b) {
      return a.index - b.index;
    });
    animalSort[0].index >= 10
      ? animalSort.sort((a, b) => b.index - a.index)
      : animalSort.sort((a, b) => a.index - b.index);
    return animalSort;
  };

  if (!storedInformation) {
    return null;
  }

  const stops = getHowManyStop();
  const animalSort = setAnimalsSort();

  return (
    <Container id="map-info">
      <div className="recommend">
        <span className="title">遊園路線規劃</span>
        <div className="content">{setRecommendRoute(stops)}</div>
        <span className="title">路程距離</span>
        <div className="content">{setRecommendDistance(stops)}</div>
      </div>
      <div className="recommend wrap">
        <span className="title">要造訪的動物</span>
        <div className="content">
          {animalSort.map((item) => (
            <div key={item.name}>
              <span className="num">{item.num}</span>
              <span className="content">{item.name}</span>
            </div>
          ))}
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
