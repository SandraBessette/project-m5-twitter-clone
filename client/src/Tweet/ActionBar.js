import React from 'react';
import styled from 'styled-components';
import { FiMessageCircle, FiRepeat, FiHeart, FiShare } from "react-icons/fi";

import Action from './Action';


const ActionBar = ({id, numLikes, numRetweets, isLiked, isRetweeted, handleToggleLike})=>{ 

    const handleLikeClick =(ev)=>{
        console.log('isLiked', isLiked);
        ev.preventDefault();      
        fetch(`/api/tweet/${id}/like`, {
            method: "PUT",
            body: JSON.stringify({like: !isLiked}),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((json) => {
                if (json && json.success) {
                    handleToggleLike();  
                } 
            });
    };  

    return (
        <Wrapper>
            <Action color="rgb(27, 149, 224)" size={40} >                   
                <FiMessageCircle /> 
            </Action>  
            <ActionWrapper>   
                <Action color="rgb(23, 191, 99)" size={40} >
                    <FiRepeat color={isRetweeted ? 'rgb(23, 191, 99)' : 'inherit' }/> 
                </Action>
                <Number>{numRetweets ? numRetweets : null}</Number>
            </ActionWrapper>
            <ActionWrapper>
                <Action color="rgb(224, 36, 94)" size={40} onClick={handleLikeClick}> 
                    <FiHeart fill={isLiked ? 'rgb(224, 36, 94)' : 'none'} color={isLiked ? 'rgb(224, 36, 94)' : 'inherit'}/>
                </Action> 
                <Number>{numLikes ? numLikes : null}</Number>
            </ActionWrapper>
            <Action color="rgb(27, 149, 224)" size={40} > 
                <FiShare/>
            </Action>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 48px;
`; 

const ActionWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Number = styled.p`
    font-size: 13px;
    margin: 0 5px;
`;


export default ActionBar;