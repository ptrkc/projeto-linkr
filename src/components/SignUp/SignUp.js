import { useState} from 'react';
import axios from 'axios';
import { BsThreeDots } from "react-icons/bs";
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

export default function SignUp() {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  function newUser(event){
    event.preventDefault();
    if(email !== "" && password !== "" && name !== "" && image !== ""){
      setLoading(true);
      const body = {
        email,
        password,
        username: name,
        pictureUrl: image
      }
      const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-up", body);
      request.then(response => {
        history.push("/");
      });
      request.catch(error=>{
        console.log(error.response.status);
        if(error.response.status===400){
        } else if(error.response.status===403){
          alert("Não foi possível realizar o cadastro. O email já esta cadastrado.");
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
        <div>
          <div>linkr</div>
          <div>save, share and discover<br></br>the best links on the web</div>
        </div>
      </Introduction>
      <FormContainer>
        <Form onSubmit={newUser}>
          <input disabled={loading} onChange={e=>setEmail(e.target.value)} value={email}type="email" placeholder="e-mail" required></input>
          <input disabled={loading} onChange={e=>setPassword(e.target.value)} value={password} type="password" placeholder="password" required></input>
          <input disabled={loading} onChange={e=>setName(e.target.value)} value={name} type="text" placeholder="username" required></input>
          <input disabled={loading} onChange={e=>setImage(e.target.value)} value={image} type="url" placeholder="picture url" required></input>
          <button disabled={loading} type="submit" >
            {loading?<BsThreeDots fontSize="50px"></BsThreeDots>:<>Sign Up</>}
          </button>
        </Form>
        <StyledLink to="/"><span>Switch back to log in</span></StyledLink>
      </FormContainer>
    </Container>  
  );
}


const Container = styled.div`
  height: 100%;
  background-color: #151515;

  @media (min-width: 800px) {
    display: flex;
    height: 1024px;
  }

`;
const Introduction = styled.div`
  font-weight: bold;
  letter-spacing: 0.05em;
  width: 100%;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Oswald', sans-serif;
  font-size: 23px;
  line-height: 34px;
  margin-bottom: 25px;

  div div:first-of-type{
    font-family: 'Passion One', cursive;
    font-size: 76px;
    line-height: 84px;
    letter-spacing: 0.05em;
    text-align: center;
    margin-top: 15px;
  }

  @media (min-width: 800px) {
    font-size: 43px;
    line-height: 64px;
    width: 60%;
    margin-bottom: 0px;
    justify-content: center;
      
    div div:first-of-type {
      text-align:start;
      font-size: 106px;
      line-height: 117px;
    }
  }
`;

const FormContainer = styled.div`
  height: 100%;
  width:  100%;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 800px) {
    width: 40%;
  }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 40px;
    align-items: center;
    
    input {
      width: 330px;
      height: 55px;
      border-radius: 6px;
      margin-bottom: 11px;
      font-family: 'Oswald', sans-serif;
      font-weight: bold;
      font-size: 22px;
      line-height: 33px;
      padding-left: 10px;
    }
    input::placeholder {
      color: #9f9f9f;
    }
    button {
      width: 330px;
      height: 55px;
      background: #1877F2;
      border-radius: 6px;
      color:#FFFFFF;
      font-weight: bold;
      font-size: 22px;
      line-height: 33px;
      font-family: 'Oswald', sans-serif;
    }

  @media (min-width: 800px) {
    input {
      width: 430px;
      height: 65px;
      font-size: 27px;
      line-height: 40px;
    }
    button {
      width: 430px;
      height: 65px;
      font-size: 27px;
      line-height: 40px;
    }
  }
`;

const StyledLink = styled(Link)`
  width: 330px;
  height: 55px;
  border-radius: 6px;
  color:#FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Lato', sans-serif;
  margin-bottom: 90px;
  span {
    padding-bottom: 2px;
    border-bottom: 1px solid #FFFFFF;
  }
  @media (min-width: 800px) {
      width: 430px;
      height: 65px;
      font-size: 27px;
      line-height: 40px;
  }
`;