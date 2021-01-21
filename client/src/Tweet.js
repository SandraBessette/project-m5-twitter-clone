import React from 'react';
import styled from 'styled-components';
import moment from 'moment'

import Avatar  from "./assets/no-profile-pic-icon-27.jpg";




const Tweet = ({ handle, status, name, avatar, date })=> {   

    return (
        <>
            <Image src={avatar ? avatar : Avatar} alt="avatar"></Image>
            <p><strong>{name}</strong> <span>{ `@${handle} - ${moment(date).format("MMM Do")}`}</span></p>
            <p>{status}</p>
            <p>-----------</p>
        </>
    );

};

const Image = styled.img`
    width: 45px;
    height: 45px;
    border-radius: 50%;

`;

export default Tweet;