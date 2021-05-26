import {useHistory, Link} from 'react-router-dom';
import styled from 'styled-components';
import {useState, useContext, useEffect} from 'react';
import axios from 'axios';

import UserContext from "../../contexts/UserContexts";

export default function Login() {

  let history = useHistory();
  const {setUser} = useContext(UserContext); 

  useEffect(() => {
		if(localStorage.user){
      const userStorage = JSON.parse(localStorage.user);
      setUser(userStorage);
      history.push("/timeline");  
    }
	});
     
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function userLogin(event){
    event.preventDefault();
    if(email.length > 0 && password.length > 0){
      setLoading(true);

      const body = {
        email,
        password
      }   

      const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-in", body);
      request.then(response=>{

        setUser({
          id: response.data.user.id,
          token: response.data.token,
          username: response.data.user.username,
          avatar: response.data.user.avatar
        });

        localStorage.setItem('user', JSON.stringify({
          id: response.data.user.id,
          token: response.data.token,
          username: response.data.user.username,
          avatar: response.data.user.avatar
        }));

        history.push("/timeline");
      });
      request.catch(error=>{
        alert("Email/senha incorretos.");
        setLoading(false);
      });
    } else {
      alert("Preencha todos os campos!");
    }
    
  }
  return (
    <>
      <Container>   
        <Introduction>
          <div>
            <div>linkr</div>
            <div>save, share and discover<br></br>the best links on the web</div>
          </div>
        </Introduction>
        <FormContainer>
          <Form onSubmit={userLogin}>
            <input disabled={loading} onChange={e=>setEmail(e.target.value)} value={email}type="email" placeholder="e-mail" required></input>
            <input disabled={loading} onChange={e=>setPassword(e.target.value)} value={password} type="password" placeholder="password" required></input>
            <button disabled={loading} type="submit">Log In</button>
          </Form>
          <StyledLink to="/sign-up"><span>First time? Create an account!</span></StyledLink>
        </FormContainer>
      </Container>  
    </>
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