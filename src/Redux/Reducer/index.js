import { combineReducers } from "redux";
import selectorReducer from "./selector";
import AnimalsReducer from "./animals";
import ExploreReducer from "./explore";
import FilterAnimals from "./filterAnimals";

export default combineReducers({
  selectorReducer,
  AnimalsReducer,
  ExploreReducer,
  FilterAnimals,
});
