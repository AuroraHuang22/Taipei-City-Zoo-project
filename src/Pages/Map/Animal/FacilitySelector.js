import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as firestore from "../../../Utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../Redux/Action";
import { ToastContainer, toast, Flip, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SelectorDiv = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: row;
  flex-wrap: wrap;
`;
const InputDivs = styled.div`
  border: 1px solid lightgray;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 5px 5px;
  padding: 3px 5px;
  border-radius: 10px;
`;
const InputElement = styled.input``;
const LableElement = styled.label`
  font-size: 5px;
  font-family: "Poppins", sans-serif, Arial, Helvetica, sans-serif;
  white-space: nowrap;
`;

const Selector = (props) => {
  const [getAllFacilities, setGetAllFacilities] = useState([]);
  const [displayDiv, setDisplayDiv] = useState("none");
  const animalsStore = useSelector((state) => state.AnimalsReducer.showAnimals);
  const disPatch = useDispatch();
  const uid = props.uid;

  let success = (message) =>
    toast.success(message, {
      autoClose: 1500,
      position: toast.POSITION.TOP_CENTER,
      hideProgressBar: true,
      style: {
        opacity: 0.9,
        backgroundColor: "#e5f7e0",
        color: "#4f6e59",
        fontWeight: 400,
      },
      transition: Flip,
    });

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
    success("已將行程儲存至探索護照");
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
    <div style={{ display: displayDiv }}>
      <h3>地圖上要顯示哪些設施呢？</h3>
      <SelectorDiv>
        {catalogs.map((item, index) => (
          <InputDivs key={`${item.Location}${index}`}>
            <InputElement
              id={item.Item}
              type="checkBox"
              data-type="checkBox"
              onChange={handleInputClick}
            />
            <LableElement htmlFor={item.Item}>{item.Item}</LableElement>
          </InputDivs>
        ))}
      </SelectorDiv>
      <button onClick={backToSelect}>重新選擇動物</button>
      {uid ? <button onClick={printMap}>儲存行程</button> : null}
    </div>
  );
};

export default Selector;
