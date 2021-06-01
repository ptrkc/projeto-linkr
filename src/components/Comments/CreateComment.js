import axios from "axios";
import { IoPaperPlaneOutline } from "react-icons/io5";
import styled from "styled-components";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../contexts/UserContexts";
import Avatar from "./Avatar";

export default function CommentSection({ post }) {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  useEffect(() => {}, []);
  function sendComment(e) {
    e.preventDefault();
    alert("test");
  }
  return (
    <CreateCommentContainer onSubmit={sendComment}>
      <Avatar avatar={user.avatar} id={user.id} />
      <input placeholder={"write a comment..."}></input>
      <button>
        <IoPaperPlaneOutline />
      </button>
    </CreateCommentContainer>
  );
}

const CreateCommentContainer = styled.form`
  min-height: 70px;
  padding: 0px 20px;
  width: 100%;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  position: relative;
    input {
      width: 100%;
      height: 40px;
      background: #252525;
      border-radius: 8px;
      border: none;
      color: #acacac;
      padding: 0px 40px 0px 15px;
    }
    input::placeholder {
      font-style: italic;
      color: #575757;
    }
    button {
      border: none;
      background-color: transparent;
      color: #f3f3f3;
      position: absolute;
      right: 23px;
      font-size: 23px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
