import styled from "styled-components";
import { HiSearch } from "react-icons/hi";
import React, { useState, useContext } from 'react';
import axios from 'axios';
import {useHistory} from "react-router-dom";

import UserContext from "../../contexts/UserContexts";
import {DebounceInput} from 'react-debounce-input';

export default function SearchBar(){

    const { user } = useContext(UserContext);
    const history = useHistory();

    const [userInput, setUserInput] = useState();
    const [orderedUsers, setOrderedUsers] = useState();
    const [tab, setTab] = useState(false);
    const [input, setInput] =useState(false);

    function searchPeople(event){
        if(event.type === "submit"){
            event.preventDefault();
        }

        let param = userInput;
        if(event.target.value!==undefined){
            param = event.target.value;
        }
        const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
        };

        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/search?username=${param}`,config);
        request.then(response=>{
            if(response.data.users.length>0){
                setTab(true);
            }
            const iFollowArray = response.data.users.filter(item=>item.isFollowingLoggedUser);
            const iDontFollowArray = response.data.users.filter(item=>!item.isFollowingLoggedUser);
            setOrderedUsers(iFollowArray.concat(iDontFollowArray));
        });
        request.catch(error=>alert(error.response.data.message));
    }
    function onFocusInput(){
        setInput(true); 
    }
    function onBlurInput(){
        setInput(false);

    }
    function goToUserPage(event,id){
        event.preventDefault();
        history.push(`/user/${id}`);
    }
    return(
        
        <Container>
            <ContainerSupport>
                <ContainerSearch onSubmit={searchPeople} onFocus={onFocusInput} onBlur={onBlurInput} inputStatus={input} tabStatus={tab}>
                    <form >
                        <DebounceInput className="search-input" onSubmit={searchPeople}
                            placeholder="Search for people and friends"
                            minLength={3}
                            debounceTimeout={500}
                            onChange={event => {
                                setUserInput(event.target.value);
                                if(this){
                                    this.setState({value: event.target.value});
                                }
                                if(event.target.value.length>2){
                                    searchPeople(event);   
                                }                             
                            }}
                            type="text"
                            value={userInput} 
                        />
                        <div><button type="submit"><HiSearch color="#C6C6C6" className="icon"/></button></div>
                    </form>
                </ContainerSearch>
                <ContainerShow tabStatus={tab} inputStatus={input}>
                    {
                        orderedUsers?
                            orderedUsers.map(item=><a 
                                key={item.id}
                                onMouseDown={(event)=>goToUserPage(event,item.id)}
                                href={`/user/${item.id}`}
                            >
                                <Avatar url={item.avatar}/>
                                <div>
                                    <div>{item.username}</div>
                                    <div>{item.isFollowingLoggedUser?
                                        <div>● following</div>
                                        :
                                        null
                                    }
                                    </div>
                                </div>
                            </a>)
                            :
                            null
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
    display:  ${props => props.inputStatus? "flex": "none"};
    flex-direction: column;
    width: 100%;
    color: #6d6d6d; 
    border-radius:  0 0 8px 8px;
    background-color: #e7e7e7;   
    padding: ${props => props.tabStatus? "17px": "0"};

    > a {
        padding: 4px 0;
        display: flex;
        align-items: center;

        > div {
            display: flex;
            align-items: center;
            font-family: Lato;
            font-size: 19px;
            line-height: 23px;
            color: #515151;

            div {
                margin-left: 10px;
            }            
            
            div:last-of-type {
                color: #C5C5C5;  
            }
        }
    }
`;

const ContainerSearch = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px 8px 0 0;
    //border: 1px solid red;

    .search-input{
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
    }

    > form {
        //border: 1px solid yellow;
        border-radius: 8px 8px 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        background-color: ${props => props.tabStatus? "#e7e7e7": "transparent"};     
        
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
                width:32px;
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

  
const Avatar = styled.div`
 background-image: url(${(props) => props.url});
 width: 40px;
 height: 40px;;
 border-radius: 26.5px;
 background-size: cover;
 background-position: center;
 top: 0;
 right: 0;
 margin-right: 4px; 
`;