import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as action from "../../../Redux/Action";
import * as FilterAnimals from "../../../Utils/FilterAnimals";
import Select, { components } from "react-select";
import AnimalsJson from "../../../Utils/animals.json";
import { FilterContainer } from "./Filter-style";

export default function Filter() {
  const dispatch = useDispatch();
  const [selectPlace, setSelectPlace] = useState("動物園裡");
  const [Input, setInput] = useState("請輸入關鍵字...");
  const { Option } = components;

  const handleChange = (value) => {
    setSelectPlace(value.value);
    let recom = AnimalsJson.filter((item) => item.Location === value.value);
    if (value.value !== "動物園裡") {
      setInput(`也許你想認識：${recom[0].Name_Ch}`);
      dispatch(action.addFilterPlace(value.value));
      dispatch(action.addFilterSearch(""));
    } else {
      setInput("請輸入關鍵字...");
      dispatch(action.addFilterPlace(""));
      dispatch(action.addFilterSearch(""));
    }
  };
  const handleInputChange = (value) => {
    dispatch(action.addFilterSearch(value.value));
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
    dispatch(action.addFilterPlace(""));
  }, [dispatch]);

  const option = FilterAnimals.getAllLabel();
  const showAnimals = FilterAnimals.filterAnimalsOfPlace(selectPlace);
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
