import { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import styled from "styled-components";

export default function LocationButton({ isLoading, setLocation }) {
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
      setLocation(false);
    }
  }

  function getLocation(position) {
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
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
      isGettingLocation={isGettingLocation}
      onClick={() => toggleLocation()}
      disabled={isLoading || isGettingLocation}
      type="button"
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
  color: ${(props) =>
    props.locationEnabled
      ? props.isGettingLocation
        ? "#cf6400"
        : "#238700"
      : "#949494"};
  background-color: transparent;
  span {
    margin: 0px 5px;
    font-weight: 300;
    font-size: 13px;
    line-height: 16px;
  }
`;
