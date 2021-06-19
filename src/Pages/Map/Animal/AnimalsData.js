import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import * as reduxAction from "../../../Redux/Action";
import * as firestore from "../../../Utils/firebase";
import * as Toast from "../../../Utils/toast";
import "react-toastify/dist/ReactToastify.css";
// import Select, { components } from "react-select";

const ContainerDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 160px);
  .searchBox {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .favorite {
    font-size: 10px;
    font-weight: bold;
    border: 1px solid #acabbe;
    margin: 10px 5px 0px;
    padding: 10px 12px;
    border-radius: 10px;
    color: #acabbe;
    font-size: 14px;
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
  .draw {
    position: absolute;
    bottom: 20px;
    width: 60%;
    object-fit: contain;
    opacity: 0.1;
  }
  .btn {
    display: block;
    bottom: 0;
    width: 80%;
    padding: 12px;
    margin-top: auto;
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
  input {
    padding: 6px 18px;
    min-width: 320px;
    outline: none;
    border: none;
    border-radius: 25px;
    margin-right: 15px;
    background-color: inherit;
    border: 2px solid #f2f2f2;
    color: #f2f2f2;
    letter-spacing: 2px;
    font-size: 12px;
    font-weight: 500;
  }
  @media (max-width: 1024px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    height: 100%;
    justify-content: space-between;
    .sub-block {
      width: 80%;
      display: flex;
      flex-direction: column;
    }
    .favorite {
      margin: 0px 5px 0px;
      padding: 10px 12px;
    }
    .btn {
      position: fixed;
      bottom: 25px;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
    }
  }
  @media (max-width: 576px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: flex-start;
    height: 100%;
    justify-content: space-between;
    .sub-block {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    .favorite {
      margin: 0px 5px 0px;
      padding: 10px 12px;
    }
    .btn {
      position: fixed;
      bottom: 75px;
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
    }
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

let flag = false;
// let nowAnimals = [];

const AnimalsData = (prop) => {
  // const [open, setOpen] = useState(false);
  const [animalsData, setAnimalsData] = useState(null);
  const [favorities, setFavorities] = useState("none");
  const [savedData, setSaveData] = useState("none");
  // const [selectPlace, setSelectPlace] = useState("全部動物");
  const [dispalyContainer, setDispalyContainer] = useState("block");
  const dispatch = useDispatch();

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
  // const { Option } = components;

  // const handleChange = (value, { action }) => {
  //   switch (action) {
  //     case "select-option":
  //       setSelectPlace(value.value);
  //       setOpen(true);
  //       return;
  //     default:
  //       return;
  //   }
  // };

  // const handleInputChange = (inputValue, { action }) => {
  //   switch (action) {
  //     case "select-option":
  //       let index = inputValue.length - 1;
  //       animalsData.forEach((item) => {
  //         if (item.Name_Ch === inputValue[index].value) {
  //           dispatch(
  //             reduxAction.addAnimal([item.Geo[1], item.Geo[0]], item.CID)
  //           );
  //         }
  //       });

  //       nowAnimals = inputValue;
  //       return;
  //     case "remove-value":
  //       let removedAnimals = nowAnimals.filter(
  //         (i) => inputValue.findIndex((j) => j.value === i.value) === -1
  //       );
  //       nowAnimals = inputValue;
  //       animalsData.forEach((item) => {
  //         if (item.Name_Ch === removedAnimals[0].value) {
  //           dispatch(
  //             reduxAction.removeAnimal([item.Geo[1], item.Geo[0]], item.CID)
  //           );
  //         }
  //       });

  //       return;
  //     case "clear":
  //       window.location.reload();
  //       return;
  //     default:
  //       return;
  //   }
  // };

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
      dispatch(reduxAction.addRecommend(pavilionsSort));
      dispatch(reduxAction.addRoute(result));
      dispatch(reduxAction.gotoNextStep());
      setDispalyContainer("none");
    } else {
      Toast.alertMes("請先選擇至少一種想看的動物喔！");
    }
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
  }, [prop.animal, uid]);

  useEffect(() => {
    if (uid) {
      return firestore.firebaseGetSavedData(uid, (data) => setSaveData(data));
    }
  }, [uid]);

  useEffect(() => {
    if (displayStore) {
      setDispalyContainer("block");
    }
  }, [displayStore]);

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

      dispatch(reduxAction.removeAllAnimal());
      geoArray.forEach((item, index) =>
        dispatch(reduxAction.addAnimal(item, numArray[index]))
      );
      flag = true;
    }
  }, [dispatch, idValue, savedData]);

  if (flag) {
    submit();
  }

  if (!animalsData || favorities === undefined || favorities === "none") {
    return null;
  }

  // const option = FilterAnimals.getAllLabel();
  // const showAnimals = FilterAnimals.filterAnimalsOfPlace(selectPlace);

  // const groupLabel = (props) => (
  //   <Option {...props}>
  //     <span style={{ display: "inline-block" }}>{props.data.label}</span>
  //     <span
  //       style={{
  //         display: "inline-block",
  //         backgroundColor: "#f2f2f2",
  //         padding: "1px 10px",
  //         borderRadius: "25px",
  //         position: "absolute",
  //         right: "15px",
  //       }}
  //     >
  //       {props.data.num}
  //     </span>
  //   </Option>
  // );

  return (
    <>
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
            {/* <div>
              <Select
                defaultValue={option[14]}
                zi
                options={option}
                onChange={handleChange}
                components={{ Option: groupLabel }}
                width="100%"
                styles={{
                  option: (provided, state) => ({
                    ...provided,
                    borderBottom: "1px solid #ffeae4",
                    color: "#6b6b6b",
                    padding: 10,
                    backgroundColor: state.isSelected ? "#f5c2b4" : "white",
                    "&:hover": {
                      backgroundColor: "#f7e2dc",
                    },
                  }),
                  indicatorSeparator: (provided, state) => ({
                    ...provided,
                    opacity: 0,
                  }),
                  menu: (provided, state) => ({
                    ...provided,
                    zIndex: 980,
                  }),
                  control: (provided, state) => ({
                    ...provided,
                    padding: "10px 20px 10px 10px",
                    border: state.isFocused
                      ? "1px solid #dba99e"
                      : "1px solid #dba99e",
                    boxShadow: "none",
                    borderRadius: "15px",
                    "&:hover": {
                      backgroundColor: "#f7e2dc",
                    },
                  }),
                }}
              />
              <div>
                <Select
                  closeMenuOnSelect={true}
                  isMulti
                  isClearable
                  isSearchable
                  placeholder={"今天我想看..."}
                  options={showAnimals}
                  onChange={handleInputChange}
                  backspaceRemovesValue={false}
                  onFocus={() => {
                    setOpen(true);
                  }}
                  onBlur={() => {
                    setOpen(false);
                  }}
                  menuIsOpen={open}
                  width="80%"
                  styles={{
                    multiValue: (styles, { data }) => ({
                      ...styles,
                      padding: "2px 4px",
                      backgroundColor: "#f0ebea",
                      borderRadius: "20px",
                    }),
                    multiValueRemove: (styles, { data }) => ({
                      ...styles,
                      color: "8f8886",
                      ":hover": {
                        backgroundColor: "#d4cac8",
                        borderRadius: "10px",
                        color: "8f8886",
                      },
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      borderBottom: "1px solid #ffeae4",
                      color: "#6b6b6b",
                      padding: 10,
                      backgroundColor: state.isSelected ? "#f5c2b4" : "white",
                      "&:hover": {
                        backgroundColor: "#f7e2dc",
                      },
                    }),
                    control: (provided, state) => ({
                      ...provided,
                      position: "relative",
                      border: "none",
                      borderBottom: "2px solid #f7e2dc",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "white",
                      },
                      marginTop: "10px",
                    }),
                    dropdownIndicator: (provided, state) => ({
                      ...provided,
                      opacity: 0,
                    }),
                    indicatorSeparator: (provided, state) => ({
                      ...provided,
                      opacity: 0,
                    }),
                    menu: (provided, state) => ({
                      ...provided,
                      marginTop: "5px",
                      zIndex: 1200,
                    }),
                  }}
                />
              </div>
            </div> */}
          </div>
          <img className="draw" src="/Imgs/draw-11.svg" alt="find" />
          <button className="btn" onClick={submit}>
            下一步 選擇顯示設施
          </button>
        </ContainerDiv>
      </div>
    </>
  );
};

export default AnimalsData;
