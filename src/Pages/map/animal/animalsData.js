import React, { useState, useEffect, useMemo } from "react";

const AnimalsData = (prop) => {
  const [animalsData, setAnimalsData] = useState(null);

  useEffect(() => {
    prop.animal.then((data) => {
      setAnimalsData(data);
    });
  }, []);

  return null;
};

export default AnimalsData;
