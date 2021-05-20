import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import * as action from "../../../Redux/actions";

const Container = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ItemBlock = styled.div`
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
`;

const AnimalContent = styled.div`
  border: 1px solid lightgray;
  margin: 5px 5px;
  padding: 3px 5px;
  border-radius: 10px;
`;

let pavilionsArray = [];

const AnimalsData = (prop) => {
  const disPatch = useDispatch();
  const [animalsData, setAnimalsData] = useState(null);
  let routeData = prop.route;

  const showMyGeo = (e) => {
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

    disPatch(action.addRoute(result));
  };

  useEffect(() => {
    setAnimalsData(prop.animal);
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
    <Container>
      <button onClick={submit}>submit</button>
      {catalogs.map((item, index) => (
        <ItemBlock key={`${index}858`}>
          {item}
          <AnimalsItemBlock key={`${index}88`}>
            {animalsData.map((animal) =>
              item === animal.Location ? (
                <AnimalContent
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
        </ItemBlock>
      ))}
    </Container>
  );
};

export default AnimalsData;
