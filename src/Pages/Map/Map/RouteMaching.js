import React, { useEffect } from "react";
import L from "leaflet";
import * as action from "../../../Redux/Action";
import { MapConsumer } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import "leaflet-routing-machine";
import "lrm-graphhopper";

let addedToMap = false;

const newIcon = new L.Icon({
  iconUrl: require(`../../../icons/like-03.svg`).default,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const leafletElement = L.Routing.control({
  router: L.Routing.graphHopper("10db9b1c-434a-45d2-8dab-4cad12acc647", {
    urlParameters: {
      vehicle: "foot",
    },
  }),
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
        dashArray: "5.3",
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
});

function Routing() {
  const routeStore = useSelector((state) => state.AnimalsReducer.visitRoute);
  const dispatch = useDispatch();

  useEffect(() => {
    const callback = function (e) {
      let distance = e.routes[0].summary.totalDistance / 1000;
      let time = (e.routes[0].summary.totalTime % 3600) / 40;

      dispatch(action.addConformation([distance.toFixed(2), time.toFixed(0)]));
    };
    leafletElement.on("routesfound", callback);
    return () => {
      leafletElement.off("routesfound", callback);
    };
  }, []);

  useEffect(() => {
    if (routeStore.length) {
      const start = L.latLng([24.998485693740232, 121.58091476426509]);
      const end = L.latLng([24.998855803322083, 121.58158481040921]);

      let wayPoints = [start];
      wayPoints.push(...routeStore.map((item) => L.latLng(item)));
      wayPoints.push(end);

      leafletElement.setWaypoints(wayPoints);
    }
  }, [routeStore.length]);

  if (!routeStore.length) {
    return null;
  }

  return (
    <>
      <MapConsumer>
        {(map) => {
          if (!addedToMap) {
            addedToMap = true;
            leafletElement.addTo(map);
          }
          return null;
        }}
      </MapConsumer>
    </>
  );
}

export default Routing;
