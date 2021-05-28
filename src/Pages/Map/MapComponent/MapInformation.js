import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AnimalsJson from "../../../Utils/animals.json";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  line-height: 25px;
  position: absolute;
  padding: 20px 0px;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  z-index: 500;
  .recommend-left {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 0px 15px;
    width: 55%;
  }
  .recommend-right {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding: 0px 15px;
    width: 45%;
    white-space: pre;
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
    <Container id="map-info">
      <div className="recommend-left">
        【遊園路線規劃】
        <div style={{ paddingLeft: "20px" }}>{recommendRoute}</div>
        【路程距離】
        <div style={{ paddingLeft: "20px" }}>{recommendDistance}</div>
      </div>
      <div className="recommend-right">
        <div>
          【要造訪的動物】
          <div style={{ paddingLeft: "10px" }}>
            {animalsJson.map((item) =>
              chooseAnimal.map((num) =>
                item.CID === Number(num) ? (
                  <div key={num}>
                    <span
                      style={{
                        width: "20px",
                        boxSizing: "border-box",
                        marginRight: "10px",
                        display: "inline-block",
                        textAlign: "center",
                        color: "rgb(211, 100, 27)",
                      }}
                    >
                      {num}
                    </span>
                    <span>{item.Name_Ch}</span>
                  </div>
                ) : null
              )
            )}
          </div>
        </div>
        {facilitiesStore.length ? (
          <div>
            【標記設施】
            <div style={{ paddingLeft: "10px" }}>
              {facilitiesStore.map((item) => (
                <div key={item}>
                  <span
                    style={{
                      display: "inline-block",
                      width: "15px",
                      height: "15px",
                      backgroundImage: "url(./Labels/列車站.svg)",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      marginRight: "10px",
                    }}
                  ></span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </Container>
  );
}
