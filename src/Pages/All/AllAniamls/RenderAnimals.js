import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AnimalsJson from "../../../Utils/animals.json";

import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px 40px;
  border: 1px solid grey;
  justify-content: space-around;
`;

export default function ReaderAnimals() {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [popupAnimal, setPopupAnimal] = useState(null);

  const { search } = useSelector((state) => state.FilterAnimals);
  const { type } = useSelector((state) => state.FilterAnimals);
  const { place } = useSelector((state) => state.FilterAnimals);

  const animalsJson = AnimalsJson;
  let showAnimals = [];

  if (!search && !type && !place) {
    showAnimals = animalsJson;
  } else if (search && !type && !place) {
    showAnimals = animalsJson.filter((item) => item.Name_Ch.includes(search));
  } else if (search && type && !place) {
    showAnimals = animalsJson.filter(
      (item) => item.Name_Ch.includes(search) && item.Class.includes(type)
    );
  } else if (search && type && place) {
    showAnimals = animalsJson.filter(
      (item) =>
        item.Name_Ch.includes(search) &&
        item.Class.includes(type) &&
        item.Location.includes(place)
    );
  } else if (!search && type && !place) {
    showAnimals = animalsJson.filter((item) => item.Class.includes(type));
  } else if (!search && !type && place) {
    showAnimals = animalsJson.filter((item) => item.Location.includes(place));
  } else if (!search && type && place) {
    showAnimals = animalsJson.filter(
      (item) => item.Class.includes(type) && item.Location.includes(place)
    );
  }

  function getRandomInt(max) {
    return Math.random() * max;
  }
  return (
    <Container>
      {showAnimals.length === 0 ? (
        <p style={{ textAlign: "center" }}>找不到符合條件的動物</p>
      ) : (
        showAnimals.map((item, index) => (
          <div
            className="background"
            key={item.Name_Ch}
            style={{
              display: "inline-block",
              width: "240px",
              position: "relative",
              height: "240px",
              margin: "10px",
              borderRadius: "40px",
              overflow: "hidden",
              transition: "all 0.3s ease",
              transform: `rotate(${getRandomInt(index % 7) - 2}deg)`,
            }}
          >
            <div
              className="img"
              style={{
                display: "inline-block",
                width: "100%",
                height: "100%",
                position: "absolute",
                backgroundImage: `url(${item.Pic01_URL})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                filter: "grayscale(0%)",
                cursor: "pointer",
              }}
            ></div>
            <div
              className="text"
              style={{
                display: "inline-block",
                width: "100%",
                height: "100px",
                position: "absolute",
                bottom: 0,
                lineHeight: "130px",
                fontSize: "20px",
                fontFamily: "Noto Sans TC",
                fontWeight: "900",
                color: "white",
                letterSpacing: "4px",
                whiteSpace: "normal",
                textAlign: "left",
                paddingLeft: "10px",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))",
              }}
            >
              {item.Name_Ch}
            </div>
            <div
              style={{
                display: "inline-block",
                width: "100%",
                height: "100%",
                position: "absolute",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.target.parentNode.style.transform = "scale(1)";
              }}
              onMouseOut={(e) => {
                e.target.parentNode.style.transform = `rotate(${
                  getRandomInt(index % 7) - 2
                }deg)`;
              }}
              onClick={() => {
                setPopupAnimal(item.Name_Ch);
                setOpen((o) => !o);
              }}
            ></div>
          </div>
        ))
      )}
      <Popup
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
        overlayStyle={{ background: "rgba(0, 0, 0, 0.7)" }}
        contentStyle={{
          margin: "auto",
          boxSizing: "border-box",
          background: "#fff",
          width: "50%",
          padding: "60px 20px",
          borderRadius: "25px",
        }}
      >
        <div className="modal">
          <span
            className="close"
            onClick={closeModal}
            style={{
              display: "block",
              position: "absolute",
              top: "-30px",
              right: "-30px",
              fontSize: "40px",
              color: "white",
              cursor: "pointer",
            }}
          >
            &times;
          </span>
          {animalsJson.map((item) =>
            item.Name_Ch === popupAnimal ? (
              <div key={item.Name_En} className="content">
                {item.Name_Ch}
                <br />
                <div
                  style={{
                    color: "orange",
                    fontSize: "40px",
                    position: "absolute",
                    top: "60px",
                    right: "30px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onClick={(e) => {
                    e.target.style.color = "grey";
                    localStorage.setItem("favoriate", [
                      localStorage.getItem("favoriate"),
                      item.Name_Ch,
                    ]);
                  }}
                >
                  ★
                </div>
                <br />
                英文學名：{item.Name_Latin}
                <br />
                園區位置：{item.Location}
                <br />
                分類：{item.Phylum} -&gt; {item.Class} -&gt; {item.Order}
                -&gt; {item.Family}
                <br />
                保育等級：{item.Conservation}
                <br />
                主要分佈：{item.Distribution}
                <br />
                生活習性：{item.Habitat}
                <br />
                外部特徵：{item.Feature}
                <br />
                行為：{item.Behavior}
                <br />
                飲食：{item.Diet}
              </div>
            ) : null
          )}
        </div>
      </Popup>
    </Container>
  );
}
