import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reduxAction from "../../../../Redux/Action";
import * as firestore from "../../../../Utils/firebase";
import SelectGroup from "./SelectGroup";
import SubmitButton from "./SubmitButton";
import { ContainerDiv, AnimalsItemBlock, AnimalContent } from "./style";

const AnimalsData = (prop) => {
  const [animalsData, setAnimalsData] = useState(null);
  const [favorities, setFavorities] = useState();
  const [savedData, setSaveData] = useState();
  const dispatch = useDispatch();
  const dispalyContainer = useSelector(
    (state) => state.AnimalsReducer.displayforAnimalSelect
  );
  let { route, uid, animal } = prop;

  const showMyGeo = (e) => {
    if (e.target.style.backgroundColor !== "lightgrey") {
      e.target.style.backgroundColor = "lightgrey";
      dispatch(
        reduxAction.addAnimal(
          [Number(e.target.dataset.lat), Number(e.target.dataset.lng)],
          Number(e.target.dataset.num)
        )
      );
    } else {
      e.target.style.backgroundColor = "white";
      dispatch(
        reduxAction.removeAnimal(
          [Number(e.target.dataset.lat), Number(e.target.dataset.lng)],
          Number(e.target.dataset.num)
        )
      );
    }
  };

  useEffect(() => {
    setAnimalsData(animal);
    if (uid) {
      firestore
        .firebaseGetMemberData(uid)
        .then((data) => setFavorities(data.favorities));
    } else {
      setFavorities(false);
    }
  }, [animal, uid]);

  useEffect(() => {
    if (uid) {
      return firestore.firebaseGetSavedData(uid, (data) => setSaveData(data));
    }
  }, [uid]);

  if (!animalsData || favorities === undefined) {
    return null;
  }
  return (
    <div style={{ display: dispalyContainer }}>
      <ContainerDiv>
        <div className="header">想造訪哪些動物呢？</div>
        {favorities.length ? (
          <div className="sub-block">
            <div className="sub-header">
              從收藏清單將動物加入地圖!...或者...
            </div>
            <div className="favorite">
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
            </div>
          </div>
        ) : null}
        <div className="sub-block">
          <div className="sub-header">用關鍵字來搜尋想造訪的動物吧！</div>
          <SelectGroup animalsData={animalsData} />
        </div>
        <img className="draw" src="/Imgs/draw-11.svg" alt="find" />
        <SubmitButton
          animalsData={animalsData}
          routeData={route}
          savedData={savedData}
        />
      </ContainerDiv>
    </div>
  );
};

export default AnimalsData;
