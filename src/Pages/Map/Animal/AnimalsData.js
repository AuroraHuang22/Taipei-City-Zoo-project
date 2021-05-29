import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../Redux/Action";
import * as firestore from "../../../Utils/firebase";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ItemBlock = styled.div`
  font-size: 10px;
  font-weight: bold;
  border: 1px solid lightgray;
  margin: 5px 5px;
  padding: 3px 5px;
  border-radius: 10px;
`;

const AnimalsItemBlock = styled.div`
  padding: 3px 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .popupDiv {
    display: none;
    position: fixed;
    top: 50vh;
    left: 50vw;
    width: 50vw;
    height: 80vh;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
  }
`;

const AnimalContent = styled.div`
  font-size: 8px;
  font-weight: normal;
  border: 1px solid lightgray;
  margin: 5px 5px;
  padding: 3px 5px;
  border-radius: 10px;
  background-color: #fff;
`;

const MoreAnimals = styled.div`
  border: 1px solid lightgray;
  margin: 5px 5px;
  padding: 3px 5px;
  border-radius: 10px;
`;

const PopopDiv = styled.div`
  position: fixed;
  top: 50%;
  left: 2.5%;
  transform: translateY(-50%);
  width: 20vw;
  padding: 30px;
  background-color: lightgray;
  border-radius: 10px;
  z-index: 100;
`;

let flag = false;

