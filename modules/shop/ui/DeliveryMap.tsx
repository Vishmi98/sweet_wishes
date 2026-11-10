"use client";

import {
  AdvancedMarker,
  Map as GoogleMap,
  useMap,
  type MapMouseEvent,
} from "@vis.gl/react-google-maps";
import { useEffect, useMemo } from "react";

import { SHOP_LOCATION, type LatLng } from "@/constants/delivery";

// The draggable pin needs a Map ID. DEMO_MAP_ID is Google's testing ID; set a real one for production.
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID";
const PIN_ZOOM = 16;

type DeliveryMapProps = {
  position: LatLng | null;
  onPositionChange: (position: LatLng) => void;
};

// Bring the pin into view when it's set from search or GPS, without jumping while dragging.
function KeepPinInView({ position }: Pick<DeliveryMapProps, "position">) {
  const map = useMap();

  useEffect(() => {
    if (!map || !position) return;

    // getBounds() is undefined until the map has drawn once; treat that as out of view.
    if ((map.getZoom() ?? 0) < 14 || !map.getBounds()?.contains(position)) {
      map.moveCamera({ center: position, zoom: PIN_ZOOM });
    }
  }, [map, position]);

  return null;
}

export default function DeliveryMap({ position, onPositionChange }: DeliveryMapProps) {
  const lat = position?.lat;
  const lng = position?.lng;
  // Google rejects extra fields (like the address label), so pass a plain, stable { lat, lng }.
  const pin = useMemo(
    () => (lat === undefined || lng === undefined ? null : { lat, lng }),
    [lat, lng],
  );

  function handleMapClick(event: MapMouseEvent) {
    const latLng = event.detail.latLng;

    if (latLng) {
      onPositionChange({ lat: latLng.lat, lng: latLng.lng });
    }
  }

  function handlePinDragEnd(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      onPositionChange({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  }

  return (
    <div className="isolate overflow-hidden border border-line">
      <GoogleMap
        className="h-[220px] w-full bg-cream"
        mapId={MAP_ID}
        defaultCenter={pin ?? SHOP_LOCATION}
        defaultZoom={pin ? PIN_ZOOM : 12}
        // Like the old map: no scroll-wheel zoom hijacking, zoom buttons instead.
        gestureHandling="cooperative"
        disableDefaultUI
        zoomControl
        // Tapping a shop or landmark drops the pin there instead of opening Google's info card.
        clickableIcons={false}
        // Reuse the map when this page is shown again, instead of loading (and paying for) a new one.
        reuseMaps
        onClick={handleMapClick}
      >
        <KeepPinInView position={pin} />
        {pin && (
          <AdvancedMarker
            position={pin}
            draggable
            // Centre the dot on the location (the default anchor is bottom-centre).
            anchorLeft="-50%"
            anchorTop="-50%"
            title="Delivery location"
            onDragEnd={handlePinDragEnd}
          >
            <span className="block h-5 w-5 rounded-full border-[3px] border-white bg-rose-dark shadow-[0_1px_6px_rgba(0,0,0,0.35)]" />
          </AdvancedMarker>
        )}
      </GoogleMap>
    </div>
  );
}
