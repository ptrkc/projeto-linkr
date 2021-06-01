import styled from "styled-components";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { BiHeart } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import UserContext from "../../contexts/UserContexts";
export default function Likes({ post }) {

  const { user } = useContext(UserContext);

  const initialLikes = post.likes.map((item) => {
    return {
      id: item["user.id"],
      username: item["user.username"],
    };    
  });

  const [likes, setLikes] = useState(initialLikes);

  const [tooltip, setTooltip] = useState("");
  function likeThis() {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const request = axios.post(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}/like`,
      {},
      config
    );
    request.then((response) => {
      const newLikes = response.data.post.likes.map((item) => {
        return {
          id: item.userId,
          username: item.username,
        };
      });
      setLikes(newLikes);
    });
    request.catch(() => alert("Error setting likes"));
  }
  function dislikeThis() {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const request = axios.post(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}/dislike`,
      {},
      config
    );
    request.then((response) => {
      const newLikes = response.data.post.likes.map((item) => {
        return {
          id: item.userId,
          username: item.username,
        };
      });
      setLikes(newLikes);
    });
    request.catch(() => alert("Error setting likes"));
  }

  useEffect(() => {
    getTooltip();
  }, [likes]);


  function getTooltip() {
    const notMe = likes.filter((item) => item.id !== user.id);
    const namesNotMine = notMe.map((item) => item.username);
    if (likes.filter((item) => item.id === user.id).length > 0) {
      if (namesNotMine.length === 0) {
        setTooltip("You");
      }
      if (namesNotMine.length === 1) {
        setTooltip("You and " + namesNotMine[0]);
      } else if (namesNotMine.length === 2) {
        setTooltip("You, " + namesNotMine[0] + " and another person");
      } else if (namesNotMine.length > 2) {
        setTooltip(
          "You, " +
            namesNotMine[0] +
            " and " +
            (likes.length - 2) +
            " other people"
        );
      }
    } else {
      if (namesNotMine.length === 0) {
        setTooltip(null);
      }
      if (namesNotMine.length === 1) {
        setTooltip(namesNotMine[0]);
      } else if (namesNotMine.length === 2) {
        setTooltip(namesNotMine[0] + " e " + namesNotMine[1]);
      } else if (namesNotMine.length === 3) {
        setTooltip(
          namesNotMine[0] + ", " + namesNotMine[1] + ", and another person"
        );
      } else if (namesNotMine.length > 3) {
        setTooltip(
          namesNotMine[0] +
            ", " +
            namesNotMine[1] +
            ", and " +
            (likes.length - 2) +
            " other people"
        );
      }
    }
  }
  return (
    <Container>
      {likes.filter((item) => item.id === user.id).length > 0 ? (
        <FaHeart color="red" onClick={dislikeThis} />
      ) : (
        <BiHeart onClick={likeThis} />
      )}
      <LikesCounter data-tip={tooltip}>
        {likes.length} {likes.length > 1 ? "likes" : "like"}
      </LikesCounter>
      <ReactTooltip place="bottom" type="light" effect="solid" />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LikesCounter = styled.div`
  margin-top: 5px;
  font-size: 11px;
  line-height: 13px;
  color: #fff;
`;
