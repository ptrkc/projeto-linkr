import axios from 'axios';
import {useEffect, useContext, useState} from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import UserContext from "../../contexts/UserContexts";

export default function Trending(){
    
    const {user} = useContext(UserContext);
    const [trendingList, setTrendingList] = useState([]);
    let history = useHistory();

    console.log(trendingList);
    useEffect(() => {
        const config = {
            headers: {
                "Authorization": `Bearer ${user?user.token:""}`
            }
        }
		const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/trending",config);
        request.then(response=>{
            const hashtags=response.data.hashtags;

            setTrendingList(hashtags);
        });
        request.catch(error=>console.log(error));
	},[user]);

    function goToHashtag(name){
        history.push("/hashtag/"+name);
    }

    return(
        <Container>
            <Title>trending</Title>
            <ContainerList>
                {trendingList.length>0?trendingList.map(item=><div onClick={()=>goToHashtag(item.name)}># {item.name}</div>):<></>}
            </ContainerList>
        </Container>);
}

const Container = styled.div`
    
`;

const Title = styled.div`
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
    font-size: 27px;
    line-height: 40px;
    display: flex;
    border-bottom: 1px solid #484848;
    padding: 16px;
`;

const ContainerList = styled.div`
    font-family: 'Lato', sans-serif;
    font-weight: bold;
    font-size: 19px;
    line-height: 23px;
    letter-spacing: 0.05em;
    padding: 26px 16px;
    
    div {
        margin-bottom: 5px;
    }
`;