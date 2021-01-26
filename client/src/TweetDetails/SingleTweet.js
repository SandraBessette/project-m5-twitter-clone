import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { AiOutlineRetweet } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import ActionBar from '../Tweet/ActionBar';
import Stats from './Stats';
import useLikes from '../hooks/use-Likes.hook';

import { COLORS } from "../GlobalStyles";

const SingleTweet = ({ tweet })=> { 
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

    const [isLikedState, numLikesState, handleToggleLike] = useLikes(isLiked, numLikes); 
    
    const isMedia = media.length !== 0 && media[0].type === 'img' ? true : false;
    const isRetweetedFrom = retweetFrom ? true : false;    
    return (                 
            <WrapperContent>
                {isRetweetedFrom &&
                    <Retweet><AiOutlineRetweet/> {`${retweetFrom.displayName} Remeowed`}</Retweet>}
                <Top>
                    < Avatar src={author.avatarSrc} alt="avatar" />
                    <Identification>
                        <LinkStyled aria-label="View profile" exact to={`/${author.handle}`}><strong>{author.displayName}</strong></LinkStyled>
                        <Handle >{`@${author.handle}`}</Handle >
                    </Identification>
                </Top>
                <div> 
                    <Status>{status}</Status>
                    {isMedia &&
                    <Media src={media[0].url} alt="media" /> }
                    <Date>{ `${moment(timestamp).format('h:mm A · MMM D YYYY')} · critter web app`}</Date>
                </div>
                { (numLikesState !== 0 || numRetweets !== 0) && 
                 <>
                    <Divider />               
                    <StatsWrapper>
                        <Stats num={numRetweets} >Retweets</Stats> 
                        <Stats num={numLikesState} >Likes</Stats> 
                    </StatsWrapper>
                </> }
                 <Divider />                 
                <ActionBar 
                    id={id}                    
                    isLiked={isLikedState}
                    isRetweeted={isRetweeted}
                    handleToggleLike={handleToggleLike} />           
            </WrapperContent>
       
    );

};

const Top = styled.div`
    display: flex;  
`;

const Identification = styled.div`
    display: flex;
    flex-direction:column;
    justify-content:center; 
`;

const LinkStyled = styled(NavLink)`
    text-decoration: none;
    color: black;

    &:hover {        
        text-decoration: underline;
    }
`;

const Handle = styled.p`
    color: grey;
    font-size: 14px;  
    margin: 4px 0;
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

const Retweet = styled(Handle)` 
    margin-bottom: 10px;
`;

const Divider = styled.div`
     height: 1px;
    background: ${COLORS.lightGrey};
`;

export default SingleTweet;