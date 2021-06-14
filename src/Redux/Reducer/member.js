const ADD_FAVORIATE = "ADD_FAVORIATE";
const REMOVE_FAVORIATE = "REMOVE_FAVORIATE";

const initState = {
  favorities: [],
};

export default function Member(state = initState, action) {
  switch (action.type) {
    case ADD_FAVORIATE:
      return {
        ...state,
        favorities: [...state.favorities, action.name],
      };
    case REMOVE_FAVORIATE:
      let arr = state.favorities.map((name) => name);
      let index = arr.indexOf(action.name);
      arr.splice(index, 1);
      return {
        ...state,
        favorities: [...arr],
      };
    default:
      return state;
  }
}
