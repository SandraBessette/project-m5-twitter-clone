import React from 'react';
import styled from 'styled-components';
import {Icon} from 'react-icons-kit';
import { u1F4A3 as bomb } from 'react-icons-kit/noto_emoji_regular/u1F4A3';

const Error = ({ message = 'error'})=>{

    return(
        <Wrapper>
            <Icon size={60} icon={bomb} />
            <Title>{message === 'error' ? 'An unknown error has occurred.' : message }</Title>
            <Text>Please try refreshing the page, or  <a href="/#">contact support</a> if the problem persist</Text>
        </Wrapper>
    );

};


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
    width: 100%;
    font-size: 20px;
`;

const Title = styled.h1`
    margin: 30px 0;
`;

const Text = styled.p`
    font-size: 16px;
`;

export default Error;