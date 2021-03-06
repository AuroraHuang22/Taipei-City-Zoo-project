import { combineReducers } from "redux";
import SelectorReducer from "./selector";
import AnimalsReducer from "./animals";
import ExploreReducer from "./explore";
import FilterAnimals from "./filterAnimals";
import Member from "./member";
import Login from "./login";

export default combineReducers({
  SelectorReducer,
  AnimalsReducer,
  ExploreReducer,
  FilterAnimals,
  Member,
  Login,
});
