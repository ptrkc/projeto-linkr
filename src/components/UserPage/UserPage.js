import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import UserContext from "../../contexts/UserContexts";

import Loading from "../Loading/Loading";
import StyledTimeline from "../Styles/StyledTimeline";
import PostsList from "../Timeline/PostsList";

import styled from "styled-components";
import useInterval from "../useInterval/useInterval";

export default function UserPage() {
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { userId } = useParams();

  const [displayButton, setDisplayButton] = useState(true);
  const [following, setFollowing] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);

  useEffect(() => {
    if (!user) {
      if (localStorage.user) {
        const userStorage = JSON.parse(localStorage.user);
        setUser(userStorage);
        return;
      }
    }
    if (user.id === Number(userId)) {
      setDisplayButton(false);
    }

    getFollows();
    getPosts();
  }, [user, userId]);

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
      alert(error.response.data.message);
    });
  }

  function getFollows() {
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
      const userFollows = response.data.users.filter(
        (item) => item.id === Number(userId)
      );
      if (userFollows.length > 0) {
        setFollowing(true);
      } else {
        setFollowing(false);
      }
    });

    request.catch((error) => {
      alert(error.response.data.message);
    });
  }

  useInterval(() => {
    getFollows();
    getPosts();
  }, 15000);

  function follow() {
    setLoadingFollow(true);
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
      setFollowing(true);
      setLoadingFollow(false);
    });
    request.catch((error) => {
      setLoadingFollow(false);
      alert(`Operation not possible due to ${error.response.data.message}.`);
    });
  }

  function unfollow() {
    setLoadingFollow(true);
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

    request.then(() => {
      setFollowing(false);
      setLoadingFollow(false);
    });
    request.catch((error) => {
      alert(`Operation not possible due to ${error.response.data.message}.`);
      setLoadingFollow(false);
    });
  }

  return (
    <StyledTimeline>
      <h1 className="userpagefix">
        {posts === null ? (
          ""
        ) : posts.posts.length >= 0 ? (
          <Introduction>
            <div>
              <Avatar url={posts.posts[0].user.avatar} />
              <h1>{posts.posts[0].user.username}'s posts</h1>
            </div>
            <FollowButton
              onClick={following ? unfollow : follow}
              followinguser={following}
              display={displayButton}
              disabled={loadingFollow}
            >
              {following ? "Unfollow" : "Follow"}
            </FollowButton>
          </Introduction>
        ) : (
          "error"
        )}
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
        <div className="page-right"></div>
      </div>
    </StyledTimeline>
  );
}

const Introduction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
    width: 100%;
    align-items: center;
    padding-left: 20px;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }
  > div div {
    margin-right: 18px;
    flex-shrink: 0;
  }

  h1 {
    margin: 0;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
  }
  @media (max-width: 740px) {
    margin-left: 10px;

    > div {
      padding-left: 0px;
    }
    > div div {
      margin-right: 0;
      flex-shrink: 0;
    }
    h1 {
      padding-right: 5px;
    }
    button {
      margin-right: 10px;
    }
  }
`;

const FollowButton = styled.button`
  display: ${(props) => (props.display ? "block" : "none")};
  width: 112px;
  height: 31px;
  background: ${(props) => (props.followinguser ? "white" : "#1877F2")};
  border-radius: 5px;
  border: none;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: ${(props) => (props.followinguser ? "#1877F2" : "white")};
  font-family: Lato;
  flex-shrink: 0;
  cursor: pointer;

  :disabled {
    filter: brightness(0.7);
  }
`;

const Avatar = styled.div`
  background-image: url(${(props) => props.url});
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
  background-size: cover;
  background-position: center;
  top: 0;
  right: 0;
`;
