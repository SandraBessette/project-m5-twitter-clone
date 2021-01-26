import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from './CurrentUserContext';
import { ReactComponent as Logo } from "./assets/logo.svg";
import { FiHome, FiUser, FiBell, FiBookmark } from "react-icons/fi";
import { COLORS } from "./GlobalStyles";

import Button from './Tools/Button';

const Sidebar = ()=>{   
    const { currentUser } = useContext(CurrentUserContext);

    return (
        <Wrapper> 
        <StyledLogo/>
        <NavBar >            
            <NavigationLink exact to="/" activeClassName='active'><Icon><FiHome size={25}/></Icon>Home</NavigationLink>
            <NavigationLink exact to={`/${currentUser ? currentUser.profile.handle : ""}`} activeClassName='active'><Icon><FiUser size={25}/></Icon>Profile</NavigationLink>
            <NavigationLink exact to="/notifications" activeClassName='active'><Icon><FiBell size={25}/></Icon>Notifications</NavigationLink>
            <NavigationLink exact to="/bookmarks" activeClassName='active'><Icon><FiBookmark size={25}/></Icon>Bookmarks</NavigationLink>
        </NavBar >
        <Button color={'white'} fill={COLORS.primary}>Meow</Button>
        </Wrapper>
    );
};

const StyledLogo = styled(Logo)`
    height: 40px;
    width: 40px;
`;

const Icon = styled.span`
    margin-right: 15px;
`;

const Wrapper = styled.div`
   margin: 20px 0;
   min-width: 175px;
   box-sizing:border-box;
`;

const NavBar = styled.nav`
   display: flex;
   flex-direction: column; 
   font-weight: bold;
   margin-top: 7px;

`;

const NavigationLink = styled(NavLink)`
  /* default styles here */
  text-decoration: none;
  margin: 5px 0px;
  border-radius: 30px;
  padding: 10px ;
  display: flex;
  align-items:center;

  &.active {
    color: ${COLORS.primary};
  }

  &:hover {  
    color: ${COLORS.primary};  
    background-color: ${COLORS.primaryLight}; 
  }
`;

export default Sidebar;