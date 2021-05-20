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

const AnimalsData = (prop) => {
  const disPatch = useDispatch();
  const [animalsData, setAnimalsData] = useState(null);

  const showMyGeo = (e) => {
    disPatch(
      action.addAnimal([
        Number(e.target.dataset.lat),
        Number(e.target.dataset.lng),
      ])
    );
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
