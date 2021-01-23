import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Tweet from '../Tweet';
import ProfileTop from './ProfileTop';
import { COLORS } from "../GlobalStyles";

import { CurrentUserContext } from '../CurrentUserContext';

const Profile = () => {
  //const { currentUser, status } = useContext(CurrentUserContext);
  const { profileId } = useParams();
  const [profileTweets, setProfileTweets] = React.useState(null);
  const [profileInfo, setProfileInfo] = React.useState(null);
  const [status, setStatus] = React.useState("loading");

  

  useEffect(() => {        
    setStatus("loading");   
    fetch(`/api/${profileId}/profile`)
    .then((res) => res.json())
    .then((json) => {      
     
        if(json){
          setProfileInfo({...json});
          setStatus("idle");
          console.log('ProfileInfo', json);
        }
    
    });
  }   , [profileId]);

  useEffect(() => {        
    setStatus("loading");   
    fetch(`/api/${profileId}/feed`)
    .then((res) => res.json())
    .then((json) => {       
        
        if(json){
          setProfileTweets({...json});
          setStatus("idle");
     
        }
    
    });
  }   , [profileId]);

  //   
    return (
      <Wrapper>
        {profileTweets === null || profileInfo === null ? <p>....</p> : (
        <>
          <ProfileTop profileInfo={profileInfo.profile} /> 
          { profileTweets.tweetIds.map((tweet)=>{     
              return (
                <Tweet 
                  key={tweet}
                  id={tweet}
                  handle={profileTweets.tweetsById[tweet].author.handle}  
                  status={profileTweets.tweetsById[tweet].status}
                  name={profileTweets.tweetsById[tweet].author.displayName}
                  avatar={profileTweets.tweetsById[tweet].author.avatarSrc} 
                  date={profileTweets.tweetsById[tweet].timestamp}
                  media={profileTweets.tweetsById[tweet].media}
                  retweeted={profileTweets.tweetsById[tweet].retweetFrom}
                  />  
                )
            })     
          }  
       </> )}       
    </Wrapper>    
    );
  };
  
  const Wrapper = styled.div`
    display: flex;
    flex-direction: column; 
    //padding: 0 20px 20px 20px;  
    margin: 0 20px;
    border-left: solid 1px ${COLORS.lightGrey}; 
    border-right: solid 1px ${COLORS.lightGrey}; 
    
  `;
  
  export default Profile;