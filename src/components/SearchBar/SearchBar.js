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
    const [tab, setTab] = useState(false);

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
            setTab(true);
        });
        request.catch(error=> console.log(error.response));
    }
    function onFocusOutline(){
        setOutline(true);
        setTab(true);
    }
    function onBlurOutline(){
        setOutline(false);
        setTab(false);

    }

    console.log(usersList);
    return(
        
        <Container>
            <ContainerSupport>
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
                <ContainerShow status={tab}>
                    {
                        usersList?
                            usersList.map(item=><div>{item.username}</div>)
                            :
                            <div>Bad</div>
                    }
                </ContainerShow>
            </ContainerSupport>
        </Container>
    );
}
const Container = styled.div`
    display: flex;
    flex-direction: column;    
    align-items: center;
    background-color: #e7e7e7;
      @media (max-width:374px){
        display:none;
    }
`;

const ContainerSupport = styled.div`
    position: absolute;
    top: 12px;
    border-radius: 8px 8px 0 0;
    //border: 1px solid green;
`;

const ContainerShow = styled.div`
    display:  ${props => props.status? "flex": "none"};;
    flex-direction: column;
    width: 100%;
    color: #6d6d6d; 
    border-radius:  0 0 8px 8px;
    background-color: #e7e7e7;   
    padding: 10px;
`;

const ContainerSearch = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px 8px 0 0;
    //border: 1px solid red;
    //border: ${props => props.outlineStatus? "2px solid #e7e7e7": "none"};

    > form {
        //border: 1px solid yellow;
        border-radius: 8px 8px 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        background-color: ${props => props.outlineStatus? "#e7e7e7": "transparent"};     
        
        > div {
            background-color: white;
            width: 35px;
            display: flex;
            height: 45px;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            border-radius: 0 8px 8px 0;

            button {
                display:flex;
                justify-content: center;
                align-items: center;
                background-color: white;
                border: none;
                width:40px;
            }
        }
    }

    @media (max-width: 860px){
        width: 300px;
        > div{
            margin-right: 5px;
        }
    }
    @media (max-width:560px){
        width:112px;
    }
`;

const SearchInput = styled.input`
    width: 563px;
    height: 45px;
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