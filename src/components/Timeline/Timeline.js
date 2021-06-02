import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContexts";

import Loading from "../Loading/Loading";
import StyledTimeline from "../Styles/StyledTimeline";
import CreatePost from "./CreatePost";
import PostsList from "./PostsList";
import useInterval from "../useInterval/useInterval";
import filterPosts from "../filterPosts/filterPosts";

export default function Timeline() {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
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

  function getPosts(newPosts) {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    if (posts && posts.length > 0 && !newPosts) {
      const request = axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts?olderThan=${
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
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts",
        config
      );

      request.then((response) => {
        if (response.data.posts.length < 10) {
          setHasMore(false);
        }
        if (newPosts) {
          filterPosts(response.data.posts, posts, setPosts);
        } else {
          setPosts(response.data.posts);
        }
        setIsLoading(false);
      });
      request.catch((error) => {
        setIsLoading(false);
        setError(true);
      });
    }
  }

  useInterval(() => {
    getPosts(true);
  }, 15000);

  return (
    <StyledTimeline>
      <h1>timeline</h1>
      <div className="main-content">
        <div className="page-left">
          <CreatePost getPosts={getPosts} user={user} />
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
