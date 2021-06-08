import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../Redux/Action";
import * as firestore from "../../../Utils/firebase";
import { ToastContainer, toast, Flip, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "reactjs-popup";

const ContainerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .favorite {
    font-size: 10px;
    font-weight: bold;
    border: 1px solid #acabbe;
    margin: 10px 5px 0px;
    padding: 10px 12px;
    border-radius: 10px;
    color: #acabbe;
    font-size: 14px;
    /* background-color: #acabbe; */
    /* background-color: #c4c4cf; */
  }
  .header {
    font-size: 24px;
    color: #5f5c90;
    font-weight: 500;
    width: 100%;
  }
  .sub-header {
    width: 100%;
    font-size: 18px;
    color: #acabbe;
    font-weight: 500;
    text-align: left;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .btn {
    display: block;
    width: 80%;
    padding: 12px;
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: white;
    position: relative;
    font-size: 16px;
    border: 1px solid #acacac;
    border-radius: 25px;
    color: #acacac;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 18px;
    font-weight: 500;
    ::after {
      content: "→";
      opacity: 0;
      font-size: 18px;
      visibility: hidden;
      position: absolute;
      right: 50%;
      transition: all 0.3s;
    }
    :hover {
      border: 1px solid #ea7a60;
      background-color: white;
      color: #ea7a60;
      padding-right: 32px;
      ::after {
        opacity: 1;
        visibility: visible;
        right: 10%;
      }
    }
  }
`;

const ItemBlock = styled.div`
  font-size: 10px;
  font-weight: bold;
  margin: 12px 5px;
  padding: 3px 5px;
  border-radius: 10px;
  :hover {
    background-color: #fcfcfc;
  }
  .title {
    height: 35px;
  }
`;

const AnimalsItemBlock = styled.div`
  padding: 3px 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: grey;
  margin-top: 5px;
  .sub-header {
    width: 100%;
    font-size: 16px;
    color: #acabbe;
    font-weight: 500;
    text-align: left;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  .mt-0 {
    margin-top: 0;
  }
`;

const AnimalContent = styled.div`
  font-size: 14px;
  font-weight: normal;
  border: 1px solid lightgray;
  margin: 5px 5px;
  padding: 5px 12px;
  border-radius: 25px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s;
  :hover {
    background-color: #d2d2d6;
  }
`;

const MoreAnimals = styled(AnimalContent)`
  padding: 3px 5px;
  border-radius: 10px;
`;

let flag = false;

const AnimalsData = (prop) => {
  const [open, setOpen] = useState(false);
  const [showItem, setShowItem] = useState(null);
  const [animalsData, setAnimalsData] = useState(null);
  const [favorities, setFavorities] = useState("none");
  const [savedData, setSaveData] = useState("none");
  const [dispaly, setdisplay] = useState("none");
  const [dispalyContainer, setDispalyContainer] = useState("block");
  const disPatch = useDispatch();
  const closeModal = () => setOpen(false);

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

  let alertMes = (message) =>
    toast(message, {
      autoClose: 2500,
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      style: {
        opacity: 0.9,
        backgroundColor: "#faf9d7",
        color: "#827b60",
        fontWeight: 400,
      },
      transition: Bounce,
    });

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
      alertMes("請先選擇至少一種想看的動物喔！");
    }
  };
  const showMoreAnimals = (e) => {
    // setdisplay("block");
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
        <ContainerDiv>
          <div className="header">想造訪哪些動物呢？</div>
          {favorities ? (
            <>
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
            </>
          ) : null}
          <>
            <div className="sub-header">從館區挑選你想造訪的動物吧！</div>
            {catalogs.map((item, index) => (
              <ItemBlock key={`${index}858`}>
                <img
                  className="title"
                  src={`/Icons/label/${item}-33.svg`}
                  alt={item}
                />
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
                  {}
                  <MoreAnimals
                    data-classname="animalBtn"
                    onClick={() => {
                      setOpen(true);
                      showMoreAnimals(item);
                    }}
                  >
                    更多
                  </MoreAnimals>
                </AnimalsItemBlock>
              </ItemBlock>
            ))}
          </>
          <button className="btn" onClick={submit}>
            下一步 選擇顯示設施
          </button>
        </ContainerDiv>
      </div>
      <Popup
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
        overlayStyle={{ background: "rgba(0, 0, 0, 0.2)", zIndex: 1200 }}
        contentStyle={{
          margin: "auto",
          boxSizing: "border-box",
          background: "rgba(255, 255, 255, 0.8)",
          width: "80%",
          maxWidth: "600px",
          padding: "20px",
          borderRadius: "25px",
          position: "relative",
        }}
      >
        <AnimalsItemBlock>
          {showItem === "新光特展館(大貓熊館)" ||
          showItem === "企鵝館" ||
          showItem === "無尾熊館" ? (
            <div className="sub-header mt-0 ">這個館區沒有更多動物囉</div>
          ) : (
            animalsData.map((animal) =>
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
            )
          )}
        </AnimalsItemBlock>
      </Popup>
      <ToastContainer />
    </>
  );
};

export default AnimalsData;
