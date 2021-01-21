import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from 'styled-components';
import HomeFeed from './HomeFeed';
import Notifications from './Notifications';
import Bookmarks from './Bookmarks';
import TweetDetails from './TweetDetails';
import Profile from './Profile';
import Sidebar from './Sidebar';
import GlobalStyles from "./GlobalStyles";
import { CurrentUserContext } from './CurrentUserContext';
import logo from './logo.svg'; 



const App = () => {
  const { currentUser, status } = useContext(CurrentUserContext);

  return (    
  <BrowserRouter> 
    <GlobalStyles />   
    <Wrapper>
      <Sidebar></Sidebar>   
      { status === "loading" ? <p>Loading...</p>  : (
      <Switch>
          <Route exact path="/">
            <HomeFeed />
          </Route>
          <Route exact path="/notifications">
            <Notifications />
          </Route>
          <Route exact path="/bookmarks">
            <Bookmarks/>
          </Route>
          <Route exact path="/tweet/:tweetId">
            <TweetDetails />
          </Route>
          <Route exact path="/:profileId">
            <Profile />
          </Route>
      </Switch>)}
    </Wrapper>
  </BrowserRouter>  );
};
const Wrapper = styled.div`
   display: flex; 
  
   max-width: 1200px;
   margin: 20px auto;  

`;

export default App;

