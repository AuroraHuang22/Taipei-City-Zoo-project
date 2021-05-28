const ADD_ANIMAL = "ADD_ANIMAL";
const ADD_ROUTE = "ADD_ROUTE";
const REMOVE_ANIMAL = "REMOVE_ANIMAL";
const REMOVE_ALL_ANIMALS = "REMOVE_ALL_ANIMALS";
const ADD_CONFORMATION = "ADD_CONFORMATION";
const ADD_RECOMMEND = "ADD_RECOMMEND";
const BACK_TO_SELECT_ANIMAL = "BACK_TO_SELECT_ANIMAL";
const GO_TO_NEXTSTEP = "GO_TO_NEXTSTEP";
const REMOVE_ROUTE = "REMOVE_ROUTE";

const initState = {
  showAnimals: { geo: [], num: [] },
  visitRoute: [],
  conformation: "",
  heightLight: "",
  recommend: "",
  displayforAnimalSelect: false,
  disPlayforFacility: false,
};

export default function AnimalsReducer(state = initState, action) {
  switch (action.type) {
    case ADD_ANIMAL:
      return {
        ...state,
        showAnimals: {
          geo: [...state.showAnimals.geo, action.geo],
          num: [...state.showAnimals.num, action.num],
        },
      };
    case ADD_ROUTE:
      return {
        ...state,
        visitRoute: [...state.visitRoute, ...action.route],
      };
    case REMOVE_ANIMAL:
      let geos = state.showAnimals.geo.map((fac) => fac);
      let index = geos.indexOf(action.geo);
      geos.splice(index, 1);
      let nums = state.showAnimals.num.map((fac) => fac);
      let index1 = nums.indexOf(action.geo);
      nums.splice(index1, 1);
      return {
        ...state,
        showAnimals: {
          geo: [...geos],
          num: [...nums],
        },
      };
    case REMOVE_ALL_ANIMALS:
      return {
        ...state,
        showAnimals: {
          geo: [],
          num: [],
        },
      };
    case REMOVE_ROUTE:
      return {
        ...state,
        showAnimals: {
          geo: [],
          num: [],
        },
        visitRoute: [],
        recommend: "",
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
    case BACK_TO_SELECT_ANIMAL:
      return {
        ...state,
        displayforAnimalSelect: true,
      };
    case GO_TO_NEXTSTEP:
      return {
        ...state,
        disPlayforFacility: true,
      };
    default:
      return state;
  }
}
