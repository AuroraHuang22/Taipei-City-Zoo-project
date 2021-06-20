import { getParksStatus } from "./api";

describe("getParksData", () => {
  it("fetches successfully", async () => {
    const data = { data: [{ parkNum: 1, parkAvilible: 150 }] };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(data),
      })
    );
    await expect(getParksStatus()).resolves.toEqual(data);
  });
  it("fetches erroneously", async () => {
    const errorMessage = "Network Error";
    global.fetch = jest.fn(() => Promise.reject(new Error(errorMessage)));
    await expect(getParksStatus()).rejects.toThrow(errorMessage);
  });
});
