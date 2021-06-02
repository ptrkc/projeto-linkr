import styled from "styled-components";
import Post from "./Post";
import "./ModalStyle.css";
import UserContext from "../../contexts/UserContexts";
import { useContext } from "react";

export default function PostsList({ posts, reload }) {
  const { user } = useContext(UserContext);

  return (
    <Container>
      {posts.posts.map((post) => {
        const postKey = post.repostId ? post.repostId : post.id;
        return (
          <Post post={post} key={postKey} reload={reload} userId={user.id} />
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
