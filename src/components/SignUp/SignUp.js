import { useState } from "react";
import axios from "axios";
import { BsThreeDots } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";
import styled, { css } from "styled-components";

export default function SignUp() {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  function newUser(event) {
    event.preventDefault();
    if (
      email.length > 0 &&
      password.length > 0 &&
      name.length > 0 &&
      image.length > 0
    ) {
      setLoading(true);
      const body = {
        email,
        password,
        username: name,
        pictureUrl: image,
      };
      const request = axios.post(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-up",
        body
      );
      request.then((response) => {
        history.push("/");
      });
      request.catch((error) => {
        if (error.response.status === 400) {
          alert("Erro ao cadastrar dados, tente novamente");
        } else if (error.response.status === 403) {
          alert(
            "Não foi possível realizar o cadastro. O email já esta cadastrado."
          );
        }
        setLoading(false);
      });
    } else {
      alert("Preencha todos os campos!");
    }
  }

  return (
    <Container>
      <Introduction>
        <p className="page-title">linkr</p>
        <p className="page-subtitle">
          save, share and discover the best links on the web
        </p>
      </Introduction>
      <FormContainer>
        <Form onSubmit={newUser}>
          <input
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="e-mail"
            required
          ></input>
          <input
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="password"
            required
          ></input>
          <input
            disabled={loading}
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="username"
            required
          ></input>
          <input
            disabled={loading}
            onChange={(e) => setImage(e.target.value)}
            value={image}
            type="url"
            placeholder="picture url"
            required
          ></input>
          <button disabled={loading} type="submit">
            {loading ? (
              <BsThreeDots fontSize="50px"></BsThreeDots>
            ) : (
              <>Sign Up</>
            )}
          </button>
        </Form>
        <StyledLink to="/">
          <p>Switch back to log in</p>
        </StyledLink>
      </FormContainer>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;

  @media (max-width: 740px) {
    flex-direction: column;
  }
`;
const Introduction = styled.div`
  height: 100%;
  width: 60vw;
  background-color: #151515;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: bold;
  color: #ffffff;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
  padding-left: 5vw;
  padding-right: 20px;

  .page-title {
    font-family: Passion One;
    font-size: 106px;
    line-height: 117px;
    letter-spacing: 0.05em;
  }
  .page-subtitle {
    max-width: 445px;
    font-family: Oswald;
    font-size: 43px;
    line-height: 64px;
  }

  @media (max-width: 740px) {
    width: 100%;
    height: 175px;
    align-items: center;
    padding: 0px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    .page-title {
      margin: 0px, auto;
      font-size: 76px;
      line-height: 84px;
      letter-spacing: 0.05em;
    }
    .page-subtitle {
      margin: 0px, auto;
      max-width: 240px;
      font-size: 23px;
      line-height: 34px;
    }
  }
`;

const FormContainer = styled.div`
  width: 40vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 4%;
  padding-left: 4%;

  @media (max-width: 740px) {
    padding-right: 8%;
    padding-left: 8%;
    width: 100vw;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-family: Oswald;
  font-weight: bold;

  input {
    width: 100%;
    height: 65px;
    background-color: #ffffff;
    border-radius: 6px;
    padding: 15px;
    color: #151515;
    border: none;
    margin-bottom: 15px;
    font-size: 27px;
    line-height: 40px;
    opacity: ${(props) => (props.children[0].props.disabled ? "0.7" : "1")};
    pointer-events: ${(props) =>
      props.children[0].props.disabled ? "none" : "auto"};
  }
  input::placeholder {
    font-size: 27px;
    line-height: 40px;
    color: #9f9f9f;
  }
  button {
    width: 100%;
    height: 65px;
    background: #1877f2;
    border-radius: 6px;
    border: none;
    font-size: 27px;
    line-height: 40px;
    color: #ffffff;
    opacity: ${(props) => (props.children[0].props.disabled ? "0.7" : "1")};
    pointer-events: ${(props) =>
      props.children[0].props.disabled ? "none" : "auto"};
  }

  @media (max-width: 740px) {
    margin-top: 40px;

    input {
      height: 55px;
      font-size: 22px;
      line-height: 33px;
    }
    input::placeholder {
      font-size: 22px;
      line-height: 33px;
    }
  }
`;

const StyledLink = styled(Link)`
  margin-top: 20px;
  opacity: ${(props) => (props.disabled ? "0.7" : "1")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  p {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;
    text-decoration-line: underline;
    color: #ffffff;
  }

  @media (max-width: 740px) {
    font-size: 17px;
    line-height: 20px;
  }
`;
