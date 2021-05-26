import { Link, useHistory } from "react-router-dom";
import { BiHeart } from "react-icons/bi";
import Post from "../Styles/Post";
import styled from "styled-components";

export default function PostsList({ posts }) {
  const history = useHistory();
  return (
    <Container>
      {posts.posts.map((p) => {
        return (
          <Post image={p.linkImage}>
            <div className="left">
              <Link to={`/user/${p.user.id}`}>
                <img src={p.user.avatar} />
              </Link>
              <BiHeart />
              <p className="likes">
                {p.likes.length} {p.likes.length === 1 ? "like" : "likes"}
              </p>
            </div>
            <div className="right">
              <Link to={`/user/${p.user.id}`}>
                <p className="username">{p.user.username}</p>
              </Link>
              <p className="user-text">{p.text}</p>
              <a href={p.link} className="link" target="_blank">
                <div className="texts">
                  <p className="link-title">{p.linkTitle}</p>
                  <p className="link-description">{p.linkDescription}</p>
                  <p className="link-url">{p.link}</p>
                </div>
                <div className="image"></div>
              </a>
            </div>
          </Post>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
