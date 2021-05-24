const ADD_FILTERSEARCH = "ADD_FILTERSEARCH";
const ADD_FILTERTYPE = "ADD_FILTERTYPE";
const ADD_FILTERPLACE = "ADD_FILTERPLACE";
const REMOVE_FILTER = "REMOVE_FILTER";

const initState = {
  search: "",
  type: "",
  place: "",
};

export default function FilterAnimals(state = initState, action) {
  switch (action.type) {
    case ADD_FILTERSEARCH:
      return {
        ...state,
        search: action.name,
      };
    case ADD_FILTERTYPE:
      return {
        ...state,
        type: action.name,
      };
    case ADD_FILTERPLACE:
      return {
        ...state,
        place: action.name,
      };
    case REMOVE_FILTER:
      return {
        search: "",
        type: "",
        place: "",
      };
    default:
      return state;
  }
}
