import React, { useState } from "react";
import Select, { components } from "react-select";
import * as FilterAnimals from "../../../../Utils/FilterAnimals";
import * as reduxAction from "../../../../Redux/Action";
import { useDispatch } from "react-redux";

let nowAnimals = [];
export default function SelectGroup(props) {
  const { animalsData } = props;
  const [open, setOpen] = useState(false);
  const [selectPlace, setSelectPlace] = useState("動物園裡");
  const { Option } = components;
  const dispatch = useDispatch();

  const option = FilterAnimals.getAllLabel();
  const showAnimals = FilterAnimals.filterAnimalsOfPlace(selectPlace);

  const handleChange = (value, { action }) => {
    switch (action) {
      case "select-option":
        setSelectPlace(value.value);
        setOpen(true);
        return;
      default:
        return;
    }
  };
  const handleInputChange = (inputValue, { action }) => {
    switch (action) {
      case "select-option":
        let index = inputValue.length - 1;
        animalsData.forEach((item) => {
          if (item.Name_Ch === inputValue[index].value) {
            dispatch(
              reduxAction.addAnimal(
                [item.Geo[1], item.Geo[0]],
                Number(item.CID)
              )
            );
          }
        });

        nowAnimals = inputValue;
        return;
      case "remove-value":
        let removedAnimals = nowAnimals.filter(
          (i) => inputValue.findIndex((j) => j.value === i.value) === -1
        );
        nowAnimals = inputValue;
        animalsData.forEach((item) => {
          if (item.Name_Ch === removedAnimals[0].value) {
            dispatch(
              reduxAction.removeAnimal([item.Geo[1], item.Geo[0]], item.CID)
            );
          }
        });

        return;
      case "clear":
        window.location.reload();
        return;
      default:
        return;
    }
  };
  const groupLabel = (props) => (
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
  const handleClickEvent = (e) => {
    if (e.type === "focus") {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <div>
      <Select
        defaultValue={option[14]}
        options={option}
        onChange={handleChange}
        components={{ Option: groupLabel }}
        width="100%"
        styles={{
          option: (provided, state) => ({
            ...provided,
            borderBottom: "1px solid #ffeae4",
            color: "#6b6b6b",
            padding: 10,
            backgroundColor: state.isSelected ? "#f5c2b4" : "white",
            "&:hover": {
              backgroundColor: "#f7e2dc",
            },
          }),
          indicatorSeparator: (provided, state) => ({
            ...provided,
            opacity: 0,
          }),
          menu: (provided, state) => ({
            ...provided,
            zIndex: 1201,
          }),
          control: (provided, state) => ({
            ...provided,
            padding: "10px 20px 10px 10px",
            border: state.isFocused ? "1px solid #dba99e" : "1px solid #dba99e",
            boxShadow: "none",
            borderRadius: "15px",
            "&:hover": {
              backgroundColor: "#f7e2dc",
            },
          }),
        }}
      />
      <div>
        <Select
          closeMenuOnSelect={true}
          isMulti
          isClearable
          isSearchable
          placeholder={"今天我想看..."}
          options={showAnimals}
          onChange={handleInputChange}
          backspaceRemovesValue={false}
          onFocus={handleClickEvent}
          onBlur={handleClickEvent}
          menuIsOpen={open}
          width="80%"
          styles={{
            multiValue: (styles, { data }) => ({
              ...styles,
              padding: "2px 4px",
              backgroundColor: "#f0ebea",
              borderRadius: "20px",
            }),
            multiValueRemove: (styles, { data }) => ({
              ...styles,
              color: "8f8886",
              ":hover": {
                backgroundColor: "#d4cac8",
                borderRadius: "10px",
                color: "8f8886",
              },
            }),
            option: (provided, state) => ({
              ...provided,
              borderBottom: "1px solid #ffeae4",
              color: "#6b6b6b",
              padding: 10,
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
              backgroundColor: "none",
              marginTop: "10px",
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
              zIndex: 1200,
            }),
          }}
        />
      </div>
    </div>
  );
}
