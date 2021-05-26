const getParks = async () => {
  const response = await fetch(
    `https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_alldesc.json`
  );
  return await response.json();
};

const getParksStatus = async () => {
  const response = await fetch(
    `https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_allavailable.json`
  );
  return await response.json();
};

export { getParks, getParksStatus };
