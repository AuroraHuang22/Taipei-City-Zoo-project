import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as action from "../../../Redux/Action";

import styled from "styled-components";
import AnimalsJson from "../../../Utils/animals.json";

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 45px 0px 90px;
  background-color: lightgrey;
`;

export default function Filter() {
  const disPatch = useDispatch();
  let searchValue = "";

  const set = new Set();
  const place = AnimalsJson.filter((item) =>
    !set.has(item.Location) ? set.add(item.Location) : false
  ).map((item) => item.Location);

  const type = AnimalsJson.filter((item) =>
    !set.has(item.Class) ? set.add(item.Class) : false
  ).map((item) => item.Class);
  return (
    <FilterContainer>
      <div className="search">
        <input
          type="text"
          placeholder="SEARCH"
          onChange={(e) => {
            searchValue = e.target.value;
          }}
        ></input>
        <button
          onClick={() => {
            disPatch(action.addFilterSearch(searchValue));
          }}
        >
          submit
        </button>
      </div>
      <div className="placeGroup">
        <select
          onChange={(e) => {
            if (e.target.value !== "以園區搜尋") {
              disPatch(action.addFilterPlace(e.target.value));
            } else {
              disPatch(action.addFilterPlace(""));
            }
          }}
        >
          <option defaultValue="">以園區搜尋</option>
          {place.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="typeGroup">
        <select
          onChange={(e) => {
            if (e.target.value !== "以綱搜尋") {
              disPatch(action.addFilterType(e.target.value));
            } else {
              disPatch(action.addFilterType(""));
            }
          }}
        >
          <option defaultValue="">以綱搜尋</option>
          {type.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="clear">
        <button
          onClick={() => {
            disPatch(action.removeFilter());
            window.location.reload();
          }}
        >
          clear
        </button>
      </div>
    </FilterContainer>
  );
}
