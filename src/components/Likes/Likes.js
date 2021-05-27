import styled from 'styled-components';
import axios from 'axios';
import {useState, useContext, useEffect} from 'react';

import { BiHeart } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import ReactTooltip from "react-tooltip";

import UserContext from "../../contexts/UserContexts";

export default function Likes({ post}){
    const {user} = useContext(UserContext);

    const [likes, setLikes] = useState(post.likes);
    const [tooltip, setTooltip] = useState(null);

    function likeThis(){
        console.log(likes);

        const config = {
                headers:{
                    Authorization: `Bearer ${user.token}`
                }
            };

        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}/like`,{},config);
        
        request.then(response=>{
            const newLikes = response.data.post.likes.map(item=>({"userId": item.userId,"user.username":item.username}));
            setLikes(newLikes);
            ReactTooltip.rebuild();
        });
        request.catch(error=>console.log(error));
    }

    function dislikeThis(){
        console.log(likes);

        const config = {
                headers:{
                    Authorization: `Bearer ${user.token}`
                }
            };

        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${post.id}/dislike`,{},config);
    
        request.then(response=>{
            setLikes(response.data.post.likes);
            ReactTooltip.rebuild();
        });
        request.catch(error=>console.log(error));
    }

    useEffect(() => {
        const notMe = likes.filter(item=>item.userId!==user.id);
        const namesNotMine = notMe.map(item=>item["user.username"]);
        ReactTooltip.rebuild();
            
        if(likes.filter(item => item.userId===user.id).length>0){
            if(namesNotMine.length===0){
                setTooltip("Você");
            }
            if(namesNotMine.length===1){
                setTooltip("Você e "+namesNotMine[0]);
            }else if(namesNotMine.length===2){
                setTooltip("Você, "+namesNotMine[0]+" e outra pessoa");
            }else if (namesNotMine.length>2){
                setTooltip("Você, "+namesNotMine[0]+" e outras "+(likes.length-2)+" pessoas");
            }
        }else {
            if(namesNotMine.length===0){
                setTooltip(null);
            }
            if(namesNotMine.length===1){
                setTooltip(namesNotMine[0]);
            }else if(namesNotMine.length===2){
                setTooltip(namesNotMine[0]+" e "+namesNotMine[1]);
            }else if (namesNotMine.length===3){
                setTooltip(namesNotMine[0]+", "+namesNotMine[1]+", e outra pessoas");
            }   
            else if(namesNotMine.length>3){
                setTooltip(namesNotMine[0]+", "+namesNotMine[1]+", e outras "+(likes.length-2)+ " pessoas");
            }
        }
	},[likes, user.id]);
   

    return(
        <Container>
            {likes.filter(item => item.userId===user.id).length>0?  
                <FaHeart color="red" onClick={dislikeThis}/>
                :  
                <BiHeart onClick={likeThis}/>
            }
            <LikesCounter data-for="builder" data-tip={tooltip}>{likes.length} {likes.length>1?"likes":"like"}</LikesCounter>
            <ReactTooltip id="builder"place="top" type="dark" effect="solid"/>
        </Container>      
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LikesCounter = styled.div`
    margin-top: 5px;
    font-size: 11px;
    line-height: 13px;
    color: #fff;
`;
    