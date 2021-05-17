import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import * as action from "../../Redux/actions";

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
  const disPatch = useDispatch();
  const [getAllFacilities, setGetAllFacilities] = useState([]);

  const handleInputClick = (e) => {
    if (e.target.checked) {
      disPatch(action.addFacility(e.target.id));
    }
    if (!e.target.checked) {
      disPatch(action.removeFacility(e.target.id));
    }
  };

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

  return (
    <SelectorDiv>
      {catalogs.map((item) => (
        <InputDivs key={item.Index}>
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
  );
};

export default Selector;
