// UserWorldLocationsPage.js
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { HeatmapLayer } from "./HeatmapLayer"; // Assuming HeatmapLayer is extracted to its own file
import { ILocation } from "../../firebase/interfaces";
import { firebaseClient } from "../../firebase";

export function UserWorldLocationsPage() {
  const { username } = useParams();
  const [locations, setLocations] = useState<Array<ILocation>>([]);

  useEffect(() => {
    const q = query(
      collection(firebaseClient.db, "messages"),
      where("username", "==", username)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const locs = querySnapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((doc: any) => doc.latitude && doc.longitude);
      setLocations(locs as any);
    });

    return () => unsubscribe();
  }, [username]);

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
