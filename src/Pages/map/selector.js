import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createStore } from "redux";

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

// const initState = {
//   showFacilities: [Object.entries(localStorage)],
// };
// const ADD_FACILITY = "ADD_FACILITY";

// function addFacility(localstorageData) {
//   let allData = localstorageData.map((data) => data[0]);
//   return {
//     type: ADD_FACILITY,
//     data: allData,
//   };
// }

// function reducer(state = initState, action) {
//   switch (action.type) {
//     case ADD_FACILITY:
//       return {
//         showFacilities: [...action.data],
//       };
//     default:
//       return state;
//   }
// }

// const store = createStore(reducer);

const Selector = (props) => {
  const [getAllFacilities, setGetAllFacilities] = useState([]);
  const [showFacilities, setShowFacilities] = useState([]);
  let unShowFacilities = [];

  const findUnShowFacilities = (arr1, arr2) => {
    unShowFacilities = [];
    for (let i = 0; i < arr2.length; i++) {
      let stra = arr2[i].Item;
      let count = 0;
      for (let j = 0; j < arr1.length; j++) {
        let strb = arr1[j][0];
        if (stra === strb) {
          count++;
        }
      }
      if (count === 0) {
        unShowFacilities.push(stra);
      }
    }
  };

  const handleInputClick = (e) => {
    if (e.target.checked) {
      localStorage.setItem(e.target.id, e.target.id);
      // let localData = Object.entries(localStorage);
      // setShowFacilities(localData);
      // store.dispatch(addFacility(localData));
    }
    if (!e.target.checked) {
      localStorage.removeItem(`${e.target.id}`);
      // let localData = Object.entries(localStorage);
      // setShowFacilities(localData);
      // store.dispatch(addFacility(localData));
    }
    let localData = Object.entries(localStorage);
    setShowFacilities(localData);
    // window.location.reload();
  };

  useEffect(() => {
    setShowFacilities(Object.entries(localStorage));
  }, []);

  useEffect(() => {
    props.facilities.then((data) => {
      setGetAllFacilities(data);
    });
  }, []);

  if (!getAllFacilities.length) {
    return null;
  }

  const set = new Set();
  const catalogs = getAllFacilities.filter((item) =>
    !set.has(item.Item) ? set.add(item.Item) : false
  );
  findUnShowFacilities(showFacilities, catalogs);

  if (showFacilities.length) {
    let show = showFacilities.map((storeData) => (
      <InputDivs key={storeData[0]}>
        <InputElement
          id={storeData[0]}
          type="checkBox"
          data-type="checkBox"
          onChange={handleInputClick}
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
          onChange={handleInputClick}
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
    let inputs = catalogs.map((item) => (
      <InputDivs key={item.Index}>
        <InputElement
          id={item.Item}
          type="checkBox"
          data-type="checkBox"
          onChange={handleInputClick}
        />
        <LableElement htmlFor={item.Item}>{item.Item}</LableElement>
      </InputDivs>
    ));
    return <SelectorDiv>{inputs}</SelectorDiv>;
  }
};

export default Selector;
