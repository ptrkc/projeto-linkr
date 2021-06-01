import styled from "styled-components";
import { HiSearch } from "react-icons/hi";
import { useState, useContext } from 'react';
import axios from 'axios';

import UserContext from "../../contexts/UserContexts";

export default function SearchBar(){

    const { user } = useContext(UserContext);

    const [userInput, setUserInput] = useState("");
    const [outline, setOutline] = useState(false);
    const [usersList, setUsersList] = useState();

    function searchPeople(event){
        event.preventDefault();

        const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
        };

        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/search?username=${userInput}`,config);
        request.then(response=>{
            console.log(response.data.users);
            setUsersList(response.data.users);
        });
        request.catch(error=> console.log(error.response));
    }
    function onFocusOutline(){
        setOutline(true);
    }
    function onBlurOutline(){
        setOutline(false);
    }

    console.log(usersList);
    return(
        
        <Container>
            <ContainerSearch onSubmit={searchPeople} onFocus={onFocusOutline} onBlur={onBlurOutline} outlineStatus={outline}>
                <form >  
                    <SearchInput 
                        onChange={e=>setUserInput(e.target.value)}
                        value={userInput}
                        type="text"
                        placeholder="Search for people and friends"
                    ></SearchInput>
                    <div><button type="submit"><HiSearch color="#C6C6C6" className="icon"/></button></div>
                </form>
            </ContainerSearch>
            <ContainerShow>
                {
                    usersList.map(item=><div>{item.username}</div>)
                }
            </ContainerShow>
        </Container>
    );
}
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #e7e7e7;
`;

const ContainerShow = styled.div`
    position: absolute;
    display: flex;
    top: 60px;
    flex-direction: column;
    width: 100%;
    color: #6d6d6d; 
    border: none;
    background-color: #e7e7e7;    
`;

const ContainerSearch = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    padding: 2px;
    border: ${props => props.outlineStatus? "2px solid white": "none"};

    > form {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 0;
        margin:0;
        
        > div {
            background-color: white;
            width: 40px;
            display: flex;
            height: 45px;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            border-radius: 0 8px 8px 0;

            button {
                background-color: white;
                border: none;
            }
        }
    }

    @media (max-width: 860px){
        width:100%;
        margin-left:5px;
        margin-right: 5px;
        > div{
            margin-right: 5px;
        }
    }
`;

const SearchInput = styled.input`
    width: 563px;
    height: 45px;
    left: 437px;
    top: 13px;
    background: #FFFFFF;
    border-radius: 8px 0 0 8px;
    border: none;
    padding-left: 17px;
    font-family: Lato;
    font-size: 19px;
    line-height: 23px;

    ::placeholder {
        color: #C6C6C6;
    }
    :focus {
        outline: none;
    }
    @media (max-width: 860px){
        width:100%;
    }
`;