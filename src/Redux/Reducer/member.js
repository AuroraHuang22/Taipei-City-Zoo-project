const ADD_FAVORIATE = "ADD_FAVORIATE";
const REMOVE_FAVORIATE = "REMOVE_FAVORIATE";

const initState = {
  favoriaties: [],
};

export default function Member(state = initState, action) {
  switch (action.type) {
    case ADD_FAVORIATE:
      return {
        ...state,
        favoriaties: [...state.favoriaties, action.name],
      };
    case REMOVE_FAVORIATE:
      let arr = state.favoriaties.map((name) => name);
      let index = arr.indexOf(action.name);
      arr.splice(index, 1);
      return {
        ...state,
        favoriaties: [...arr],
      };
    default:
      return state;
  }
}
