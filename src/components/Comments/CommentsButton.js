import { AiOutlineComment } from "react-icons/ai";
import styled from "styled-components";

export default function CommentsButton({ post }) {
  return (
    <StyledComments>
      <AiOutlineComment />
      <p>
        {post.commentCount} comment{post.commentCount > 0 ? "s" : null}
      </p>
    </StyledComments>
  );
}

const StyledComments = styled.button`
  margin: 15px 0px;
  width: 100%;
  padding: 0;
  border: none;
  background-color: transparent;
  color: inherit;
`;
