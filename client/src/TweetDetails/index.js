import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";

import { COLORS } from "../GlobalStyles";
import SingleTweet from './SingleTweet';
import Action from '../Tweet/Action';


const TweetDetails = () => {
  const { tweetId } = useParams();
  const [tweetDetails, setTweetDetails] = useState(null);
  const [status, setStatus] = useState("loading");
  const history = useHistory(); 

  const fetchTweetDetails = useCallback(()=>{
    setStatus("loading");   
    fetch(`/api/tweet/${tweetId}`)
    .then((res) => res.json())
    .then((json) => {  
        if(json){
          setTweetDetails({...json});
          setStatus("idle");
         // console.log('Tweetjson', json.tweetIds);
        }    
    });

  }, [tweetId]);

  useEffect(() => {  
    fetchTweetDetails();   
  } , [fetchTweetDetails]);

    return (     
      <Wrapper>
         <TitleWrapper>
            <Action color="grey" size={40} onClick={()=>history.goBack()}>
              <ArrowIcon color='grey'/>
            </Action>
            <Title>Meow</Title>
        </TitleWrapper>   
      {tweetDetails === null ? <p>Tweet details....</p> : (
             
             <SingleTweet 
               key={tweetId}
               tweet={tweetDetails.tweet} 
               fetchData={fetchTweetDetails}              
               /> 
           )
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