import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import SingleTweet from './SingleTweet';


const TweetDetails = () => {
  const { tweetId } = useParams();
  const [tweetDetails, setTweetDetails] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {        
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
  }   , []);


    return (
      <>
      {tweetDetails === null ? <p>Tweet details....</p> : (
        
             <SingleTweet 
               key={tweetId}
               id={tweetId}
               handle={tweetDetails.tweet.author.handle}  
               status={tweetDetails.tweet.status}
               name={tweetDetails.tweet.author.displayName}
               avatar={tweetDetails.tweet.author.avatarSrc} 
               date={tweetDetails.tweet.timestamp}
               media={tweetDetails.tweet.media}
               retweeted={tweetDetails.tweet.retweetFrom}
               />         
             
           )
       }
      </>
    );
  };
  
  
  export default TweetDetails;