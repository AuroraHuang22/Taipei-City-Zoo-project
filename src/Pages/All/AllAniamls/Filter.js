import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as action from "../../../Redux/Action";

import styled from "styled-components";
import AnimalsJson from "../../../Utils/animals.json";

const FilterContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
  .filterBg {
    width: 100%;
  }
  .container {
    box-sizing: border-box;
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    max-width: 1480px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    z-index: 300;
  }

  .drawBox {
    width: 30%;
    display: flex;
    box-sizing: border-box;
    padding: 10px 10px;
    justify-content: flex-end;
    align-items: flex-end;
    .draw {
      width: 100%;
      margin-left: -30px;
    }
  }

  .filterBlock {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .flex {
      position: relative;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin: 8px 0px;
      align-items: center;
    }
    .first::before {
      content: "New!";
      position: absolute;
      top: 50%;
      left: -40px;
      transform: translateY(-50%);
      font-size: 14px;
      font-weight: 600;
      color: yellow;
    }
  }
  select {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    padding: 6px 18px;
    min-width: 130px;
    outline: none;
    border: none;
    border-radius: 25px;
    background-color: #f2f2f2;
    color: #a5a4a3;
    letter-spacing: 2px;
    font-size: 10px;
    font-weight: 500;
  }
  .place {
    padding: 3px;
    border: 1px solid #f8f8c2;
    border-radius: 25px;
    margin-right: 15px;
  }
  option {
    border: none;
    outline: none;
    box-shadow: none;
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
    font-size: 10px;
    font-weight: 500;
  }
  input::placeholder {
    color: #f2f2f2;
  }
  button {
    padding: 4px 18px;
    outline: none;
    border: none;
    border-radius: 25px;
    margin-right: 15px;
    background-color: #f2f2f2;
    color: #fb7d62;
    letter-spacing: 2px;
    font-size: 10px;
    font-weight: 500;
  }
  .clear {
    background-color: #f09a8f;
    color: #f2f2f2;
  }
`;

export default function Filter() {
  const disPatch = useDispatch();
  let searchValue = "";

  const set = new Set();
  const place = AnimalsJson.filter((item) =>
    !set.has(item.Location) ? set.add(item.Location) : false
  ).map((item) => item.Location);

  const conservation = AnimalsJson.filter((item) =>
    !set.has(item.Conservation) ? set.add(item.Conservation) : false
  ).map((item) => item.Conservation);

  console.log(conservation);

  const type = AnimalsJson.filter((item) =>
    !set.has(item.Class) ? set.add(item.Class) : false
  ).map((item) => item.Class);
  useEffect(() => {
    disPatch(action.addFilterPlace("熱帶雨林室內館(穿山甲館)"));
  }, []);

  return (
    <FilterContainer>
      <img className="filterBg" src="/Imgs/filter-bg-07.svg" alt="filterBg" />
      <div className="container">
        <div className="drawBox">
          <img className="draw" src="Imgs/hippo-08.svg" alt="draw" />
        </div>
        <div className="filterBlock">
          <div className="flex first">
            <div className="place">
              <select
                onChange={(e) => {
                  if (e.target.value !== "全部動物") {
                    disPatch(action.addFilterPlace(e.target.value));
                  } else {
                    disPatch(action.addFilterPlace(""));
                  }
                }}
              >
                <option defaultValue="熱帶雨林室內館(穿山甲館)">
                  熱帶雨林室內館(穿山甲館)
                </option>
                {place.map((item) =>
                  item !== "熱帶雨林室內館(穿山甲館)" ? (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ) : null
                )}
                <option value="全部動物">全部動物</option>
              </select>
            </div>
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
          <div className="flex">
            <input
              type="text"
              placeholder="輸入關鍵字：ex.熊"
              onChange={(e) => {
                searchValue = e.target.value;
              }}
            ></input>
            <button
              onClick={() => {
                disPatch(action.addFilterSearch(searchValue));
              }}
            >
              送出
            </button>
            <button
              className="clear"
              onClick={() => {
                disPatch(action.removeFilter());
                window.location.reload();
              }}
            >
              清除條件
            </button>
          </div>
        </div>
      </div>
    </FilterContainer>
  );
}
