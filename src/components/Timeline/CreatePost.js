import { useState } from "react";
import styled from "styled-components"

export default function CreatePost() {
    const [url, setUrl] = useState("");
    const [text, setText] = useState("");
    
    function publish(e){
        e.preventDefault();
        alert(`${url}\n${text}`);    
    }

  return (
  <Container>
    <LeftImage>
      <UserImage />
    </LeftImage>
    <RightForm onSubmit={publish}>
      <p>O que você tem pra favoritar hoje?</p>
      <input value={url} onChange={(e)=>setUrl(e.target.value)} placeholder="http://..." type="url"></input>
      <textarea value={text} onChange={(e)=>setText(e.target.value)} placeholder="Muito irado esse link falando de #javascript"></textarea>
      <div>
          <button>Publicar</button>
      </div>
    </RightForm>
  </Container>);
}

const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 610px;
  min-height: 210px;
  padding: 20px;
  background-color: white;
  color: #707070;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
`
const LeftImage = styled.div`
  margin-right: 18px;
`
const UserImage = styled.div`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-image: url("https://www.gplussoccer.com/wp-content/uploads/2019/11/19336/man-behind-hide-the-pain-harold-meme-on-his-unexpected-viral-fame-800x445.png-quality-70-width-808");
  background-size: cover;
  background-position: center;
`
const RightForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-weight: 300;
  p {
    height: 40px;
    width: 100%;
    font-size: 20px;
    line-height: 24px;
  }
  input,
  textarea {
    padding: 0px 13px;
    background: #EFEFEF;
    border-radius: 5px;
    width: 100%;
    border: none;
    display: block;
    max-width: 500px;
  }
  input::placeholder,
  textarea::placeholder{
    color: #949494;
    opacity: 1;
    font-size: 15px;
  }
  input {
    height: 30px;
    margin-bottom: 5px;
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
      background: #1877F2;
      border-radius: 5px;
      border: none;
      font-weight: bold;
      font-size: 14px;
      line-height: 17px;
      color: white;
    }
  }
`