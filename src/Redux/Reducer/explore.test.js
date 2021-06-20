import reducer from "./explore";

describe("explore reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      visitedAnimals: [],
    });
  });

  it("should handle ADD_VISITED", () => {
    expect(
      reducer(
        {
          visitedAnimals: [],
        },
        {
          type: "ADD_VISITED",
          name: "無尾熊",
        }
      )
    ).toEqual({
      visitedAnimals: ["無尾熊"],
    });
  });
});
