import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Tweet from '../Tweet/Tweet';
import ProfileTop from './ProfileTop';
import Spinner from '../Spinner';
import Error from '../Error';
import { COLORS } from "../GlobalStyles";


const Profile = () => {
  const { profileId } = useParams();
  const [profileTweets, setProfileTweets] = React.useState(null);
  const [profileInfo, setProfileInfo] = React.useState(null);
  const [statusProfile, setStatusProfile] = React.useState("loading");
  const [statusFeed, setStatusFeed] = React.useState("loading");
 
  useEffect(() => {        
    setStatusProfile("loading");   
    fetch(`/api/${profileId}/profile`)
    .then((res) => res.json())
    .then((json) => {      
        const { error } = json;
        if (json && json.profile){
          setProfileInfo({...json});
          setStatusProfile("idle");
          console.log('ProfileInfo fect');
        }
        else if (error) {
          console.log('profileerror', error);
          setStatusProfile(error);
        }    
    });
  }   , [profileId]);


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
  } , [profileId]);

  //   
    return (
      <Wrapper>
        { (statusProfile !== 'loading' && statusProfile !== 'idle') && <Error message={statusProfile}/>}      
        { (statusProfile === 'loading' || statusFeed === "loading") && <Spinner />}
        { (statusProfile === 'idle' && statusFeed === "idle") &&
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
       </> }  
       
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