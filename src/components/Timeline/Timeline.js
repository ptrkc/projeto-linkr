import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContexts";

import Loading from "../Loading/Loading";
import StyledTimeline from "../Styles/StyledTimeline";
import CreatePost from "./CreatePost";
import PostsList from "./PostsList";
import Trending from "../Trending/Trending";

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
    request.catch((error) => {
      setIsLoading(false);
      setError(true);
    });
  }
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
          ) : posts.posts.length === 0 ? (
            <p className="warning">Nenhum post encontrado</p>
          ) : (
            <PostsList posts={posts} reload={getPosts} again="false"/>
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
