import React from 'react';
import styled from 'styled-components';
import { COLORS } from "../GlobalStyles";


const Likes = () => {
    return < Wrapper>Likes</ Wrapper>;
  };

  const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
    width:100%;
    height: 200px;
    border-left: solid 1px ${COLORS.lightGrey}; 
    border-right: solid 1px ${COLORS.lightGrey}; 
  
  `;
  
  
  export default Likes;