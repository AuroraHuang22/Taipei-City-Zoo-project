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
  width: 100%;
  margin: 0 auto;
  max-width: 1280px;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding: 100px 50px;
  box-sizing: border-box;

  .background {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 200px;
    height: 200px;
    padding-bottom: 30px;
    margin-bottom: 20px;
    cursor: pointer;
  }
  .background:hover .img {
    border: 3px solid #f09a8f;
  }
  .background:hover .text {
    background-color: #f09a8f;
    color: #f2f2f2;
    font-weight: 600;
  }
  .img {
    width: 80%;
    height: 80%;
    border-radius: 50%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: grayscale(30%);
    border: 3px solid #a5a4a3;
    background-color: #f2f2f2;
    transition: all 0.3s ease;
  }
  .text {
    position: absolute;
    min-width: 120px;
    text-align: center;
    bottom: 0;
    background-color: #f2f2f2;
    padding: 3px 20px;
    border-radius: 20px;
    font-size: 18px;
    letter-spacing: 2px;
    color: #a5a4a3;
    transition: all 0.3s ease;
  }
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

  return (
    <Container>
      {showAnimals.length === 0 ? (
        <p style={{ textAlign: "center" }}>找不到符合條件的動物</p>
      ) : (
        showAnimals.map((item, index) => (
          <div
            className="background"
            key={item.Name_Ch}
            onClick={() => {
              setPopupAnimal(item.Name_Ch);
              disPatch(action.setOpen());
            }}
          >
            <div
              className="img"
              style={{
                backgroundImage: `url(${item.Pic01_URL})`,
              }}
            ></div>
            <div className="text">{item.Name_Ch}</div>
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
