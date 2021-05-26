import styled from "styled-components";

export default function Header() {
  return (
    <StyledHeader>
      <button></button>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  background-color: #151515;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
