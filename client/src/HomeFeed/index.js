import React, { useState, useContext, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Tweet from '../Tweet/Tweet';
import TweetPost from './TweetPost';
import Spinner from '../Tools/Spinner';
import Error from '../Tools/Error';
import { COLORS } from "../GlobalStyles";

import { CurrentUserContext } from '../CurrentUserContext';

const HomeFeed = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [homeFeedTweets, setHomeFeedTweets] = useState(null);

  const [status, setStatus] = React.useState("loading"); 

  const handleErrorStatus = ()=>{  
    setStatus("error");
  }

  const fetchHomeFeedTweet = useCallback(()=>{
    setStatus("loading");   
    fetch('api/me/home-feed')
    .then((res) => res.json())
    .then((json) => {    
        if(json){     
          setHomeFeedTweets({...json});
          setStatus("idle");        
        } 
        else
          handleErrorStatus(); 
    })
    .catch((error)=>{    
      handleErrorStatus();
    })
  }, []);

  useEffect(() => {     
    fetchHomeFeedTweet();  
    
  }, [fetchHomeFeedTweet]);

  
    return (
      <Wrapper> 
         <TitleWrapper>
            <h1>Home</h1>
        </TitleWrapper>    
        <TweetPost 
          avatar={currentUser.profile.avatarSrc}
          fetchHomeFeedTweet={fetchHomeFeedTweet}
          handleErrorStatus={handleErrorStatus}>          
        </TweetPost>
        {status === "error" && <Error />}
        {status === "loading" && <Spinner />}
        {status === "idle" &&      
        homeFeedTweets.tweetIds.map((tweetId)=>{ 
            const tweet = homeFeedTweets.tweetsById[tweetId];    
            return (
              <Tweet 
                key={tweetId}
                tweet={tweet}  
                />         
              
            );
        })}   
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
    margin: 0 20px;
    border-left: solid 1px ${COLORS.lightGrey}; 
    border-right: solid 1px ${COLORS.lightGrey}; 
    
  `;
  
  export default HomeFeed;