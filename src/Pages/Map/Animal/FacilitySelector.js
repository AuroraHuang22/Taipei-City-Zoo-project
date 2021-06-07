import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as firestore from "../../../Utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../Redux/Action";
import * as toast from "../../../Utils/toast";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  .header {
    font-size: 24px;
    color: #5f5c90;
    font-weight: 500;
    width: 100%;
  }
  .btn-group {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: start;
  }
  button {
    background-color: white;
    position: relative;
    font-size: 16px;
    margin: 0px 10px;
    border: 1px solid #acacac;
    padding: 4px 24px;
    border-radius: 25px;
    color: #acacac;
    margin-bottom: 12px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .remove {
    background-color: #f1efef;
    color: #acacac;
    ::before {
      content: "⏎";
      opacity: 0;
      font-size: 18px;
      visibility: hidden;
      position: absolute;
      left: 50%;
      transition: all 0.3s;
    }
    :hover {
      background-color: #b5b5b9;
      color: white;
      padding-left: 48px;
      ::before {
        opacity: 1;
        visibility: visible;
        left: 10%;
        color: white;
      }
    }
  }
  .save {
    color: #ea7a60;
    border: 1px solid #ea7a60;
    :hover {
      background-color: #ea7a60;
      color: white;
    }
  }
`;

const SelectorDiv = styled.div`
  display: flex;
  margin: 30px 0;
  flex-direction: row;
  flex-wrap: wrap;
`;
const InputDivs = styled.div`
  border: 1px solid lightgray;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 8px 5px;
  padding: 5px 12px;
  border-radius: 25px;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  input[type="checkbox"] {
    margin-right: 8px;
  }
  label {
    cursor: pointer;
    font-size: 16px;
  }
  :hover {
    background-color: #fcfcfc;
  }
`;

const Selector = (props) => {
  const [getAllFacilities, setGetAllFacilities] = useState([]);
  const [displayDiv, setDisplayDiv] = useState("none");
  const animalsStore = useSelector((state) => state.AnimalsReducer.showAnimals);
  const disPatch = useDispatch();
  const uid = props.uid;

  const displayStore = useSelector(
    (state) => state.AnimalsReducer.disPlayforFacility
  );

  const handleInputClick = (e) => {
    if (e.target.checked) {
      disPatch(action.addFacility(e.target.id));
    }
    if (!e.target.checked) {
      disPatch(action.removeFacility(e.target.id));
    }
  };

  const backToSelect = () => {
    setDisplayDiv("none");
    disPatch(action.backToSelectAnimal());
    window.location.href = "/map";
  };

  const printMap = () => {
    let geoarray = [];
    animalsStore.geo.forEach((element) => {
      geoarray.push(`${element[0]},${element[1]}`);
    });
    let numarray = [];
    animalsStore.num.forEach((element) => {
      numarray.push(element);
    });
    firestore.firebaseAddSaved(uid, geoarray, numarray);
    toast.success("已將行程儲存至探索護照");
  };

  useEffect(() => {
    if (displayStore) {
      setDisplayDiv("block");
    }
  }, [displayStore]);

  useEffect(() => {
    setGetAllFacilities(props.facilities);
  }, []);

  if (!getAllFacilities.length) {
    return null;
  }
  const set = new Set();
  const catalogs = getAllFacilities.filter((item) =>
    !set.has(item.Item) ? set.add(item.Item) : false
  );

  return (
    <Container style={{ display: displayDiv }}>
      <div className="header">地圖上要顯示哪些設施呢？</div>
      <SelectorDiv>
        {catalogs.map((item, index) => (
          <InputDivs key={`${item.Location}${index}`}>
            <input
              className="input"
              id={item.Item}
              type="checkBox"
              data-type="checkBox"
              onChange={handleInputClick}
            />
            <label htmlFor={item.Item}>{item.Item}</label>
          </InputDivs>
        ))}
      </SelectorDiv>
      <div className="btn-group">
        <button className="remove" onClick={backToSelect}>
          重新選擇動物
        </button>
        {uid ? (
          <button className="save" onClick={printMap}>
            儲存行程
          </button>
        ) : null}
      </div>
    </Container>
  );
};

export default Selector;
