import styled from "styled-components";
import CreatePost from "./CreatePost";

export default function Timeline() {
  return (
    <StyledTimeline>
      <h1>timeline</h1>
      <MainContent>
        <Left>
          <CreatePost />
          {/* <Feed /> */}
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
