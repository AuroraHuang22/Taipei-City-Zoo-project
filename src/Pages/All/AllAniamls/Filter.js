import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as action from "../../../Redux/Action";
import Select from "react-select";

import styled from "styled-components";
import AnimalsJson from "../../../Utils/animals.json";

const FilterContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  .container {
    position: relative;
    width: 100%;
    .filterBg {
      width: 100%;
    }
    .header {
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 48px;
      color: white;
    }
    .sub-header {
      margin-top: 70px;
      margin-left: 40px;
      font-size: 28px;
    }
  }
  .flex {
    width: 100%;
    display: flex;
    flex-direction: row;
    max-width: 1480px;
    margin: 0 auto;
    justify-content: center;
    align-items: baseline;
    .filterBlock {
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .searchBox {
      width: 100%;
      display: flex;
      align-items: center;
      .searchimg {
        width: 20px;
        align-self: flex-end;
        padding-bottom: 10px;
      }
    }
    .textBlock {
      margin-left: 40px;
      display: flex;
      width: 30%;
      flex-direction: column;
      justify-content: center;
      color: #5f5c90;
      letter-spacing: 2px;

      .h1 {
        font-size: 28px;
      }
      .pl-30 {
        padding-left: 50px;
      }
      .grey {
        color: #c2c2c2;
      }

      .h3 {
        font-size: 20px;
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
`;

export default function Filter() {
  const disPatch = useDispatch();
  const [selectPlace, setSelectPlace] = useState("熱帶雨林室內館(穿山甲館)");
  const [Input, setInput] = useState("請輸入關鍵字...");
  const option = [];
  let showAnimals = [];
  const set = new Set();
  const place = AnimalsJson.filter((item) =>
    !set.has(item.Location) ? set.add(item.Location) : false
  ).map((item) => item.Location);

  const handleChange = (value) => {
    setSelectPlace(value.value);
    setInput("請輸入關鍵字...");
    if (value.value !== "動物園裡的") {
      disPatch(action.addFilterPlace(value.value));
      disPatch(action.addFilterSearch(""));
    } else {
      disPatch(action.addFilterPlace(""));
      disPatch(action.addFilterSearch(""));
    }
  };

  const handleInputChange = (value) => {
    disPatch(action.addFilterSearch(value.value));
    setInput(value.value);
  };

  const search = () => {
    return (
      <>
        <img className="searchimg" src="/Imgs/loupe.svg" alt="search" />
      </>
    );
  };

  useEffect(() => {
    disPatch(action.addFilterPlace("熱帶雨林室內館(穿山甲館)"));
  }, []);

  place.forEach((item) => option.push({ value: item, label: item }));
  option.push({ value: "動物園裡的", label: "全部動物" });

  if (selectPlace !== "動物園裡的") {
    let arr = AnimalsJson.filter((item) =>
      item.Location.includes(selectPlace)
    ).map((item) => item.Name_Ch);
    arr.forEach((item) => showAnimals.push({ value: item, label: item }));
  } else {
    AnimalsJson.forEach((item) =>
      showAnimals.push({ value: item.Name_Ch, label: item.Name_Ch })
    );
  }

  return (
    <FilterContainer>
      <div className="container">
        <img className="filterBg" src="/Imgs/select-bg-22.svg" alt="hippo" />
        <div className="header">動物總覽</div>
        <div className="header sub-header">你喜歡的動物都在這！</div>
      </div>
      <div className="flex">
        <div className="filterBlock">
          <Select
            defaultValue={option[4]}
            options={option}
            onChange={handleChange}
            width="100%"
            styles={{
              option: (provided, state) => ({
                ...provided,
                borderBottom: "1px solid #ffeae4",
                color: "#6b6b6b",
                padding: 20,
                backgroundColor: state.isSelected ? "#f5c2b4" : "white",
                "&:hover": {
                  backgroundColor: "#f7e2dc",
                },
              }),
              indicatorSeparator: (provided, state) => ({
                ...provided,
                opacity: 0,
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
          <div className="searchBox">
            <img className="searchimg" src="/Imgs/loupe.svg" alt="search" />
            <Select
              id="search"
              value={Input}
              placeholder={Input}
              options={showAnimals}
              onChange={handleInputChange}
              components={{ search }}
              width="80%"
              styles={{
                option: (provided, state) => ({
                  ...provided,
                  borderBottom: "1px solid #ffeae4",
                  color: "#6b6b6b",
                  padding: 20,
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
                  marginTop: "30px",
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
                }),
              }}
            />
          </div>
          <div />
        </div>
        <div className="textBlock">
          <span className="h3">我想探索 —</span>
          <span className="h1 ">{selectPlace}</span>
          {Input !== "請輸入關鍵字..." ? (
            <span className="h3 grey">的 {Input}</span>
          ) : null}
        </div>
      </div>
    </FilterContainer>
  );
}
