import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Tweet from '../Tweet';

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
          console.log('Tweetjson', json.tweetIds);
        }
        /*setStatus("idle"); 
        if(json){
          setCurrentUser({...json});
        }*/
      /*const { status, data, message } = json; 
      if (status === 200) {
        setUserReservation({...data});
        setSubStatus("confirmed");   
      }
      else {
        setSubStatus("error"); 
        window.localStorage.clear();
        console.log(message)
      };*/
    });
  }   , []);


    return (
      <Wrapper>
    <div>HomeFeed</div>
    <WrapperTweet>
    {homeFeedTweets === null ? <p>....</p> : (
     status === "idle" && homeFeedTweets.tweetIds.map((tweet)=>{
        return (
          <Tweet 
            key={tweet}
            handle={homeFeedTweets.tweetsById[tweet].author.handle}  
            status={homeFeedTweets.tweetsById[tweet].status}
            name={homeFeedTweets.tweetsById[tweet].author.displayName}
            avatar={homeFeedTweets.tweetsById[tweet].author.avatarSrc} 
            date={homeFeedTweets.tweetsById[tweet].timestamp}
            />         
          
        );
    }))}
    </WrapperTweet>
    </Wrapper>
    
    );
  };
  
  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;  
  `;

  const WrapperTweet = styled.div`
    display: flex;
    flex-direction: column;  
  `;
  
  export default HomeFeed;