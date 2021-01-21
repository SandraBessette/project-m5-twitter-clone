import React from 'react';
import styled from 'styled-components';
import { AiOutlineRetweet } from "react-icons/ai";
import moment from 'moment'

//import Avatar  from "./assets/no-profile-pic-icon-27.jpg";




const Tweet = ({ handle, status, name, avatar, date, media, retweeted })=> {  
    const isMedia = media.length !== 0 && media[0].type === 'img' ? true : false;
    const isRetweeted = retweeted ? true : false;
    console.log('retweeted', retweeted);
    return (
        <>
        {isRetweeted &&
            <Retweet><AiOutlineRetweet/> {`${retweeted.displayName} Remeowed`}</Retweet>}
        <Wrapper>
            < Avatar src={avatar} alt="avatar" />
            <div>            
                <p><strong>{name}</strong> <Span>{ `@${handle} - ${moment(date).format("MMM Do")}`}</Span></p>
                <Status>{status}</Status>
                {isMedia &&
                <Media src={media[0].url} alt="media" /> }
            </div>
        </Wrapper>
        </>
    );

};

const Wrapper = styled.div`
    display: flex;
    padding: 15px 0 20px 0;   
`;

const Avatar = styled.img`
    width: 55px;
    height: 55px;
    border-radius: 50%;
    margin-right: 15px;
`;

const Media = styled.img`  
    width: 100%;
    height: 400px;   
    object-fit: cover;
    border-radius: 20px; 
`;
const Span = styled.span`
    color: gray;
    font-size: 14px;
`;

const Retweet = styled(Span)`
    margin-left: 40px;
`;

const Status = styled.p`
    margin: 15px 0px;

`;


export default Tweet;