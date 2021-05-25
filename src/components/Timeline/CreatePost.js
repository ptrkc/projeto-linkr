import axios from "axios";
import { useRef, useState } from "react";
import styled from "styled-components";
import { user } from "./LocalUser";

export default function CreatePost() {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [urlError, setUrlError] = useState(false);
  const urlInput = useRef();

  function publish(e) {
    e.preventDefault();
    if (!isURL(url)) {
      setUrlError(true);
      urlInput.current.focus();
      return;
    }
    const data = {
      text,
      link: url,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const createPostRequest = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts",
      data,
      config
    );
    createPostRequest.then((response) => {
      console.log(response.data);
    });
    createPostRequest.catch((error) => {
      console.log(error.response.data);
    });
  }
  function isURL(url) {
    const re =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
    return re.test(String(url).toLowerCase());
  }

  return (
    <Container>
      <LeftImage>
        <UserImage />
      </LeftImage>
      <PostForm onSubmit={publish}>
        <p>O que você tem pra favoritar hoje?</p>
        <input
          value={url}
          onChange={(e) => {
            setUrlError(false);
            setUrl(e.target.value);
          }}
          className={urlError ? "url-error" : ""}
          placeholder={urlError ? "Preencha uma URL válida" : "http://..."}
          ref={urlInput}
        ></input>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Muito irado esse link falando de #javascript"
        ></textarea>
        <div>
          <button>Publicar</button>
        </div>
      </PostForm>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  background-color: white;
  color: #707070;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  @media (max-width: 740px) {
    padding: 10px 15px;
    border-radius: 0px;
  }
`;
const LeftImage = styled.div`
  margin-right: 18px;
  @media (max-width: 740px) {
    display: none;
  }
`;
const UserImage = styled.div`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-image: url("https://www.gplussoccer.com/wp-content/uploads/2019/11/19336/man-behind-hide-the-pain-harold-meme-on-his-unexpected-viral-fame-800x445.png-quality-70-width-808");
  background-size: cover;
  background-position: center;
`;
const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-weight: 300;
  p {
    height: 40px;
    width: 100%;
    font-size: 20px;
  }
  input,
  textarea {
    padding: 0px 13px;
    background: #efefef;
    border-radius: 5px;
    width: 100%;
    border: none;
    display: block;
    font-size: 15px;
  }
  input::placeholder,
  textarea::placeholder {
    color: #949494;
    opacity: 1;
    font-size: inherit;
  }
  input {
    height: 30px;
    margin-bottom: 5px;
  }
  input.url-error {
    background-color: #ffdbdb;
    color: red;
  }
  input.url-error::placeholder {
    color: red;
  }
  textarea {
    padding: 8px 13px;
    min-height: 66px;
    margin-bottom: 5px;
    resize: none;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    button {
      width: 112px;
      height: 31px;
      background: #1877f2;
      border-radius: 5px;
      border: none;
      font-weight: bold;
      font-size: 14px;
      line-height: 17px;
      color: white;
    }
  }
  @media (max-width: 740px) {
    p {
      text-align: center;
      font-size: 17px;
    }
    input,
    textarea {
      font-size: 13px;
    }
    textarea {
      min-height: 47px;
    }
    div {
      button {
        width: 112px;
        height: 22px;
        font-size: 13px;
      }
    }
  }
`;
