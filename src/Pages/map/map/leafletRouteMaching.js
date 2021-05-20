import React from "react";
import L from "leaflet";
import { MapConsumer } from "react-leaflet";
import { useSelector } from "react-redux";
import "leaflet-routing-machine";
import "lrm-graphhopper";

function Routing() {
  const store = useSelector((state) => state.AnimalsReducer.showAnimalsGeo);

  const newIcon = new L.Icon({
    iconUrl: require(`../../../icons/like-03.svg`).default,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
  if (!store.length) {
    return null;
  }

  return (
    <MapConsumer>
      {(map) => {
        L.Routing.control({
          waypoints: store.map((item) => L.latLng(item[0], item[1])),
          router: L.Routing.graphHopper(
            "10db9b1c-434a-45d2-8dab-4cad12acc647",
            {
              urlParameters: {
                vehicle: "foot",
              },
            }
          ),
          //頭尾的icon
          createMarker: (iconindex, map, total) => {
            if (iconindex === 0 || iconindex === total - 1) {
              return L.marker(map.latLng, {
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
