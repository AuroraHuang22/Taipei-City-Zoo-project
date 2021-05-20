const ADD_ANIMAL = "ADD_ANIMAL";
const ADD_ROUTE = "ADD_ROUTE";
const REMOVE_ANIMAL = "REMOVE_ANIMAL";
const REMOVE_ALL_ANIMALS = "REMOVE_ALL_ANIMALS";

const initState = {
  showAnimalsGeo: [],
  visitRoute: [],
};

export default function AnimalsReducer(state = initState, action) {
  switch (action.type) {
    case ADD_ANIMAL:
      return {
        showAnimalsGeo: [...state.showAnimalsGeo, action.geo],
        visitRoute: [...state.visitRoute],
      };
    case ADD_ROUTE:
      return {
        showAnimalsGeo: [...state.showAnimalsGeo],
        visitRoute: [...state.visitRoute, ...action.route],
      };
    case REMOVE_ANIMAL:
      let arr = state.showAnimalsGeo.map((fac) => fac);
      let index = arr.indexOf(action.geo);
      arr.splice(index, 1);
      return {
        showAnimalsGeo: [...arr],
      };
    case REMOVE_ALL_ANIMALS:
      return {
        showAnimalsGeo: [],
      };
    default:
      return state;
  }
}
