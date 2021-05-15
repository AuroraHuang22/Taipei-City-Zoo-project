import React, { useState, useEffect } from "react";
import styled from "styled-components";

const SelectorDiv = styled.div`
  display: flex;
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
  const [facilitiesData, setFacilitiesData] = useState([]);
  const [showFacilities, setShowFacilities] = useState([]);
  let unShowFacilities = [];

  const findUnShowFacilities = (arr1, arr2) => {
    unShowFacilities = [];
    for (let i = 0; i < arr2.length; i++) {
      var stra = arr2[i].Item;
      var count = 0;
      for (var j = 0; j < arr1.length; j++) {
        var strb = arr1[j][0];
        if (stra === strb) {
          count++;
        }
      }
      if (count === 0) {
        unShowFacilities.push(stra);
      }
    }
  };

  const checkChange = (e) => {
    if (e.target.checked) {
      localStorage.setItem(e.target.id, e.target.id);
    }
    if (!e.target.checked) {
      localStorage.removeItem(`${e.target.id}`);
    }
    let localData = Object.entries(localStorage);
    setShowFacilities(localData);
  };

  useEffect(() => {
    setShowFacilities(Object.entries(localStorage));
    props.facilities.then((data) => {
      setFacilitiesData(data);
    });
  }, []);

  if (!facilitiesData.length) {
    return null;
  } else if (facilitiesData.length) {
    const set = new Set();
    const result = facilitiesData.filter((item) =>
      !set.has(item.Item) ? set.add(item.Item) : false
    );
    findUnShowFacilities(showFacilities, result);
    if (showFacilities.length) {
      let show = showFacilities.map((storeData, index) => (
        <InputDivs key={storeData[0]}>
          <InputElement
            id={storeData[0]}
            type="checkBox"
            data-type="checkBox"
            onChange={checkChange}
            checked={true}
          />
          <LableElement htmlFor={storeData[0]}>{storeData[0]}</LableElement>
        </InputDivs>
      ));
      let unShow = unShowFacilities.map((facilities) => (
        <InputDivs key={facilities}>
          <InputElement
            id={facilities}
            type="checkBox"
            data-type="checkBox"
            onChange={checkChange}
            checked={false}
          />
          <LableElement htmlFor={facilities}>{facilities}</LableElement>
        </InputDivs>
      ));
      return (
        <SelectorDiv>
          {show}
          {unShow}
        </SelectorDiv>
      );
    } else {
      let inputs = result.map((item) => (
        <InputDivs key={item.Index}>
          <InputElement
            id={item.Item}
            type="checkBox"
            data-type="checkBox"
            onChange={checkChange}
          />
          <LableElement htmlFor={item.Item}>{item.Item}</LableElement>
        </InputDivs>
      ));
      return <SelectorDiv>{inputs}</SelectorDiv>;
    }
  }
};

export default Selector;
