import React from 'react';
import styled from 'styled-components';
import { COLORS } from "../GlobalStyles";


const Media = () => {
    return < Wrapper>Media</ Wrapper>;
  };

  const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
    width:100%;
    border-left: solid 1px ${COLORS.lightGrey}; 
    border-right: solid 1px ${COLORS.lightGrey}; 
  
  `;
  
  
  export default Media;