import React from 'react';
import styled from 'styled-components';

const Stats = ( {num, children} )=> {  

    return (
        <Wrapper>
            <p><strong>{num}</strong> <Type>{children}</Type></p>
        </Wrapper>        
    );
};

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    height: 48px;
    margin-right: 25px;    
    font-size: 15px;
`;

const Type = styled.span`
    color: rgb(101, 119, 134);
    //font-size: 14px;
`;

export default Stats;