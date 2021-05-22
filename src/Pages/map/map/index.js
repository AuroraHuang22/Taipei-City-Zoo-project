import React from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  useMap,
  Marker,
} from "react-leaflet";
import L from "leaflet";
import { useSelector } from "react-redux";
import { Markers } from "../map/Markers";
import Routing from "./leafletRouteMaching";
import MapComformation from "./MapComformation";

const setBounds = [
  [25.000263, 121.57700905],
  [24.99028, 121.5936458],
];
const position = [24.99593183848819, 121.58535137127019];

function Map(props) {
  const route = useSelector((state) => state.AnimalsReducer.visitRoute);

  const center = useSelector((state) => state.AnimalsReducer.showAnimalsGeo);

  function ClickEvent() {
    useMapEvents({
      click: (e) => {
        console.log(e.latlng);
      },
    });
    return null;
  }

  // function Findme() {
  //   const [position, setPosition] = useState(null);
  //   const map = useMapEvents({
  //     click: () => {
  //       map.locate();
  //     },
  //     locationfound(e) {
  //       setPosition(e.latlng);
  //       map.flyTo(e.latlng, map.getZoom());
  //     },
  //   });
  //   return position === null ? null : (
  //     <Marker
  //       position={position}
  //       icon={
  //         new L.Icon({
  //           iconUrl: require(`../../icons/like-02.svg`).default,
  //           iconSize: [20, 20],
  //           iconAnchor: [10, 10],
  //         })
  //       }
  //     >
  //       <Popup> You are here</Popup>
  //     </Marker>
  //   );
  // }

  const FitCenter = (animateRef) => {
    const map = useMap();

    if (!route.length && center.length) {
      map.setView(
        [center[center.length - 1][0], center[center.length - 1][1]],
        16.8
      );
    } else if (route.length && center.length) {
      map.setView([24.996554, 121.583322], 16.3);
    }

    return null;
  };

  return (
    <>
      <MapContainer
        center={position}
        zoom={16}
        minZoom={16.5}
        maxBounds={setBounds}
        scrollWheelZoom={true}
        style={{
          height: "100vh",
          width: "70vw",
          position: "fixed",
          top: 0,
          right: 0,
        }}
        // whenCreated={(map) => leafletElement.addTo(map)}
      >
        <ClickEvent />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> , Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          url="https://api.mapbox.com/styles/v1/aurorahuang/ckol9o1wg11vf19n1nl0o5x2m/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYXVyb3JhaHVhbmciLCJhIjoiY2tva3ZmeXVnMDlhMjJ4cm12enM1OXhycCJ9.kyUwDjf4VLFBZPZrN2nijQ"
        />
        <Routing />
        {center.map((item) => (
          <Marker
            key={item[0]}
            position={[item[0], item[1]]}
            icon={
              new L.Icon({
                iconUrl: require(`../../../icons/star.svg`).default,
                iconSize: [10, 10],
                iconAnchor: [5, 5],
              })
            }
          ></Marker>
        ))}
        <FitCenter />
        <MapComformation></MapComformation>
        <Markers facilities={props.facilities} />
      </MapContainer>
    </>
  );
}

export default Map;
