import React, { useState, useContext, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Tweet from '../Tweet/Tweet';
import TweetPost from './TweetPost';
import { COLORS } from "../GlobalStyles";

import { CurrentUserContext } from '../CurrentUserContext';

const HomeFeed = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [homeFeedTweets, setHomeFeedTweets] = useState(null);

  const [status, setStatus] = React.useState("loading"); 

  const fetchHomeFeedTweet = useCallback(()=>{
    setStatus("loading");   
    fetch('api/me/home-feed')
    .then((res) => res.json())
    .then((json) => {    
        if(json){
          console.log(json);
          setHomeFeedTweets({...json});
          setStatus("idle");        
        }    
    });

  }, []);

  useEffect(() => {     
    fetchHomeFeedTweet();  
    
  }, [fetchHomeFeedTweet]);

  
    return (
      <Wrapper>    
      <TweetPost avatar={currentUser.profile.avatarSrc} fetchHomeFeedTweet={fetchHomeFeedTweet}></TweetPost>
   
    {homeFeedTweets === null ? <WaitingMessage>....</WaitingMessage> : (
     
     homeFeedTweets.tweetIds.map((tweetId)=>{ 
        const tweet = homeFeedTweets.tweetsById[tweetId];    
        return (
          <Tweet 
            key={tweetId}
            tweet={tweet}   
            fetchData={fetchHomeFeedTweet}        
            />         
          
        );
    }))}
   
    </Wrapper>
    
    );
  };

  const WaitingMessage = styled.p`
  display: block;
    width: auto;
  `;
  
  const Wrapper = styled.div`
    display: flex;
    flex-direction: column; 
  //  padding: 0 20px 20px 20px;   
    margin: 0 20px;
    border-left: solid 1px ${COLORS.lightGrey}; 
    border-right: solid 1px ${COLORS.lightGrey}; 
    
  `;
  
  export default HomeFeed;