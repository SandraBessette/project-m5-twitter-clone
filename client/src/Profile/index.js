import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Tweet from '../Tweet/Tweet';
import ProfileTop from './ProfileTop';
import Spinner from '../Spinner';
import { COLORS } from "../GlobalStyles";


const Profile = () => {
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
          console.log('ProfileInfo fect');
        }
    
    });
  }   , [profileId]);


  useEffect(() => {   
    setStatus("loading");   
    fetch(`/api/${profileId}/feed`)
    .then((res) => res.json())
    .then((json) => {
        if(json){
          console.log('Profile feed fecht');
          setProfileTweets({...json});
          setStatus("idle");     
        }    
    });       
  } , [profileId]);

  //   
    return (
      <Wrapper>
        {profileTweets === null || profileInfo === null ? <Spinner /> : (
        <>
          <ProfileTop profileInfo={profileInfo.profile} /> 
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
       </> )}       
    </Wrapper>    
    );
  };
  
  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;   
    margin: 0 20px;
    border-left: solid 1px ${COLORS.lightGrey}; 
    border-right: solid 1px ${COLORS.lightGrey}; 
    width: 100%;
    
  `;
  
  export default Profile;