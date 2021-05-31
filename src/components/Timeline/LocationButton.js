import { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import styled from "styled-components";

export default function LocationButton() {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  function toggleLocation() {
    if (!locationEnabled) {
      if (navigator.geolocation) {
        setLocationEnabled(true);
        setIsGettingLocation(true);
        navigator.geolocation.getCurrentPosition(getLocation, locationError);
      } else {
        alert("Geolocation not available by your browser");
        setLocationEnabled(false);
      }
    } else {
      setLocationEnabled(false);
    }
  }

  function getLocation(position) {
    alert(
      "Latitude: " +
        position.coords.latitude +
        "Longitude: " +
        position.coords.longitude
    );
    setIsGettingLocation(false);
  }

  function locationError() {
    alert("Could not get location");
    setLocationEnabled(false);
    setIsGettingLocation(false);
  }

  return (
    <StyledLocation
      locationEnabled={locationEnabled}
      onClick={() => toggleLocation()}
      disabled={isGettingLocation}
    >
      <IoLocationOutline />
      <span>
        {locationEnabled
          ? isGettingLocation
            ? "Getting location..."
            : "Sharing location"
          : "Location is off"}
      </span>
    </StyledLocation>
  );
}

const StyledLocation = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  cursor: pointer;
  border: none;
  color: ${(props) => (props.locationEnabled ? "#238700" : "#949494")};
  background-color: transparent;
  span {
    margin: 0px 5px;
    font-weight: 300;
    font-size: 13px;
    line-height: 16px;
  }
`;
