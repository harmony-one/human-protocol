import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { collection, query, onSnapshot } from "firebase/firestore";
import { HeatmapLayer } from "./HeatmapLayer";
import { firebaseClient } from "../../firebase";

export function WorldLocationsPage() {
  const [locations, setLocations] = useState<Array<any>>([]);

  useEffect(() => {
    const q = query(collection(firebaseClient.db, "messages"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const locs = querySnapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((doc: any) => doc.latitude && doc.longitude); // Ensure we only get entries with lat and long
      setLocations(locs);
    });

    return () => unsubscribe(); // Clean up on unmount
  }, []);

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <HeatmapLayer locations={locations} />
    </MapContainer>
  );
}
