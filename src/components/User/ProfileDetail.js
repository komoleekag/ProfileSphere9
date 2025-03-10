import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { data } from "./UserDashboard"; // Importing the profile data
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";


// Default coordinates for fallback location
const defaultCoords = [51.505, -0.09]; // Default location (London)

const ProfileDetail = () => {
  const { id } = useParams(); // Get the 'id' from URL params
  const [profile, setProfile] = useState(null);

  // Find the profile matching the 'id'
  useEffect(() => {
    const selectedProfile = data.find((d) => d.id === parseInt(id));
    setProfile(selectedProfile); // Set the profile
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  const { name, img, description, address } = profile;

  // Sample function to get coordinates from address
  const getCoordinatesFromAddress = (address) => {
    // You can replace this with an API call (Nominatim or Google Maps)
    const coordinatesMap = {
      "New York": [40.7128, -74.0060],
      "California": [36.7783, -119.4179],
      "Manchester": [53.4808, -2.2426],
      "Texas": [31.9686, -99.9018],
      "London": [51.5074, -0.1278],
    };

    return coordinatesMap[address] || defaultCoords; // Fallback to default coordinates if not found
  };

  const coordinates = getCoordinatesFromAddress(address);
  return (
   <div className="profile-detail-container">
      <div className="flex justify-center items-center min-h-screen  bg-white py-6" >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 text-center">
        {/* Profile Header */}
        <div className="mb-6">
          <img
            src={img}
            alt={name}
            className="w-32 h-32 rounded-full mx-auto border-4 border-indigo-500 object-cover"
            loading="lazy"
          />
          <h2 className="text-2xl font-semibold mt-4">{name}</h2>
          <p className="text-gray-600">{description}</p>
        </div>

        {/* Address and Map */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Address: {address}</h3>

          {/* OpenStreetMap via Leaflet */}
          <MapContainer
            center={coordinates}
            zoom={13}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={coordinates}>
              <Popup>{address}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
    </div>
  );
  
};

export default ProfileDetail;
