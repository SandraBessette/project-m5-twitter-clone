import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ImSpinner9 } from "react-icons/im";

const Spinner = ()=>{

    return(
        <Wrapper>
            <SpinnerIcon color='DarkGray' size={35}/>
        </Wrapper>
    );
};

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10%; 
    width: 100%; 
    
`;

const SpinnerIcon = styled(ImSpinner9)`
    animation: ${spin} 2s infinite linear;
`;



export default Spinner;