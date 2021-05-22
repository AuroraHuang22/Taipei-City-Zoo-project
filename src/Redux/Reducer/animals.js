const ADD_ANIMAL = "ADD_ANIMAL";
const ADD_ROUTE = "ADD_ROUTE";
const REMOVE_ANIMAL = "REMOVE_ANIMAL";
const REMOVE_ALL_ANIMALS = "REMOVE_ALL_ANIMALS";
const ADD_CONFORMATION = "ADD_CONFORMATION";
const ADD_RECOMMEND = "ADD_RECOMMEND";

const initState = {
  showAnimalsGeo: [],
  visitRoute: [],
  conformation: "",
  heightLight: "",
  recommend: "",
};

export default function AnimalsReducer(state = initState, action) {
  switch (action.type) {
    case ADD_ANIMAL:
      return {
        ...state,
        showAnimalsGeo: [...state.showAnimalsGeo, action.geo],
      };
    case ADD_ROUTE:
      return {
        ...state,
        visitRoute: [...state.visitRoute, ...action.route],
      };
    case REMOVE_ANIMAL:
      let arr = state.showAnimalsGeo.map((fac) => fac);
      let index = arr.indexOf(action.geo);
      arr.splice(index, 1);
      return {
        ...state,
        showAnimalsGeo: [...arr],
      };
    case REMOVE_ALL_ANIMALS:
      return {
        ...state,
        showAnimalsGeo: [],
      };
    case ADD_CONFORMATION:
      return {
        ...state,
        conformation: action.text,
      };
    case ADD_RECOMMEND:
      return {
        ...state,
        recommend: action.text,
      };
    default:
      return state;
  }
}
