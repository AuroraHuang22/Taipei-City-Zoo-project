import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-graphhopper";
import { MapConsumer } from "react-leaflet";

function Routing() {
  const [isReturn, setReturn] = useState(false);

  useEffect(() => {
    setReturn(true);
  }, []);

  if (!isReturn) {
    return null;
  }

  return (
    <MapConsumer>
      {(map) => {
        L.Routing.control({
          waypoints: [
            L.latLng(24.997437, 121.582858),
            L.latLng(24.996554, 121.583322),
            L.latLng(24.9957, 121.58440855),
            L.latLng(24.9950992, 121.58380791),
          ],
          router: L.Routing.graphHopper(
            "10db9b1c-434a-45d2-8dab-4cad12acc647",
            {
              urlParameters: {
                vehicle: "foot",
              },
            }
          ),
          lineOptions: {
            styles: [
              {
                color: "orange",
                opacity: 0.5,
                weight: 2,
              },
            ],
          },
          autoRoute: true,
          addWaypoints: false,
          draggableWaypoints: false,
          fitSelectedRoutes: false,
          showAlternatives: false,
        }).addTo(map);
        return null;
      }}
    </MapConsumer>
  );
}

export default Routing;
