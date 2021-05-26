import { BiHeart } from "react-icons/bi";
import styled from "styled-components";
import ReactHashtag from "react-hashtag";

import Post from "../Styles/Post";

export default function PostsList({ posts }) {
  return (
    <Container>
      {posts.posts.map((p) => {
        return (
          <Post image={p.linkImage} key={p.id}>
            <div className="post-left">
              <a className="user-image" href={`/user/${p.user.id}`}>
                <img src={p.user.avatar} alt="user avatar" />
              </a>
              <BiHeart />
              <p className="likes">
                {p.likes.length} {p.likes.length === 1 ? "like" : "likes"}
              </p>
            </div>
            <div className="post-right">
              <a href={`/user/${p.user.id}`} className="username">
                {p.user.username}
              </a>
              <p className="user-text">
                <ReactHashtag
                  renderHashtag={(hashtagValue) => (
                    <a
                      href={`/hashtag/${hashtagValue.substring(1)}`}
                      className="hashtag"
                    >
                      {hashtagValue}
                    </a>
                  )}
                >
                  {p.text}
                </ReactHashtag>
              </p>
              <a
                href={p.link}
                className="link"
                target="_blank"
                rel="noreferrer"
              >
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
  margin-bottom: 20px;
`;
