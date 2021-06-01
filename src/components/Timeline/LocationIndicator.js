import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import Modal from "react-modal";
import { IoLocationSharp } from "react-icons/io5";

import "./ModalStyle.css";

Modal.setAppElement("#root");

export default function LocationIndicator({ user, geolocation }) {
  const [isOpen, setIsOpen] = useState(false);
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [error, setError] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <LocationIcon onClick={toggleModal}>
        <IoLocationSharp />
      </LocationIcon>
      <Modal
        className="location"
        overlayClassName="overlay"
        isOpen={isOpen}
        onRequestClose={toggleModal}
      >
        <Header>
          <h1>{user}'s location</h1>
          <button onClick={toggleModal}>
            <AiOutlineClose />
          </button>
        </Header>
        <p>Location</p>
        <div>
          {geolocation.latitude}
          {geolocation.longitude}
        </div>
      </Modal>
    </>
  );
}
const LocationIcon = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  font-size: 20px;
  margin-bottom: -5px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-family: Oswald;
    font-weight: bold;
    font-size: 38px;
    line-height: 56px;
    color: #ffffff;
  }
  button {
    background-color: transparent;
    color: white;
    border: none;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0px;
  }
`;
