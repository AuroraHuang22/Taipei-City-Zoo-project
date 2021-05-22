import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import * as action from "../../../Redux/Action";

const Container = styled.div`
  width: 100%;
  height: 80%;
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

let pavilionsArray = [];

const AnimalsData = (prop) => {
  const [showItem, setShowItem] = useState(null);
  const [animalsData, setAnimalsData] = useState(null);
  const [dispaly, setdisplay] = useState("none");

  const disPatch = useDispatch();
  let routeData = prop.route;

  const showMyGeo = (e) => {
    if (e.target.style.backgroundColor !== "lightgrey") {
      e.target.style.backgroundColor = "lightgrey";
      pavilionsArray.push([
        e.target.dataset.pavilion,
        Number(e.target.dataset.index),
      ]);
      disPatch(
        action.addAnimal([
          Number(e.target.dataset.lat),
          Number(e.target.dataset.lng),
        ])
      );
    } else {
      e.target.style.backgroundColor = "white";
      let num = pavilionsArray.indexOf([
        e.target.dataset.pavilion,
        Number(e.target.dataset.index),
      ]);
      pavilionsArray.splice(num, 1);
      disPatch(
        action.removeAnimal([
          Number(e.target.dataset.lat),
          Number(e.target.dataset.lng),
        ])
      );
    }
  };
  const submit = () => {
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
  };
  const showMoreAnimals = (e) => {
    setdisplay("block");
    setShowItem(e);
    return null;
  };

  useEffect(() => {
    setAnimalsData(prop.animal);
  }, []);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (e.target.dataset.classname !== "animalBtn") setdisplay("none");
    });

    return window.removeEventListener("click", (e) => {
      if (e.target.dataset.classname !== "animalBtn") setdisplay("none");
    });
  }, []);

  if (!animalsData) {
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
      <Container>
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
        <button onClick={submit}>submit</button>
      </Container>
      <PopopDiv style={{ display: dispaly }}>
        {
          <AnimalsItemBlock>
            {animalsData.map((animal) =>
              showItem === animal.Location && !animal.Favorite ? (
                <AnimalContent
                  data-classname="animalBtn"
                  key={animal.Name_Ch}
                  onClick={showMyGeo}
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
