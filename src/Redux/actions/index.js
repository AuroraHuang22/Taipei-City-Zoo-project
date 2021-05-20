const ADD_FACILITY = "ADD_FACILITY";
const REMOVE_FACILITY = "REMOVE_FACILITY";
const ADD_ANIMAL = "ADD_ANIMAL";
const REMOVE_ANIMAL = "REMOVE_ANIMAL";
const REMOVE_ALL_ANIMALS = "REMOVE_ALL_ANIMALS";

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

export function addAnimal(geo) {
  return {
    type: ADD_ANIMAL,
    geo: geo,
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
