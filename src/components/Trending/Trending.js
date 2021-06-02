import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/UserContexts";
import TrendingContext from "../../contexts/TrendingContext";

export default function Trending() {
  const { user } = useContext(UserContext);
  const { trending, setTrending } = useContext(TrendingContext);
  const [requestError, setRequestError] = useState(false);
  const [hashtag, setHashtag] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      getTrending();
    }
  }, [user]);

  function getTrending() {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const request = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/trending",
      config
    );
    request.then((response) => {
      setTrending(response.data.hashtags);
      setRequestError(false);
    });
    setRequestError(false);
    request.catch(() => {
      setRequestError(true);
    });
  }

  function goToHashtag(e) {
    e.preventDefault();
    if (!hashtag) {
      return;
    }
    history.push(`/hashtag/${hashtag}`);
  }
  return (
    <TrendingContainer>
      <p className="title">trending</p>
      <ContainerList>
        {!requestError ? (
          trending.length > 0 ? (
            trending.map((item) => (
              <Link key={item.id} to={`/hashtag/${item.name}`}>
                # {item.name}
              </Link>
            ))
          ) : (
            <>Loading...</>
          )
        ) : (
          <a href="#" onClick={getTrending}>
            <p>Could not get trending.</p>
            <p>Try again?</p>
          </a>
        )}
      </ContainerList>
      <form onSubmit={goToHashtag}>
        <span>#</span>
        <input
          value={hashtag}
          onChange={(e) => setHashtag(e.target.value.replace(/[\W_]+/, ""))}
          type="text"
          placeholder="type a hashtag"
        />
      </form>
    </TrendingContainer>
  );
}

const TrendingContainer = styled.div`
  font-weight: bold;

  .title {
    font-family: "Oswald", sans-serif;
    font-size: 27px;
    line-height: 40px;
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0px 16px;
    border-bottom: 1px solid #484848;
  }
  form {
    padding: 0px 16px 15px;
    position: relative;
    display: flex;
    align-items: center;
    span {
      position: absolute;
      font-size: 19px;
      left: 29px;
    }
    input {
      font-family: Lato;
      font-weight: normal;
      font-size: 16px;
      letter-spacing: 0.05em;
      color: white;
      height: 35px;
      background: #252525;
      border-radius: 8px;
      width: 100%;
      border: none;
      padding: 0px 12px 0px 36px;
    }
    input::placeholder {
      color: #575757;
      font-style: italic;
      opacity: 1;
    }
  }
`;

const ContainerList = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 19px;
  line-height: 23px;
  letter-spacing: 0.05em;
  padding: 24px 16px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 330px;
  a {
    margin-bottom: 5px;
    width: fit-content;
  }
`;
