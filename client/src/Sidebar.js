import React from 'react';
import styled from 'styled-components';
import { NavLink } from "react-router-dom";

import { ReactComponent as Logo } from "./assets/logo.svg";
import { FiHome, FiUser, FiBell, FiBookmark } from "react-icons/fi";
import { COLORS } from "./GlobalStyles";


const Sidebar = ()=>{
    console.log('icon', FiHome);
    return (
        <Wrapper> 
        <StyledLogo/>
        <NavBar >            
            <NavigationLink exact to="/" activeClassName='active'><Icon><FiHome/></Icon>Home</NavigationLink>
            <NavigationLink to="/abc" activeClassName='active'><Icon><FiUser/></Icon>Profile</NavigationLink>
            <NavigationLink to="/notifications" activeClassName='active'><Icon><FiBell/></Icon>Notifications</NavigationLink>
            <NavigationLink to="/bookmarks" activeClassName='active'><Icon><FiBookmark/></Icon>Bookmarks</NavigationLink>
        </NavBar >
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
   margin: 0 20px;
   min-width: 175px;
`;

const NavBar = styled.nav`
   display: flex;
   flex-direction: column; 
   font-weight: bold;

`;

const NavigationLink = styled(NavLink)`
  /* default styles here */
  text-decoration: none;
  margin: 5px 0px;
  border-radius: 30px;
  padding: 12px ;

  &.active {
    color: ${COLORS.primary};
  }

  &:hover {  
    color: ${COLORS.primary};  
    background-color: ${COLORS.hover};
   // opacity: 10%;
  }
`;

export default Sidebar;