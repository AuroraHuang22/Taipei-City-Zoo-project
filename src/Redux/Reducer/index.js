import { combineReducers } from "redux";
import selectorReducer from "./selector";
import AnimalsReducer from "./animals";
import ExploreReducer from "./explore";

export default combineReducers({
  selectorReducer,
  AnimalsReducer,
  ExploreReducer,
});
