import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { COLORS } from "../GlobalStyles";
import SingleTweet from './SingleTweet';


const TweetDetails = () => {
  const { tweetId } = useParams();
  const [tweetDetails, setTweetDetails] = useState(null);
  const [status, setStatus] = useState("loading");

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
  //  padding: 0 20px 20px 20px;   
    margin: 0 20px;
    border: solid 1px ${COLORS.lightGrey};     
    
  `;
  
  export default TweetDetails;