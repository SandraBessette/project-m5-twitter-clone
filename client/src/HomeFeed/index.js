import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Tweet from '../Tweet';
import { COLORS } from "../GlobalStyles";

import { CurrentUserContext } from '../CurrentUserContext';

const HomeFeed = () => {
  //const { currentUser, status } = useContext(CurrentUserContext);
  const [homeFeedTweets, setHomeFeedTweets] = React.useState(null);
  const [status, setStatus] = React.useState("loading");

  useEffect(() => {        
    setStatus("loading");   
    fetch('api/me/home-feed')
    .then((res) => res.json())
    .then((json) => {
        
        
        if(json){
          setHomeFeedTweets({...json});
          setStatus("idle");        
        }
    
    });
  }   , []);

  
    return (
      <Wrapper>
    <div>HomeFeed</div>
   
    {homeFeedTweets === null ? <p>....</p> : (
     status === "idle" && homeFeedTweets.tweetIds.map((tweet)=>{     
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
  
  const Wrapper = styled.div`
    display: flex;
    flex-direction: column; 
  //  padding: 0 20px 20px 20px;   
    margin: 0 20px;
    border-left: solid 1px ${COLORS.lightGrey}; 
    border-right: solid 1px ${COLORS.lightGrey}; 
    
  `;
  
  export default HomeFeed;