import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import UserContext from "../../contexts/UserContexts";
import Loading from "../Loading/Loading";
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
      <MainContent>
        <Left>
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
        </Left>
        <Right>
          <Trending>
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
          </Trending>
        </Right>
      </MainContent>
    </StyledTimeline>
  );
}

const StyledTimeline = styled.div`
  width: 100%;
  max-width: 945px;
  padding: 0px 5px;
  margin: 125px auto 0px;
  h1 {
    font-family: Oswald;
    font-weight: bold;
    font-size: 43px;
    line-height: 64px;
    margin-bottom: 43px;
  }
  @media (max-width: 740px) {
    margin: 91px auto 0px;
    padding: 0px;
    h1 {
      padding-left: 17px;
      margin-bottom: 19px;
      font-size: 33px;
    }
  }
`;
const MainContent = styled.div`
  display: flex;
  width: 100%;
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Right = styled.div`
  margin-left: 25px;
  width: 100%;
  max-width: 300px;
  @media (max-width: 740px) {
    display: none;
  }
`;
const Trending = styled.div`
  width: 100%;
  max-width: 300px;
  background-color: black;
  border-radius: 16px;
`;
