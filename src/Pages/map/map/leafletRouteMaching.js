import React from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-graphhopper";
import { MapConsumer } from "react-leaflet";

function Routing(props) {
  const newIcon = new L.Icon({
    iconUrl: require(`../../../icons/like-03.svg`).default,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
  return (
    <MapConsumer>
      {(map) => {
        L.Routing.control({
          waypoints: [
            L.latLng(24.9957, 121.58440855),
            L.latLng(24.994165022808907, 121.58671101380374),
          ],
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
