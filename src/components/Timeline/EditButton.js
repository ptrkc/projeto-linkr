import { useContext } from "react";
import { TiPencil } from "react-icons/ti";
import styled from "styled-components";
import UserContext from "../../contexts/UserContexts";
import Modal from "react-modal";

import "./ModalStyle.css";

Modal.setAppElement("#root");

export default function EditButton({
  userId,
  edit,
  error,
  setError,
  setIsEditing,
}) {
  const { user } = useContext(UserContext);

  return userId === user.id ? (
    <>
      <PencilButton onClick={edit}>
        <TiPencil />
      </PencilButton>
      {error && (
        <Modal className="content" overlayClassName="overlay" isOpen={true}>
          <ModalContent>
            <p>Error: Could not edit your post at this time.</p>
            <div>
              <button
                onClick={() => {
                  setError(false);
                  setIsEditing(true);
                }}
              >
                Ok, go back
              </button>
            </div>
          </ModalContent>
        </Modal>
      )}
    </>
  ) : (
    ""
  );
}

const PencilButton = styled.button`
  display: flex;
  justify-content: flex-end;
  background-color: transparent;
  cursor: pointer;
  color: white;
  border: none;
`;

const ModalContent = styled.div`
  color: white;
  p {
    max-width: 360px;
    font-weight: bold;
    font-size: 34px;
    line-height: 41px;
    margin-bottom: 47px;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 30px;
    button {
      width: 134px;
      height: 37px;
      border-radius: 5px;
      font-weight: bold;
      font-size: 18px;
      line-height: 22px;
      border: none;
      cursor: pointer;
      background: #ffffff;
      color: #1877f2;
    }
  }
`;
