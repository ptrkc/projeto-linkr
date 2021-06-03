import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContexts";

import Loading from "../Loading/Loading";
import StyledTimeline from "../Styles/StyledTimeline";
import CreatePost from "./CreatePost";
import PostsList from "./PostsList";
import useInterval from "../useInterval/useInterval";

export default function Timeline() {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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

    const request = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts",
      config
    );

    request.then((response) => {
      setPosts(response.data);
      setIsLoading(false);
    });
    request.catch(() => {
      setIsLoading(false);
      setError(true);
    });
  }

  useInterval(() => {
    getPosts();
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
                Could not get posts right now. Please try again.
              </p>
            ) : (
              ""
            )
          ) : posts.posts.length === 0 ? (
            <p className="warning">You still don't follow anyone!</p>
          ) : (
            <PostsList posts={posts} reload={getPosts} />
          )}
        </div>
        <div className="page-right"></div>
      </div>
    </StyledTimeline>
  );
}
