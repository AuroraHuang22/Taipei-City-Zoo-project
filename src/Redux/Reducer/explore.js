const ADD_VISITED = "ADD_VISITED";

const initState = {
  visitedAnimals: [],
};

export default function ExploreReducer(state = initState, action) {
  switch (action.type) {
    case ADD_VISITED:
      return {
        ...state,
        visitedAnimals: [...state.visitedAnimals, action.name],
      };
    default:
      return state;
  }
}
