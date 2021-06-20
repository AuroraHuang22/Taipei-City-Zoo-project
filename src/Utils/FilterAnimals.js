import AnimalsJson from "./animals.json";

const getAllLabel = () => {
  const option = [];
  const set = new Set();
  const place = AnimalsJson.filter((item) =>
    set.has(item.Location) ? false : set.add(item.Location)
  ).map((item) => item.Location);

  place.forEach((item) => {
    let animalsOfPlace = AnimalsJson.filter(
      (animal) => item === animal.Location
    );
    option.push({ value: item, label: item, num: animalsOfPlace.length });
  });
  option.push({ value: "動物園裡", label: "全部動物", num: 270 });

  return option;
};

const filterAnimalsOfPlace = (selectPlace) => {
  const showAnimals = [];
  if (selectPlace !== "動物園裡") {
    let pavilion = AnimalsJson.filter((item) =>
      item.Location.includes(selectPlace)
    ).map((item) => item.Name_Ch);
    pavilion.forEach((item) => showAnimals.push({ value: item, label: item }));
  } else {
    AnimalsJson.forEach((item) =>
      showAnimals.push({ value: item.Name_Ch, label: item.Name_Ch })
    );
  }

  return showAnimals;
};

export { getAllLabel, filterAnimalsOfPlace };
