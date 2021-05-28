import styled from "styled-components";
import Post from "./Post";

export default function PostsList({ posts, reload, again }) {
  return (
    <Container>
      {posts.posts.map((post) => {
        return <Post post={post} key={post.id} reload={reload} again={again}/>;
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
