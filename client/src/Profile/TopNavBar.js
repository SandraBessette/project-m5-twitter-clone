import React from 'react';
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import { COLORS } from "../GlobalStyles";


const TopNavBar = ({profileId})=>{
    return (       
        <NavBar >            
            <StyledNavLink exact to={`/${profileId}`} activeClassName='active'>Tweets</StyledNavLink>
            <StyledNavLink to={`/${profileId}/media`} activeClassName='active'>Media</StyledNavLink>
            <StyledNavLink exact to={`/${profileId}/likes`} activeClassName='active'>Likes</StyledNavLink>           
        </NavBar >
     );
};


const NavBar = styled.nav`
   display: flex;  
   font-weight: bold;
   width: 100%;
   margin-bottom: 7px;
`;

const StyledNavLink = styled(NavLink)` 
  text-decoration: none;
  width: 100%;
  text-align: center;
  padding: 12px 0 30px 0;
  color: black;
  border-bottom: solid 2px ${COLORS.lightGrey}; 

  &.active {
    color: ${COLORS.primary};
    border-bottom: solid 2px ${COLORS.primary};
  }

  &:hover {  
    color: ${COLORS.primary};
    border-bottom: solid 2px ${COLORS.primary}; 
  }
`;

export default TopNavBar;