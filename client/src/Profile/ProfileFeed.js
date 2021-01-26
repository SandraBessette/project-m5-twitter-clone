import React from 'react';
import Tweet from '../Tweet/Tweet';


const ProfileFeed = ({profileTweets}) => {  
    return (
        <div>
            { profileTweets.tweetIds.map((tweetId)=>{ 
             const tweet = profileTweets.tweetsById[tweetId];        
              return (
                <Tweet 
                  key={tweetId}
                  tweet={tweet}                                       
                  />  
                )
            })     
          }  
        </div>
    );
  };
  
  
  export default ProfileFeed;