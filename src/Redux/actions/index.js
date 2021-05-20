const ADD_FACILITY = "ADD_FACILITY";
const REMOVE_FACILITY = "REMOVE_FACILITY";
const ADD_ANIMAL = "ADD_ANIMAL";
const REMOVE_ANIMAL = "REMOVE_ANIMAL";
const REMOVE_ALL_ANIMALS = "REMOVE_ALL_ANIMALS";
const ADD_ROUTE = "ADD_ROUTE";

export function addFacility(name) {
  return {
    type: ADD_FACILITY,
    name: name,
  };
}

export function removeFacility(name) {
  return {
    type: REMOVE_FACILITY,
    name: name,
  };
}
// 加動物錨點＆區域

export function addAnimal(geo) {
  return {
    type: ADD_ANIMAL,
    geo: geo,
  };
}

export function addRoute(arr) {
  return {
    type: ADD_ROUTE,
    route: arr,
  };
}

export function removeAnimal(geo) {
  return {
    type: REMOVE_ANIMAL,
    geo: geo,
  };
}

export function removeAllAnimal() {
  return {
    type: REMOVE_ALL_ANIMALS,
  };
}
