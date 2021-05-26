import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as action from "../../../Redux/Action";
import styled from "styled-components";
import AnimalsJson from "../../../Utils/animals.json";
import DetailsPopup from "./DetailsPopup";
import * as firestore from "../../../Utils/firebase";
import firebase from "firebase";
const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px 70px;
  border: 1px solid grey;
  justify-content: space-around;
`;

let uid = undefined;
let firebaseFavoriateArray = [];
let favoritiesMember = [];
let visitedMember = [];

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid;
    firestore
      .firebaseGetMemberData(uid)
      .then((data) => (firebaseFavoriateArray = { ...data }))
      .then((data) => (favoritiesMember = firebaseFavoriateArray.favorities))
      .then((data) => (visitedMember = firebaseFavoriateArray.isVisited));
  }
});

export default function ReaderAnimals() {
  const [popupAnimal, setPopupAnimal] = useState(null);
  const { search } = useSelector((state) => state.FilterAnimals);
  const { type } = useSelector((state) => state.FilterAnimals);
  const { place } = useSelector((state) => state.FilterAnimals);

  const disPatch = useDispatch();
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
              backgroundColor: "grey",
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
                filter: "grayscale(30%)",
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
                fontWeight: "600",
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
                disPatch(action.setOpen());
              }}
            ></div>
          </div>
        ))
      )}
      <DetailsPopup
        uid={uid}
        showAnimals={showAnimals}
        popupAnimal={popupAnimal}
        favoritiesMember={favoritiesMember}
        visitedMember={visitedMember}
      />
    </Container>
  );
}
