import axios from "axios";
import { AiOutlineComment } from "react-icons/ai";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContexts";

export default function CommentSection({ post }) {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getComments();
  }, []);
  function getComments() {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const commentsRequest = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}/comments`,
      config
    );
    commentsRequest.then((response) => {
      console.log(response);
      setComments(response.data.comments);
    });
    commentsRequest.catch((error) => {
      console.log(error.response);
    });
  }

  return (
    <StyledCommentsSection>
      {comments.map((comment) => {
        return (
          <>
            {comment.user.username}, {comment.text}
            <br />
          </>
        );
      })}
    </StyledCommentsSection>
  );
}

const StyledCommentsSection = styled.div`
  margin: 15px 0px;
  width: 100%;
  padding: 0;
  border: none;
  background-color: transparent;
  color: inherit;
`;
