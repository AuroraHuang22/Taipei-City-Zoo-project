const ADD_FACILITY = "ADD_FACILITY";
const REMOVE_FACILITY = "REMOVE_FACILITY";
const ADD_ANIMAL = "ADD_ANIMAL";
const REMOVE_ANIMAL = "REMOVE_ANIMAL";
const REMOVE_ALL_ANIMALS = "REMOVE_ALL_ANIMALS";
const ADD_ROUTE = "ADD_ROUTE";
const ADD_CONFORMATION = "ADD_CONFORMATION";
const ADD_RECOMMEND = "ADD_RECOMMEND";
const ADD_VISITED = "ADD_VISITED";
const ADD_FILTERSEARCH = "ADD_FILTERSEARCH";
const ADD_FILTERTYPE = "ADD_FILTERTYPE";
const ADD_FILTERPLACE = "ADD_FILTERPLACE";
const REMOVE_FILTER = "REMOVE_FILTER";

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
// 加動物錨點＆區域

export function addAnimal(geo) {
  return {
    type: ADD_ANIMAL,
    geo: geo,
  };
}

export function addRoute(arr) {
  return {
    type: ADD_ROUTE,
    route: arr,
  };
}

export function removeAnimal(geo) {
  return {
    type: REMOVE_ANIMAL,
    geo: geo,
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

export function addFilterType(name) {
  return {
    type: ADD_FILTERTYPE,
    name: name,
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
