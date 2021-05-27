import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import UserContext from "../../contexts/UserContexts";

import Loading from "../Loading/Loading";
import StyledTimeline from "../Styles/StyledTimeline";
import PostsList from "../Timeline/PostsList";
import Trending from "../Trending/Trending";

export default function UserPage() {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { userId } = useParams();

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
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${userId}/posts`,
      config
    );

    request.then((response) => {
      setPosts(response.data);
      setIsLoading(false);
    });
    request.catch((error) => {
      setIsLoading(false);
      setError(true);
    });
  }
  return (
    <StyledTimeline>
      <h1>
        {posts === null
          ? ""
          : posts.posts.length >= 0
          ? `${posts.posts[0].user.username}'s posts`
          : "error"}
      </h1>
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
          ) : posts.posts.length === 0 ? (
            <p className="warning">Nenhum post encontrado</p>
          ) : (
            <PostsList posts={posts} />
          )}
        </div>
        <div className="page-right">
          <div className="trending">
            <Trending />
          </div>
        </div>
      </div>
    </StyledTimeline>
  );
}
