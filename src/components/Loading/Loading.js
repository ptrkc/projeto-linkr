import styled from "styled-components";
import loading from "../../assets/loading.gif";

export default function Loading() {
  return (
    <Container>
      <p>Loading</p>
      <img src={loading} />
    </Container>
  );
}

const Container = styled.div`
  height: calc(100vh - 475px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  p {
    font-family: "Oswald", sans-serif;
    font-size: 36px;
  }
  @media (max-width: 740px) {
    height: calc(100vh - 350px);

    p {
      font-size: 28px;
    }

    img {
      height: 150px;
      width: 150px;
    }
  }
`;
