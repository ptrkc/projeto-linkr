import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Avatar({ avatar, id }) {
  console.log(avatar);
  return <AvatarStyle avatar={avatar} to={`/user/${id}`}></AvatarStyle>;
}

const AvatarStyle = styled(Link)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 18px;
  background-position: center;
  background-size: cover;
  background-image: url("${(props) => props.avatar}");
  background-color: #cccccc;
  flex-shrink: 0;
`;
