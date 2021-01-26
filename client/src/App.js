import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from 'styled-components';
import HomeFeed from './HomeFeed';
import Notifications from './Notifications';
import Bookmarks from './Bookmarks';
import TweetDetails from './TweetDetails';
import Profile from './Profile';
import Sidebar from './Sidebar';
import Spinner from './Tools/Spinner';
import Error from './Tools/Error';
import GlobalStyles from "./GlobalStyles";
import { CurrentUserContext } from './CurrentUserContext';

const App = () => {
  const { status } = useContext(CurrentUserContext);

  return (    
  <BrowserRouter> 
    <GlobalStyles />   
    <Wrapper>    
      <Sidebar></Sidebar>       
      { status === "loading" && <Spinner /> }
      { status === "error" && <Error /> } 
      { status === "idle" &&  

      <>
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
          <Route path="/:profileId">
            <Profile />
          </Route>
      </Switch>
      </>}
    </Wrapper>
  </BrowserRouter>  );
};

const Wrapper = styled.div`
   display: flex; 
   max-width: 950px;
   box-sizing: border-box;  
   margin: 0px auto; 
   padding: 0px 20px 20px 20px;   
`;

export default App;
