import React from "react";
import L from "leaflet";
import { MapConsumer, ZoomControl } from "react-leaflet";
import { useSelector } from "react-redux";
import "leaflet-routing-machine";
import "lrm-graphhopper";

function Routing() {
  let wayPoints = [L.latLng([24.998485693740232, 121.58091476426509])];
  const routeStore = useSelector((state) => state.AnimalsReducer.visitRoute);
  const newIcon = new L.Icon({
    iconUrl: require(`../../../icons/like-03.svg`).default,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });

  if (!routeStore.length) {
    return null;
  }

  wayPoints.push(...routeStore.map((item) => L.latLng(item)));
  wayPoints.push(L.latLng([24.998855803322083, 121.58158481040921]));
  console.log(wayPoints);

  return (
    <MapConsumer>
      {(map) => {
        L.Routing.control({
          waypoints: wayPoints,
          router: L.Routing.graphHopper(
            "10db9b1c-434a-45d2-8dab-4cad12acc647",
            {
              urlParameters: {
                vehicle: "foot",
              },
            }
          ),
          createMarker: (iconindex, maps, total) => {
            if (iconindex === 0 || iconindex === total - 1) {
              return L.marker(maps.latLng, {
                icon: newIcon,
              });
            }
          },
          lineOptions: {
            styles: [
              {
                color: "orange",
                opacity: 0.5,
                weight: 2,
              },
            ],
          },
          missingRouteStyles: {
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
        }).addTo(map);

        return null;
      }}
    </MapConsumer>
  );
}

export default Routing;
