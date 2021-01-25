import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useHistory } from "react-router-dom";
import ActionBar from '../Tweet/ActionBar';
import Stats from './Stats';

import { COLORS } from "../GlobalStyles";

const SingleTweet = ({ tweet, fetchData })=> { 
    const {
        id, 
        author,
        timestamp,
        media,
        retweetFrom,
        isLiked,
        isRetweeted,
        numLikes,
        numRetweets,
        status
    } = tweet;

    const history = useHistory(); 
    const isMedia = media.length !== 0 && media[0].type === 'img' ? true : false;
    const isRetweetedFrom = retweetFrom ? true : false;

    const onClickLink = (ev)=>{       
        ev.preventDefault();
        history.push(`/${author.handle}`);
    };

    return (                 
            <WrapperContent>
                <Top>
                    < Avatar src={author.avatarSrc} alt="avatar" />
                    <Identification>
                        <p><Name onClick={onClickLink}><strong>{author.displayName}</strong></Name></p>
                        <Handle >{`@${author.handle}`}</Handle >
                    </Identification>
                </Top>
                <div> 
                    <Status>{status}</Status>
                    {isMedia &&
                    <Media src={media[0].url} alt="media" /> }
                    <Date>{ `${moment(timestamp).format('h:mm A · MMM D YYYY')} · critter web app`}</Date>
                </div>
                { (numLikes !== 0 || numRetweets !== 0) && 
                 <>
                    <Divider />               
                    <StatsWrapper>
                        <Stats num={numRetweets} >Retweets</Stats> 
                        <Stats num={numLikes} >Likes</Stats> 
                    </StatsWrapper>
                </> }
                 <Divider />                 
                <ActionBar 
                    id={id}                    
                    isLiked={isLiked}
                    isRetweeted={isRetweeted}
                    fetchData={fetchData} />           
            </WrapperContent>
       
    );

};

const Top = styled.div`
    display: flex;
   // cursor: pointer;  
`;

const Identification = styled.div`
    display: flex;
    flex-direction:column;
    justify-content:center; 
`;

const Name = styled.span`
    &:hover {
        cursor: pointer;  
        text-decoration: underline;
    }
`;

const Handle = styled.p`
    color: grey;
    font-size: 14px;  
`;

const Date = styled.p`
    color: grey;
    margin: 15px 0;
    font-size: 15px;  
    
`;

const WrapperContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px 15px 0 15px; 
    border: solid 1px ${COLORS.lightGrey};        
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

const Status = styled.p`
    margin: 15px 0px;
    font-size: 18px;  
`;

const StatsWrapper = styled.div`
  display: flex;
`;

const Divider = styled.div`
     height: 1px;
    background: ${COLORS.lightGrey};
`;

export default SingleTweet;