const AnimalsData = (prop) => {
  const [showItem, setShowItem] = useState(null);
  const [animalsData, setAnimalsData] = useState(null);
  const [favorities, setFavorities] = useState("none");
  const [savedData, setSaveData] = useState("none");
  const [dispaly, setdisplay] = useState("none");
  const [dispalyContainer, setDispalyContainer] = useState("block");
  const disPatch = useDispatch();
  const displayStore = useSelector(
    (state) => state.AnimalsReducer.displayforAnimalSelect
  );
  const animalsNum = useSelector(
    (state) => state.AnimalsReducer.showAnimals.num
  );

  let params = new URLSearchParams(document.location.search.substring(1));
  let idValue = params.get("id");

  let routeData = prop.route;
  let uid = prop.uid;

  const showMyGeo = (e) => {
    if (e.target.style.backgroundColor !== "lightgrey") {
      e.target.style.backgroundColor = "lightgrey";
      disPatch(
        action.addAnimal(
          [Number(e.target.dataset.lat), Number(e.target.dataset.lng)],
          e.target.dataset.num
        )
      );
    } else {
      e.target.style.backgroundColor = "white";
      disPatch(
        action.removeAnimal(
          [Number(e.target.dataset.lat), Number(e.target.dataset.lng)],
          e.target.dataset.num
        )
      );
    }
  };
  const submit = () => {
    let pavilionsArray = [];
    animalsData.forEach((item) => {
      animalsNum.forEach((num) => {
        if (item.CID === Number(num)) {
          pavilionsArray.push([item.Location, item.Index]);
        }
      });
    });

    if (pavilionsArray.length) {
      const set = new Set();
      const pavilionsSort = pavilionsArray
        .filter((item) => (!set.has(item[1]) ? set.add(item[1]) : false))
        .sort((a, b) => a[1] - b[1]);

      let found = pavilionsSort.indexOf(
        pavilionsSort.find((index) => index[1] >= 4 && index[1] < 10)
      );
      if (found !== -1) {
        pavilionsSort.splice({ found }, 0, ["列車站", 3.5]);
      }

      pavilionsSort[0][1] >= 10
        ? pavilionsSort.sort((a, b) => b[1] - a[1])
        : pavilionsSort.sort((a, b) => a[1] - b[1]);

      let result = [];
      routeData.forEach((item) =>
        pavilionsSort.forEach((pav) =>
          item.Location === pav[0] ? result.push(...item.Route) : null
        )
      );
      disPatch(action.addRecommend(pavilionsSort));
      disPatch(action.addRoute(result));
      disPatch(action.gotoNextStep());
      setDispalyContainer("none");
    } else {
      alert("請先選擇至少一種想看的動物喔！");
    }
  };
  const showMoreAnimals = (e) => {
    setdisplay("block");
    setShowItem(e);
    return null;
  };

  useEffect(() => {
    setAnimalsData(prop.animal);
    if (uid) {
      firestore
        .firebaseGetMemberData(uid)
        .then((data) => setFavorities(data.favorities));
    } else {
      setFavorities(false);
    }
  }, []);

  useEffect(() => {
    if (uid) {
      return firestore.firebaseGetSavedData(uid, (data) => setSaveData(data));
    }
  }, []);

  useEffect(() => {
    if (displayStore) {
      console.log("block");
      setDispalyContainer("block");
    }
  }, [displayStore]);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target.dataset.classname !== "animalBtn") setdisplay("none");
    });
    return window.removeEventListener("click", (e) => {
      if (e.target.dataset.classname !== "animalBtn") setdisplay("none");
    });
  }, []);

  useEffect(() => {
    if (idValue) {
      if (savedData === "none" || savedData.length === 0) {
        return null;
      }
      let geoArray = [];
      savedData[idValue - 1].geo.forEach((item) => {
        let arr1 = item.split(",");
        geoArray.push([Number(arr1[0]), Number(arr1[1])]);
      });
      let numArray = [];
      savedData[idValue - 1].num.forEach((item) => {
        numArray.push(Number(item));
      });

      disPatch(action.removeAllAnimal());
      geoArray.forEach((item, index) =>
        disPatch(action.addAnimal(item, numArray[index]))
      );
      flag = true;
    }
  }, [savedData]);

  useEffect(() => {
    if (flag) {
      submit();
    }
  }, [flag]);

  if (!animalsData || favorities === undefined || favorities === "none") {
    return null;
  }

  const set = new Set();
  const catalogs = animalsData
    .filter((item) =>
      !set.has(item.Location) ? set.add(item.Location) : false
    )
    .map((item) => item.Location);

  return (
    <>
      <div style={{ display: dispalyContainer }}>
        <h3>這次想造訪哪些動物呢？</h3>
        <Container>
          {favorities ? (
            <ItemBlock>
              收藏的動物
              <AnimalsItemBlock>
                {animalsData.map((item) =>
                  favorities.map((name) =>
                    item.Name_Ch === name ? (
                      <AnimalContent
                        data-classname="animalBtn"
                        key={item.Name_Ch}
                        onClick={showMyGeo}
                        data-num={item.CID}
                        data-lat={item.Geo[1]}
                        data-lng={item.Geo[0]}
                        data-pavilion={item.Location}
                        data-index={item.Index}
                      >
                        {item.Name_Ch}
                      </AnimalContent>
                    ) : null
                  )
                )}
              </AnimalsItemBlock>
            </ItemBlock>
          ) : null}
          {catalogs.map((item, index) => (
            <ItemBlock key={`${index}858`}>
              {item}
              <AnimalsItemBlock key={`${index}88`}>
                {animalsData.map((animal) =>
                  item === animal.Location ? (
                    animal.Favorite ? (
                      <AnimalContent
                        data-classname="animalBtn"
                        key={animal.Name_Ch}
                        onClick={showMyGeo}
                        data-num={animal.CID}
                        data-lat={animal.Geo[1]}
                        data-lng={animal.Geo[0]}
                        data-pavilion={animal.Location}
                        data-index={animal.Index}
                      >
                        {animal.Name_Ch}
                      </AnimalContent>
                    ) : null
                  ) : null
                )}
                <MoreAnimals
                  data-classname="animalBtn"
                  onClick={() => {
                    showMoreAnimals(item);
                  }}
                >
                  {" "}
                  更多{" "}
                </MoreAnimals>
              </AnimalsItemBlock>
            </ItemBlock>
          ))}
          <button onClick={submit}>下一步</button>
        </Container>
      </div>
      <PopopDiv style={{ display: dispaly }}>
        {
          <AnimalsItemBlock>
            {animalsData.map((animal) =>
              showItem === animal.Location && !animal.Favorite ? (
                <AnimalContent
                  data-classname="animalBtn"
                  key={animal.Name_Ch}
                  onClick={showMyGeo}
                  data-num={animal.CID}
                  data-lat={animal.Geo[1]}
                  data-lng={animal.Geo[0]}
                  data-pavilion={animal.Location}
                  data-index={animal.Index}
                >
                  {animal.Name_Ch}
                </AnimalContent>
              ) : null
            )}
          </AnimalsItemBlock>
        }
      </PopopDiv>
    </>
  );
};

export default AnimalsData;
