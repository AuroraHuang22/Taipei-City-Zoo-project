const ADD_FACILITY = "ADD_FACILITY";
const REMOVE_FACILITY = "REMOVE_FACILITY";

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
