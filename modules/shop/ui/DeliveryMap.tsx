"use client";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { useEffect, useMemo } from "react";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";

import { SHOP_LOCATION, type LatLng } from "@/constants/delivery";

// Leaflet's default marker images break under bundlers, so draw the pin with CSS.
const pinIcon = L.divIcon({
  className: "delivery-pin",
  html: '<span class="block h-5 w-5 rounded-full border-[3px] border-white bg-rose-dark shadow-[0_1px_6px_rgba(0,0,0,0.35)]"></span>',
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const PIN_ZOOM = 16;

type DeliveryMapProps = {
  position: LatLng | null;
  onPositionChange: (position: LatLng) => void;
};

function MapClickHandler({ onPositionChange }: Pick<DeliveryMapProps, "onPositionChange">) {
  useMapEvents({
    click: (event) => onPositionChange({ lat: event.latlng.lat, lng: event.latlng.lng }),
  });

  return null;
}

// Bring the pin into view when it's set from search or GPS, without jumping while dragging.
function KeepPinInView({ position }: Pick<DeliveryMapProps, "position">) {
  const map = useMap();

  useEffect(() => {
    if (!position) return;

    const target = L.latLng(position.lat, position.lng);

    if (map.getZoom() < 14 || !map.getBounds().contains(target)) {
      map.setView(target, PIN_ZOOM);
    }
  }, [map, position]);

  return null;
}

export default function DeliveryMap({ position, onPositionChange }: DeliveryMapProps) {
  const start = position ?? SHOP_LOCATION;
  const markerHandlers = useMemo(
    () => ({
      dragend: (event: L.DragEndEvent) => {
        const { lat, lng } = (event.target as L.Marker).getLatLng();
        onPositionChange({ lat, lng });
      },
    }),
    [onPositionChange],
  );

  return (
    <div className="isolate overflow-hidden border border-line">
      <MapContainer
        center={[start.lat, start.lng]}
        zoom={position ? PIN_ZOOM : 12}
        scrollWheelZoom={false}
        className="h-[220px] w-full bg-cream"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors · Routes &copy; <a href="https://openrouteservice.org/">openrouteservice.org</a> by HeiGIT'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        <MapClickHandler onPositionChange={onPositionChange} />
        <KeepPinInView position={position} />
        {position && (
          <Marker
            position={[position.lat, position.lng]}
            icon={pinIcon}
            draggable
            eventHandlers={markerHandlers}
          />
        )}
      </MapContainer>
    </div>
  );
}
