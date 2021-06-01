import axios from "axios";
import { AiOutlineComment } from "react-icons/ai";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContexts";

export default function CommentSection({ post }) {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  useEffect(() => {}, []);

  return (
    <CreateCommentContainer>
      <input></input>
    </CreateCommentContainer>
  );
}

const CreateCommentContainer = styled.div`
  margin: 15px 0px;
  width: 100%;
  padding: 0;
  border: none;
  background-color: transparent;
  color: inherit;
`;
