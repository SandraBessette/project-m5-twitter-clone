import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";

import { COLORS } from "../GlobalStyles";
import SingleTweet from './SingleTweet';
import Action from '../Tweet/Action';
import Spinner from '../Tools/Spinner';
import Error from '../Tools/Error';


const TweetDetails = () => { 
  const [tweetDetails, setTweetDetails] = useState(null);
  const [status, setStatus] = useState("loading");
  const { tweetId } = useParams();
  const history = useHistory(); 

  useEffect(() => {  
    setStatus("loading");   
    fetch(`/api/tweet/${tweetId}`)
    .then((res) => res.json())
    .then((json) => {  
        if(json){   
          setTweetDetails({...json});
          setStatus("idle");        
        } 
        else  
          setStatus("error"); 
    })
    .catch(()=>{    
      setStatus("error");
    })
  } , [tweetId]);

    return (     
      <Wrapper>
         <TitleWrapper>
            <Action color="grey" size={40} onClick={()=>history.goBack()}>
              <ArrowIcon color='grey'/>
            </Action>
            <Title>Meow</Title>
        </TitleWrapper>   
        {status === "error" && <Error />}
        {status === "loading" && <Spinner />}
        {status === "idle" &&
             <SingleTweet 
               key={tweetId}
               tweet={tweetDetails.tweet}                         
               /> 
       }
      </Wrapper>
    );
  };
  

  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;  
    margin: 0 20px;    
    width: 100%;
  `;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;    
  height: 50px;
  border-right: solid 1px ${COLORS.lightGrey};     
  border-left: solid 1px ${COLORS.lightGrey}; 
  font-size: 20px;
  `;

const Title = styled.h1`
  margin: 0 20px;
`;
const ArrowIcon = styled(BiArrowBack)`
  width: 20px;
  height: 20px;
`;
  
  export default TweetDetails;