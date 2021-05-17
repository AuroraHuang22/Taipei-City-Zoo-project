const ADD_FACILITY = "ADD_FACILITY";
const REMOVE_FACILITY = "REMOVE_FACILITY";

const initState = {
  showFacilities: [],
};

export default function selectorReducer(state = initState, action) {
  switch (action.type) {
    case ADD_FACILITY:
      return {
        showFacilities: [...state.showFacilities, action.name],
      };
    case REMOVE_FACILITY:
      let arr = state.showFacilities.map((fac) => fac);
      let index = arr.indexOf(action.name);
      arr.splice(index, 1);
      return {
        showFacilities: [...arr],
      };
    default:
      return state;
  }
}
