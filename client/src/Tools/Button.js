import React from 'react';
import styled from 'styled-components';
import { COLORS } from "../GlobalStyles";


const Button = ({color, fill, border, children })=>{
    return (       
        <ButtonStyled color={color} fill={fill} >{children}</ButtonStyled>        
    );

};

const ButtonStyled = styled.button`
    padding: 12px 20px;
    margin: 20px 0;
    border:  ${(p)=>(`solid 1px ${p.color}`)};
    border-radius: 30px;
    color: ${(p)=>p.color};
    background-color: ${(p)=>p.fill};
    width: 100%;
    font-size: inherit;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background-color: ${(p)=>(p.fill === 'white' ? COLORS.primaryLight : p.fill)};
    }

`;
export default Button;