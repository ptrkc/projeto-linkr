import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContexts";

import Loading from "../Loading/Loading";
import StyledTimeline from "../Styles/StyledTimeline";
import CreatePost from "./CreatePost";
import PostsList from "./PostsList";

export default function Timeline() {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          user ? user.token : "e6fcf752-9914-4c3a-b13f-61099c94e97f"
        }`,
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
  }, [user]);

  return (
    <StyledTimeline>
      <h1>timeline</h1>
      <div className="main-content">
        <div className="page-left">
          <CreatePost />
          {isLoading ? <Loading /> : ""}
          {posts === null ? (
            error ? (
              <p>
                Houve uma falha ao obter os posts, por favor atualize a página
              </p>
            ) : (
              ""
            )
          ) : posts.length === 0 ? (
            <p>Nenhum post encontrado</p>
          ) : (
            <PostsList posts={posts} />
          )}
        </div>
        <div className="page-right">
          <div className="trending">
            <p>blablabla</p>
            <p>blablabla</p>
            <p>blablabla</p>
            <p>blablabla</p>
            <p>blablabla</p>
            <p>blablabla</p>
            <p>blablabla</p>
            <p>blablabla</p>
            <p>blablabla</p>
            <p>blablabla</p>
          </div>
        </div>
      </div>
    </StyledTimeline>
  );
}
