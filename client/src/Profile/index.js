import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Router, Switch, Route, useParams, useHistory } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import Spinner from '../Spinner';
import Error from '../Error';
import TopNavBar from './TopNavBar';
import Media from './Media';
import Likes from './Likes';
import ProfileFeed from './ProfileFeed';
import { COLORS } from "../GlobalStyles";


const Profile = () => {
  const { profileId } = useParams();
  const [profileTweets, setProfileTweets] = useState(null);
  const [profileInfo, setProfileInfo] = useState(null);
  const [statusProfile, setStatusProfile] = useState("loading");
  const [statusFeed, setStatusFeed] = useState("loading");
  const history = useHistory();
 
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

  //   basename={`/${profileId}`}
    return ( 
    < Router history={history}>    
      <Wrapper>
        { (statusProfile !== 'loading' && statusProfile !== 'idle') && <Error message={statusProfile}/>}      
        { (statusProfile === 'loading' || statusFeed === "loading") && <Spinner />}
        { (statusProfile === 'idle' && statusFeed === "idle") &&
        <>
          <ProfileTop profileInfo={profileInfo.profile} /> 
          <TopNavBar profileId={profileId}/>
          <Switch>        
            <Route exact path={`/${profileId}/likes`}>
              <Likes/>
            </Route>
            <Route path={`/${profileId}/media`}>
              <Media />
            </Route>
            <Route exact path={`/${profileId}`}>
              <ProfileFeed profileTweets={profileTweets}/>
            </Route>
          </Switch>          
       </> }         
    </Wrapper>  
   </Router>  
     
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