"use client";

import React, { useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  Tooltip,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useGeoLocation from "@/hooks/use-geolocation";
import MarkerIcon from "../../../node_modules/leaflet/dist/images/marker-icon.png";
import MarkerShadow from "../../../node_modules/leaflet/dist/images/marker-shadow.png";
import { Button } from "../ui/button";

const MarkersMap = ({ userOneLocation, userTwoLocation, popMessage }) => {
  const [locationOne, setLocationOne] = useState(userOneLocation);
  const ZOOM_LEVEL = 13;
  const mapRef = useRef();

  const location = useGeoLocation();

  const showMyLocation = () => {
    if (location.loaded && !location.error) {
      mapRef.current.flyTo(
        [location?.coordinates.lat, location?.coordinates.lng],
        ZOOM_LEVEL,
        { animate: true }
      );
      setLocationOne([location?.coordinates.lat, location?.coordinates.lng]);
    } else {
      alert(location?.error.message);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col ">
          <div className="col">
            <MapContainer
              ref={mapRef}
              center={userTwoLocation}
              zoom={6}
              scrollWheelZoom={false}
              className="flex-1 w-full p-10 h-[500px] z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {location.loaded && !location.error && (
                <Marker
                  icon={
                    new L.Icon({
                      iconUrl: MarkerIcon.src,
                      iconRetinaUrl: MarkerIcon.src,
                      iconSize: [25, 41],
                      iconAnchor: [12.5, 41],
                      popupAnchor: [0, -41],
                      shadowUrl: MarkerShadow.src,
                      shadowSize: [41, 41],
                    })
                  }
                  position={locationOne}
                >
                  <Popup>
                    Your Location. <br />
                  </Popup>
                </Marker>
              )}
              <Marker
                icon={
                  new L.Icon({
                    iconUrl: MarkerIcon.src,
                    iconRetinaUrl: MarkerIcon.src,
                    iconSize: [25, 41],
                    iconAnchor: [12.5, 41],
                    popupAnchor: [0, -41],
                    shadowUrl: MarkerShadow.src,
                    shadowSize: [41, 41],
                  })
                }
                position={userTwoLocation}
              >
                <Popup>
                  {popMessage} <br />
                </Popup>
              </Marker>

              <CircleMarker
                center={userOneLocation}
                pathOptions={{ color: "red" }}
                radius={10}
              >
                <Tooltip>Your Default Location</Tooltip>
              </CircleMarker>
            </MapContainer>
          </div>
        </div>
      </div>

      <div className="row my-4">
        <div className="col d-flex justify-content-center">
          <Button type="button" onClick={showMyLocation}>
            Locate Me
          </Button>
        </div>
      </div>
    </>
  );
};

export default MarkersMap;
