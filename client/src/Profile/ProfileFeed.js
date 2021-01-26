import React, {useState, useEffect} from 'react';
import Tweet from '../Tweet/Tweet';



const ProfileFeed = ({profileTweets}) => {
    /*const [profileTweets, setProfileTweets] = useState(null);

    useEffect(() => {   
        setStatusFeed("loading");   
        fetch(`/api/${profileId}/feed`)
        .then((res) => res.json())
        .then((json) => {
            if(json){
              console.log('Profile feed fecht', json);
              setProfileTweets({...json});
              setStatusFeed("idle");     
            } 
        })       
      } , [profileId]);*/

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