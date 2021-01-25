import React, { useState, useContext, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Tweet from '../Tweet/Tweet';
import TweetPost from './TweetPost';
import Spinner from '../Spinner';
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
          console.log('HomrFeed fecht');
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
         <TitleWrapper>
            <h1>Home</h1>
        </TitleWrapper>    
      <TweetPost avatar={currentUser.profile.avatarSrc} fetchHomeFeedTweet={fetchHomeFeedTweet}></TweetPost>
   
    {homeFeedTweets === null ? <Spinner /> : (
     
     homeFeedTweets.tweetIds.map((tweetId)=>{ 
        const tweet = homeFeedTweets.tweetsById[tweetId];    
        return (
          <Tweet 
            key={tweetId}
            tweet={tweet}  
            />         
          
        );
    }))}
   
    </Wrapper>
    
    );
  };

  const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0 20px;    
    height: 50px;
    border-bottom: solid 1px ${COLORS.lightGrey};
    font-size: 20px;
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