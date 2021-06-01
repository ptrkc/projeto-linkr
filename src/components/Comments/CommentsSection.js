import axios from "axios";
import { AiOutlineComment } from "react-icons/ai";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContexts";
import CreateComment from "./CreateComment";
import Avatar from "./Avatar";

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
  console.log(post);
  return (
    <StyledCommentsSection initial={!comments.length}>
      {comments.length === 0
        ? post.commentCount !== 0
          ? "Loading..."
          : "No comments yet"
        : ""}
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            <Avatar avatar={comment.user.avatar} id={comment.user.id} />
            <div>
              <p>{comment.user.username}</p>
              <p>{comment.text}</p>
            </div>
          </div>
        );
      })}
      <CreateComment />
    </StyledCommentsSection>
  );
}

const StyledCommentsSection = styled.div`
  margin: 15px 0px;
  width: 100%;
  max-height: ${(props) => (props.initial ? "50px" : "600px")};
  padding: 0;
  border: none;
  background-color: transparent;
  color: inherit;
  transition: 0.5s;
  & > div {
    display: flex;
  }
`;
