import React, { useState, useContext, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Tweet from '../Tweet';
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
     
     homeFeedTweets.tweetIds.map((tweet)=>{     
        return (
          <Tweet 
            key={tweet}
            id={tweet}
            handle={homeFeedTweets.tweetsById[tweet].author.handle}  
            status={homeFeedTweets.tweetsById[tweet].status}
            name={homeFeedTweets.tweetsById[tweet].author.displayName}
            avatar={homeFeedTweets.tweetsById[tweet].author.avatarSrc} 
            date={homeFeedTweets.tweetsById[tweet].timestamp}
            media={homeFeedTweets.tweetsById[tweet].media}
            retweeted={homeFeedTweets.tweetsById[tweet].retweetFrom}
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