import React from "react";
import { useDispatch } from "react-redux";
import * as action from "../../../../Redux/Action";
import styled from "styled-components";

const SelectorDiv = styled.div`
  display: flex;
  margin: 30px 0;
  flex-direction: row;
  flex-wrap: wrap;
  @media (max-width: 576px) {
    margin: 10px 0 10px;
  }
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
export default function Selector(props) {
  const { getAllFacilities } = props;
  const dispatch = useDispatch();
  const getCatalogs = () => {
    const set = new Set();
    const catalogs = getAllFacilities.filter((item) =>
      !set.has(item.Item) ? set.add(item.Item) : false
    );
    return catalogs;
  };
  const handleInputClick = (e) => {
    if (e.target.checked) {
      dispatch(action.addFacility(e.target.id));
    }
    if (!e.target.checked) {
      dispatch(action.removeFacility(e.target.id));
    }
  };
  const catalogs = getCatalogs();
  return (
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
  );
}
