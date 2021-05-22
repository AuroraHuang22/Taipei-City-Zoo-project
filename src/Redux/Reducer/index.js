import { combineReducers } from "redux";
import selectorReducer from "./selector";
import AnimalsReducer from "./animals";

export default combineReducers({
  selectorReducer,
  AnimalsReducer,
});
