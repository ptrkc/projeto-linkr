import axios from "axios";
import { AiOutlineComment } from "react-icons/ai";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContexts";
import CreateComment from "./CreateComment";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

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
      {comments.length === 0 ? (
        post.commentCount !== 0 ? (
          <div className="comment-box">Loading...</div>
        ) : (
          <div className="comment-box">No comments yet</div>
        )
      ) : (
        <></>
      )}
      {comments.map((comment) => {
        return (
          <div className="comment-box" key={comment.id}>
            <Avatar avatar={comment.user.avatar} id={comment.user.id} />
            <div>
              <p>
                <Link to={`/user/${comment.user.id}`}>
                  {comment.user.username}
                </Link>
                <span> • following</span>
              </p>
              <p className="comment">{comment.text}</p>
            </div>
          </div>
        );
      })}
      <CreateComment />
    </StyledCommentsSection>
  );
}

const StyledCommentsSection = styled.div`
  width: 100%;
  max-height: ${(props) => (props.initial ? "140px" : "600px")};
  padding: 0;
  border: none;
  background-color: transparent;
  transition: 0.5s;
  font-size: 14px;
  line-height: 17px;
  .comment-box {
    padding: 0px 20px;
    display: flex;
    align-items: center;
    min-height: 70px;
    border-bottom: 1px solid #353535;
    p {
      margin-bottom: 3px;
    }
    a {
      font-weight: bold;
    }
    span {
      color: #565656;
    }
    .comment {
      color: #acacac;
      word-break: break-word;
    }
  }
`;
