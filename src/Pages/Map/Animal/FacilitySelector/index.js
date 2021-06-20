import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as firestore from "../../../../Utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../../../Redux/Action";
import * as toast from "../../../../Utils/toast";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Selector from "./Selector";

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
export default function FacilitySelector(props) {
  const [getAllFacilities, setGetAllFacilities] = useState(undefined);
  const animalsStore = useSelector((state) => state.AnimalsReducer.showAnimals);
  const disPatch = useDispatch();
  const { uid } = props;
  const displayDiv = useSelector(
    (state) => state.AnimalsReducer.disPlayforFacility
  );

  const backToSelect = () => {
    disPatch(action.backToSelectAnimal());
    window.location.href = "/map";
  };

  const printMap = () => {
    let geoarray = animalsStore.geo.map((element) => {
      return `${element[0]},${element[1]}`;
    });
    let numarray = animalsStore.num.map((element) => {
      return element;
    });
    firestore.firebaseAddSaved(uid, geoarray, numarray);
    toast.success(({ closeToast }) => (
      <div className="toast">
        已將行程儲存至
        <Link className="alink" to="/member/saved">
          我的行程
        </Link>
      </div>
    ));
  };
  useEffect(() => {
    setGetAllFacilities(props.facilities);
  }, [props.facilities]);
  if (!getAllFacilities) {
    return null;
  }
  return (
    <Container style={{ display: displayDiv }}>
      <div className="header">地圖上要顯示哪些設施呢？</div>
      <Selector getAllFacilities={getAllFacilities} />
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
}
