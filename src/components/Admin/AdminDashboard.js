import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import "../Admin/AdminDashboard.css"; // Assuming you want to add the styles in this file
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const Admin = () => {
  const navigate = useNavigate(); // Initialize the navigation hook
  const [selectedOption, setSelectedOption] = useState(""); // Tracks selected option for rendering the form
  const [profile, setProfile] = useState({
    name: "",
    photo: "",
    description: "",
    address: "",
  });

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  // Function to render content based on selected option
  const renderContent = () => {
    switch (selectedOption) {
      case "View All Profiles":
        navigate("/admin/View Profiles"); // Redirect to ViewAllProfiles page
        return null;
      case "Add Profile":
        return (
          <form onSubmit={handleSubmit} className="p-4 shadow-sm">
            <h4>Add Profile</h4>

            {/* Photograph Input */}
            <div className="form-group">
              <label>Photo (URL)</label>
              <input
                type="text"
                name="photo"
                value={profile.photo}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter image URL"
                required
              />
            </div>

            {/* Name Input */}
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter full name"
                required
              />
            </div>

            {/* Profession/Description Input */}
            <div className="form-group">
              <label>Profession/Brief Description</label>
              <textarea
                name="description"
                value={profile.description}
                onChange={handleChange}
                className="form-control"
                placeholder="Brief description of profession"
                required
              ></textarea>
            </div>

            {/* Address Autocomplete - mapbox */}
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleAddressChange}
                className="form-control"
                placeholder="Start typing the address"
                required
              />
              <div className="suggestions">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.place_id}
                    className="suggestion-item"
                    onClick={() => handleAddressSelect(suggestion)}
                  >
                    {suggestion.display_name}
                  </div>
                ))}
              </div>
            </div>

            {/* Centered Submit Button */}
            <div className="d-flex justify-content-center mt-3">
              <button type="submit" className="btn btn-submit">
                Add Profile
              </button>
            </div>
          </form>
        );
      default:
        return (
          <div className="message">
            Please select an option from the left.
          </div>
        );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Handle address input changes and fetch suggestions from Nominatim API
  const handleAddressChange = (e) => {
    const value = e.target.value;
    setProfile((prevProfile) => ({
      ...prevProfile,
      address: value,
    }));

    if (value) {
      // Fetch address suggestions from Nominatim API
      fetch(
        `https://nominatim.openstreetmap.org/search?q=${value}&format=json&addressdetails=1`
      )
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data); // Update the suggestions state
        })
        .catch((error) => console.error(error));
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  };

  
  // Handle address selection from suggestions
  const handleAddressSelect = (suggestion) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      address: suggestion.display_name, // Set the full address in the input
    }));
    setSelectedLocation({
      lat: suggestion.lat,
      lon: suggestion.lon,
      address: suggestion.display_name,
    });
    setSuggestions([]); // Clear suggestions once an address is selected
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send the profile to the parent component or your backend API
    console.log(profile); // Log profile for now (you can send to API here)
    setProfile({
      name: "",
      photo: "",
      description: "",
      address: "", // Clear address on submit
    });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Sidebar for Admin Options */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0">Admin Options</h5>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label
                  htmlFor="adminOptionsDropdown"
                  className="font-weight-bold"
                >
                  Select an option:
                </label>
                <select
                  id="adminOptionsDropdown"
                  className="form-control custom-select"
                  onChange={(e) => setSelectedOption(e.target.value)} // Changes the state based on selection
                >
                  <option value="">-- Select an Option --</option>
                  <option value="View All Profiles">View All Profiles</option>
                  <option value="Add Profile">Add Profile</option> {/* Adds the option for "Add Profile" */}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="col-md-8">
          <h3 className="dashboard-header">Admin Dashboard</h3>
          <div className="content-area p-3 border rounded bg-light">
            {renderContent()} {/* Renders the appropriate content */}
            {/* Display the map if a location is selected */}
            {selectedLocation && (
              <MapContainer
                center={[selectedLocation.lat, selectedLocation.lon]}
                zoom={13}
                style={{ height: "500px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />
                <Marker position={[selectedLocation.lat, selectedLocation.lon]}>
                  <Popup>{selectedLocation.address}</Popup>
                </Marker>
              </MapContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
