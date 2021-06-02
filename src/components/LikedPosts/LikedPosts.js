import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContexts";

import Loading from "../Loading/Loading";
import StyledTimeline from "../Styles/StyledTimeline";
import PostsList from "../Timeline/PostsList";

export default function LikedPosts() {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      if (localStorage.user) {
        const userStorage = JSON.parse(localStorage.user);
        setUser(userStorage);
        return;
      }
    }
    getPosts();
  }, [user]);

  function getPosts() {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    if (posts && posts.length > 0) {
      const request = axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/liked?olderThan=${
          posts[posts.length - 1].id
        }`,
        config
      );

      request.then((response) => {
        if (response.data.posts.length < 10) {
          setHasMore(false);
        }
        const refreshPosts = [...posts, ...response.data.posts];
        setPosts(refreshPosts);
        setIsLoading(false);
      });
      request.catch((error) => {
        setHasMore(false);
        setIsLoading(false);
        setError(true);
      });
    } else {
      const request = axios.get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/liked",
        config
      );

      request.then((response) => {
        if (response.data.posts.length < 10) {
          setHasMore(false);
        }
        setPosts(response.data.posts);
        setIsLoading(false);
      });
      request.catch((error) => {
        setIsLoading(false);
        setError(true);
      });
    }
  }

  return (
    <StyledTimeline>
      <h1>my likes</h1>
      <div className="main-content">
        <div className="page-left">
          {isLoading ? <Loading /> : ""}
          {posts === null ? (
            error ? (
              <p className="warning">
                Houve uma falha ao obter os posts, por favor atualize a página
              </p>
            ) : (
              ""
            )
          ) : posts.length === 0 ? (
            <p className="warning">Nenhum post encontrado</p>
          ) : (
            <PostsList posts={posts} reload={getPosts} hasMore={hasMore} />
          )}
        </div>
        <div className="page-right"></div>
      </div>
    </StyledTimeline>
  );
}
