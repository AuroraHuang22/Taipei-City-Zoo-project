import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as action from "../../../Redux/Action";
import Select, { components } from "react-select";

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
      white-space: nowrap;
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
  @media (max-width: 768px) {
    .container {
      box-sizing: border-box;
      position: relative;
      width: 100%;
      overflow-x: hidden;
      .filterBg {
        width: 100%;
        object-position: center;
      }
      .header {
        position: absolute;
        top: 40%;
        left: 50%;
        font-size: 36px;
        color: white;
      }
      .sub-header {
        margin-top: 50px;
        margin-left: 40px;
        font-size: 18px;
      }
    }
    .flex {
      box-sizing: border-box;
      width: 100%;
      display: flex;
      flex-direction: column-reverse;
      margin: 0 auto;
      padding: 0 30px;
      justify-content: center;
      align-items: flex-start;
      .filterBlock {
        display: flex;
        margin-top: 30px;
        flex-direction: column;
        justify-content: center;
        width: 100%;
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
      }
      .textBlock {
        box-sizing: border-box;
        margin-top: 10px;
        .h1 {
          font-size: 28px;
          white-space: nowrap;
        }
        .h3 {
          font-size: 20px;
          white-space: nowrap;
        }
      }
    }
  }
  @media (max-width: 576px) {
    .container {
      position: relative;
      width: 100%;
      overflow-x: hidden;
      .filterBg {
        width: 120%;
        object-position: center;
      }
      .header {
        position: absolute;
        top: 30%;
        left: 50%;
        font-size: 28px;
        color: white;
      }
      .sub-header {
        margin-top: 40px;
        margin-left: 0px;
        font-size: 16px;
      }
    }
    .flex {
      padding: 20px 20px 0;
      .filterBlock {
        width: 100%;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .searchBox {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .searchimg {
          width: 20px;
          align-self: flex-end;
          padding-bottom: 10px;
          margin-right: 10px;
        }
      }
      .textBlock {
        margin-left: 0px;
        display: flex;
        width: 30%;
        flex-direction: column;
        color: #5f5c90;
        letter-spacing: 2px;
        .h1 {
          font-size: 24px;
        }
        .h3 {
          font-size: 16px;
        }
      }
    }
  }
`;

export default function Filter() {
  const disPatch = useDispatch();
  const [selectPlace, setSelectPlace] = useState("動物園裡");
  const [Input, setInput] = useState("請輸入關鍵字...");
  const option = [];
  const { Option } = components;
  let showAnimals = [];

  const set = new Set();
  const place = AnimalsJson.filter((item) =>
    !set.has(item.Location) ? set.add(item.Location) : false
  ).map((item) => item.Location);

  const handleChange = (value) => {
    setSelectPlace(value.value);
    let recom = AnimalsJson.filter((item) => item.Location === value.value);
    if (value.value !== "動物園裡") {
      setInput(`也許你想認識：${recom[0].Name_Ch}`);
      disPatch(action.addFilterPlace(value.value));
      disPatch(action.addFilterSearch(""));
    } else {
      setInput("請輸入關鍵字...");
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
    disPatch(action.addFilterPlace(""));
  }, []);

  place.forEach((item) => {
    let arr5 = [];
    AnimalsJson.forEach((animal) => {
      if (item === animal.Location) {
        arr5.push(animal.Name_Ch);
      }
    });
    option.push({ value: item, label: item, num: arr5.length });
  });
  option.push({ value: "動物園裡", label: "全部動物", num: 270 });

  if (selectPlace !== "動物園裡") {
    let arr = AnimalsJson.filter((item) =>
      item.Location.includes(selectPlace)
    ).map((item) => item.Name_Ch);
    arr.forEach((item) => showAnimals.push({ value: item, label: item }));
  } else {
    AnimalsJson.forEach((item) =>
      showAnimals.push({ value: item.Name_Ch, label: item.Name_Ch })
    );
  }

  const spanOption = (props) => (
    <Option {...props}>
      <span style={{ display: "inline-block" }}>{props.data.label}</span>
      <span
        style={{
          display: "inline-block",
          backgroundColor: "#f2f2f2",
          padding: "1px 10px",
          borderRadius: "25px",
          position: "absolute",
          right: "15px",
        }}
      >
        {props.data.num}
      </span>
    </Option>
  );

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
            defaultValue={option[14]}
            options={option}
            onChange={handleChange}
            components={{ Option: spanOption }}
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
                width: "100%",

                "&:hover": {
                  backgroundColor: "#f7e2dc",
                },
              }),
            }}
          />
          <div className="searchBox">
            <img className="searchimg" src="/Imgs/loupe.svg" alt="search" />
            <Select
              className="searchInput"
              value={Input}
              placeholder={Input}
              options={showAnimals}
              onChange={handleInputChange}
              components={{ search }}
              width="100%"
              noOptionsMessage={() => "試試別的關鍵字吧！"}
              styles={{
                option: (provided, state) => ({
                  ...provided,
                  borderBottom: "1px solid #ffeae4",
                  color: "#6b6b6b",
                  padding: "20px",
                  backgroundColor: state.isSelected ? "#f5c2b4" : "white",
                  "&:hover": {
                    backgroundColor: "#f7e2dc",
                  },
                }),
                control: (provided, state) => ({
                  ...provided,
                  boxSizing: "border-box",
                  position: "relative",
                  border: "none",
                  borderBottom: "2px solid #f7e2dc",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "white",
                  },
                  marginTop: "10px",
                  width: "50vw",
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
                input: (provided, state) => ({
                  ...provided,
                  width: "100%",
                }),
              }}
            />
          </div>
          <div />
        </div>
        <div className="textBlock">
          <span className="h3">我想探索 —</span>
          <span className="h1 ">{selectPlace}的...</span>
        </div>
      </div>
    </FilterContainer>
  );
}
