import React, { useState, useEffect } from "react";
import { Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";
import L from "leaflet";

function FacilitiesMarkers(props) {
  const [facilitiesData, setFacilitiesData] = useState([]);
  const store = useSelector((state) => state.SelectorReducer.showFacilities);
  const ICON_SIZE = [16, 16];
  const ICON_ANCHOR = [8, 8];

  useEffect(() => {
    setFacilitiesData(props.facilities);
  }, [props.facilities]);

  return facilitiesData.map((item) =>
    store
      ? store.map((fac) =>
          item.Item === fac ? (
            <Marker
              key={`fac${item.Index}`}
              position={[item.Geo[1], item.Geo[0]]}
              zIndexOffset={900}
              icon={
                new L.Icon({
                  iconUrl:
                    require(`../../../../Icons/Labels/${item.Item}-02.svg`)
                      .default,
                  iconSize: ICON_SIZE,
                  iconAnchor: ICON_ANCHOR,
                })
              }
            >
              <Popup>
                {item.Title}
                <br />
                <br />
                {item.Summary}
              </Popup>
            </Marker>
          ) : null
        )
      : null
  );
}

export default FacilitiesMarkers;
