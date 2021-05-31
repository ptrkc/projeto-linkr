import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import UserContext from "../../contexts/UserContexts";

import Loading from "../Loading/Loading";
import StyledTimeline from "../Styles/StyledTimeline";
import PostsList from "../Timeline/PostsList";
import Trending from "../Trending/Trending";

import styled from  "styled-components";

export default function UserPage() {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { userId } = useParams();

  const [displayButton, setDisplayButton] = useState(true);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (!user) {
      if (localStorage.user) {
        const userStorage = JSON.parse(localStorage.user);
        setUser(userStorage);
        return;
      }
    }
    if(user.id===Number(userId)){
      setDisplayButton(false);
    } 

    getFollows();
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

  function getFollows(){
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const request = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows`,
      config
    );

    request.then((response) => {
      console.log(response.data.users, userId);
      const sigo = response.data.users.filter(item => item.id === Number(userId));
      if(sigo.length>0){
        setFollowing(true);
        console.log("seguindo");
      }else {
        setFollowing(false);
        console.log("não seguindo");
      }
    });

    request.catch((error) => {
      console.log(error.response);
    });
  }
  
  function follow(){
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const request = axios.post(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${userId}/follow`,
      {},
      config
    );

    request.then((response) => {
      console.log(response.data, "FOLLOW");
      setFollowing(true);
    });
    request.catch((error) => {
      alert(`Operation not possible due to ${error.data}. FOLLOW`);
    });
  }

  function unfollow(){
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const request = axios.post(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${userId}/unfollow`,
      {},
      config
    );

    request.then((response) => {
      console.log(response.data, "UNFOLLOW");
      setFollowing(false);
    });
    request.catch((error) => {
      alert(`Operation not possible due to ${error.data}. UNFOLLOW`);
    });
  }

  console.log(following, displayButton);
  return (
    <StyledTimeline>
      <h1>
        {posts === null
          ? ""
          : posts.posts.length >= 0
          ? <Introduction>
              <div>
                <div>(Avatar)</div>
                <h1>{posts.posts[0].user.username}'s posts</h1>
              </div>
              <FollowButton onClick={following?unfollow:follow} followinguser={following} display={displayButton}>Follow</FollowButton>
            </Introduction>
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
            <PostsList posts={posts} reload={getPosts} />
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

const Introduction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
  }

  h1{
    margin: 0;
  }

  button {
      width: 112px;
      height: 31px;
      background: #1877F2;
      border-radius: 5px;
      border: none;
      font-weight: bold;
      font-size: 14px;
      line-height: 17px;
      color: white;
      font-family: Lato;
    }
    button:disabled {
      filter: brightness(0.7);
    }
`;

const FollowButton = styled.button`
  display: ${props => props.display? "block":"none"};
  width: 112px;
  height: 31px;
  background: ${props => props.followinguser? "white":"#1877F2"};
  border-radius: 5px;
  border: none;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: ${props => props.followinguser? "#1877F2":"white"};
  font-family: Lato;
`;