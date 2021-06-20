import { getAllLabel, filterAnimalsOfPlace } from "./FilterAnimals";

it("get all labels", () => {
  expect(getAllLabel()).toEqual([
    { label: "新光特展館(大貓熊館)", num: 1, value: "新光特展館(大貓熊館)" },
    { label: "企鵝館", num: 2, value: "企鵝館" },
    { label: "沙漠動物區", num: 4, value: "沙漠動物區" },
    { label: "熱帶雨林區", num: 19, value: "熱帶雨林區" },
    {
      label: "熱帶雨林室內館(穿山甲館)",
      num: 27,
      value: "熱帶雨林室內館(穿山甲館)",
    },
    { label: "鳥園區", num: 66, value: "鳥園區" },
    { label: "溫帶動物區", num: 12, value: "溫帶動物區" },
    { label: "兒童動物區", num: 9, value: "兒童動物區" },
    { label: "兩棲爬蟲動物館", num: 45, value: "兩棲爬蟲動物館" },
    { label: "昆蟲館", num: 47, value: "昆蟲館" },
    { label: "非洲動物區", num: 21, value: "非洲動物區" },
    { label: "臺灣動物區", num: 16, value: "臺灣動物區" },
    { label: "無尾熊館", num: 1, value: "無尾熊館" },
    { label: "澳洲動物區", num: 3, value: "澳洲動物區" },
    { label: "全部動物", num: 270, value: "動物園裡" },
  ]);
});

it("get animals data", () => {
  expect(filterAnimalsOfPlace("無尾熊館")).toEqual([
    { value: "無尾熊", label: "無尾熊" },
  ]);
});
