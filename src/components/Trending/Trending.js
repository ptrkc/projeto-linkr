import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/UserContexts";

export default function Trending() {
  const { user } = useContext(UserContext);
  const [trendingList, setTrendingList] = useState([]);
  const [requestError, setRequestError] = useState();
  const [hashtag, setHashtag] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
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
        setTrendingList(response.data.hashtags);
        setLoading(false);
      });
      request.catch((error) => {
        handler(error);
        setLoading(false);
      });
    }
  }, [user]);

  function handler(error) {
    setRequestError(error.response.statusText);
  }

  function refresh() {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${user ? user.token : ""}`,
      },
    };
    const request = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/trending",
      config
    );

    request.then((response) => {
      setTrendingList(response.data.hashtags);
      setRequestError();
      setLoading(false);
    });
    request.catch((error) => {
      handler(error);
      setLoading(false);
    });
  }

  function goToHashtag(e) {
    e.preventDefault();
    alert(hashtag);
  }
  return (
    <TrendingContainer>
      <p className="title">trending</p>
      <ContainerList>
        {requestError ? (
          <div onClick={refresh}>Try again</div>
        ) : loading ? (
          "loading..."
        ) : trendingList.length > 0 ? (
          trendingList.map((item) => (
            <Link key={item.id} to={`/hashtag/${item.name}`}>
              # {item.name}
            </Link>
          ))
        ) : (
          <></>
        )}
      </ContainerList>
      <form onSubmit={goToHashtag}>
        <span>#</span>
        <input
          value={hashtag}
          onChange={(e) => setHashtag(e.target.value)}
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
