import { BiRepost } from "react-icons/bi";
import styled from "styled-components";
import UserContext from "../../contexts/UserContexts";
import axios from "axios";
import Modal from "react-modal";
import "./ModalStyle.css";
import { useContext, useState } from "react";

Modal.setAppElement("#root");

export default function RepostButton({ post, counter, setCounter }) {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const postId = post.id && post.repostId;

  function repostPost() {
    console.log(post);
  }

  console.log(post);
  return (
    <>
      <StyledRepostButton onClick={() => setIsOpen(true)}>
        <BiRepost />
        <p>
          {counter} repost{counter > 0 ? "s" : null}
        </p>
      </StyledRepostButton>
      <Modal
        className="content"
        overlayClassName="overlay"
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <ModalContent error={error}>
          {error ? (
            <>
              <p>Error: Could not repost this link at this time.</p>
              <div>
                <button
                  className="cancel"
                  onClick={() => {
                    setIsOpen(false);
                    setError(false);
                  }}
                  disabled={isLoading}
                >
                  Ok, go back
                </button>
              </div>
            </>
          ) : (
            <>
              <p>
                Do you want to re-post <br />
                this link?
              </p>
              <div>
                <button
                  className="cancel"
                  onClick={() => setIsOpen(false)}
                  disabled={isLoading}
                >
                  No, cancel
                </button>
                <button onClick={repostPost} disabled={isLoading}>
                  {isLoading ? "Deleting..." : "Yes, share!"}
                </button>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
      {isLoading && <Overlay />}
    </>
  );
}

const StyledRepostButton = styled.button`
  margin-top: 15px;
  width: 100%;
  padding: 0;
  border: none;
  background-color: transparent;
  color: inherit;
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
    justify-content: ${(props) => (props.error ? "center" : "space-between")};
    padding: 0px 30px;
    button {
      width: 134px;
      height: 37px;
      border-radius: 5px;
      font-weight: bold;
      font-size: 18px;
      line-height: 22px;
      border: none;
      color: #ffffff;
      background: #1877f2;
    }
    button.cancel {
      background: #ffffff;
      color: #1877f2;
    }
    button:disabled {
      filter: brightness(0.7);
    }
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: transparent;
  z-index: 5;
`;
