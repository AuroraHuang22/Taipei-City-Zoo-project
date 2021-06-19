const ADD_FACILITY = "ADD_FACILITY";
const REMOVE_FACILITY = "REMOVE_FACILITY";
const ADD_ANIMAL = "ADD_ANIMAL";
const REMOVE_ANIMAL = "REMOVE_ANIMAL";
const REMOVE_ALL_ANIMALS = "REMOVE_ALL_ANIMALS";
const ADD_ROUTE = "ADD_ROUTE";
const SET_SUBMIT = "SET_SUBMIT";
const ADD_CONFORMATION = "ADD_CONFORMATION";
const ADD_RECOMMEND = "ADD_RECOMMEND";
const ADD_VISITED = "ADD_VISITED";
const ADD_FILTERSEARCH = "ADD_FILTERSEARCH";
const ADD_FILTERPLACE = "ADD_FILTERPLACE";
const SET_SELECT_PLACE = "SET_SELECT_PLACE";
const REMOVE_FILTER = "REMOVE_FILTER";
const SET_POEN = "SET_POEN";
const SET_CLOSE = "SET_CLOSE";
const ADD_FAVORIATE = "ADD_FAVORIATE";
const REMOVE_FAVORIATE = "REMOVE_FAVORIATE";
const REMOVE_ROUTE = "REMOVE_ROUTE";
const GO_TO_NEXTSTEP = "GO_TO_NEXTSTEP";
const BACK_TO_SELECT_ANIMAL = "BACK_TO_SELECT_ANIMAL";
const SET_LOGIN_POEN = "SET_LOGIN_POEN";
const SET_LOGIN_CLOSE = "SET_LOGIN_CLOSE";
const SET_LOGIN = "SET_LOGIN";
const SET_LOGOUT = "SET_LOGOUT";

export function setLoginOpen() {
  return {
    type: SET_LOGIN_POEN,
  };
}
export function setLoginClose() {
  return {
    type: SET_LOGIN_CLOSE,
  };
}
export function setLogin() {
  return {
    type: SET_LOGIN,
  };
}

export function setLogout() {
  return {
    type: SET_LOGOUT,
  };
}
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
export function addAnimal(geo, num) {
  return {
    type: ADD_ANIMAL,
    geo: geo,
    num: num,
  };
}
export function addRoute(arr) {
  return {
    type: ADD_ROUTE,
    route: arr,
  };
}
export function setSubmit() {
  return {
    type: SET_SUBMIT,
  };
}
export function removeAnimal(geo, num) {
  return {
    type: REMOVE_ANIMAL,
    geo: geo,
    num: num,
  };
}
export function removeAllAnimal() {
  return {
    type: REMOVE_ALL_ANIMALS,
  };
}
export function addConformation(text) {
  return {
    type: ADD_CONFORMATION,
    text: text,
  };
}
export function addRecommend(text) {
  return {
    type: ADD_RECOMMEND,
    text: text,
  };
}
export function addVisited(name) {
  return {
    type: ADD_VISITED,
    name: name,
  };
}
export function addFilterSearch(name) {
  return {
    type: ADD_FILTERSEARCH,
    name: name,
  };
}

export function setSelectPlace(place) {
  return {
    type: SET_SELECT_PLACE,
    name: place,
  };
}

export function addFilterPlace(name) {
  return {
    type: ADD_FILTERPLACE,
    name: name,
  };
}
export function removeFilter() {
  return {
    type: REMOVE_FILTER,
  };
}
export function setOpen() {
  return {
    type: SET_POEN,
  };
}
export function setClose() {
  return {
    type: SET_CLOSE,
  };
}
export function addFavoriate(name) {
  return {
    type: ADD_FAVORIATE,
    name: name,
  };
}
export function removeFavoriate(name) {
  return {
    type: REMOVE_FAVORIATE,
    name: name,
  };
}
export function backToSelectAnimal() {
  return {
    type: BACK_TO_SELECT_ANIMAL,
  };
}
export function gotoNextStep() {
  return {
    type: GO_TO_NEXTSTEP,
  };
}
export function removeRoute() {
  return {
    type: REMOVE_ROUTE,
  };
}
