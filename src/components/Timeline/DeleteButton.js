import { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import styled from "styled-components";
import UserContext from "../../contexts/UserContexts";

export default function DeleteButton({ postId, userId }) {
  const { user } = useContext(UserContext);

  return userId === user.id ? (
    <TrashIcon>
      <FaTrash />
    </TrashIcon>
  ) : (
    ""
  );
}

const TrashIcon = styled.button`
  display: flex;
  justify-content: flex-end;
  background-color: transparent;
  cursor: pointer;
  color: white;
  border: none;
`;
