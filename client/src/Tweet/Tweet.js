import React from 'react';
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import { AiOutlineRetweet } from "react-icons/ai";
import moment from 'moment'

import { COLORS } from "../GlobalStyles";
import ActionBar from './ActionBar';
import useLikes from '../hooks/use-Likes.hook';


const Tweet = ({ tweet })=> {  
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
    const history = useHistory();    

    const handleClickLink = (ev)=>{       
        ev.preventDefault();
        history.push(`/${author.handle}`);
    };

    const handleKeyDown = (ev)=>{       
        ev.preventDefault();       
        if (ev.code === "Enter")
            history.push(`/${author.handle}`);
    }
 
    return (
       <NavLinkStyle aria-label="View tweet" exact to={`/tweet/${id}`} >
            <Wrapper >
                {isRetweetedFrom &&
                    <Retweet><AiOutlineRetweet/> {`${retweetFrom.displayName} Remeowed`}</Retweet>}
                <WrapperContent>
                    < Avatar src={author.avatarSrc} alt="avatar" />
                    <div >    
                        <Name aria-label="View Profile" tabIndex="0" onClick={handleClickLink} onKeyPress={ handleKeyDown} ><strong>{author.displayName}</strong></Name>
                        <Handle>{ `@${author.handle} · ${moment(timestamp).format("MMM Do")}`}</Handle>                       
                        <Status>{status}</Status>
                        {isMedia &&
                        <Media src={media[0].url} alt="media" /> }
                    </div>
                </WrapperContent>
                <ActionBar 
                    id={id}
                    numLikes={numLikesState}
                    numRetweets={numRetweets}
                    isLiked={isLikedState}
                    isRetweeted={isRetweeted}
                    handleToggleLike={handleToggleLike}/>
            </Wrapper>
        </NavLinkStyle>
    );

};

const NavLinkStyle = styled(NavLink)`
    text-decoration: none;
    color: black;
    
`;

const Name = styled.div`
    display:inline-block;
    &:hover {
        text-decoration: underline;
    }
`;

const Wrapper = styled.div`
    cursor: pointer;  
    padding: 10px 20px 0 20px;
    border-bottom: solid 1px ${COLORS.lightGrey}; 
`;

const WrapperContent = styled.div`
    display: flex;
    padding: 15px 0 0 0;   
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
const Handle = styled.span`
    color: gray;
    font-size: 14px;
    margin-left: 7px;
`;

const Retweet = styled(Handle)`
    margin-left: 40px;
`;

const Status = styled.p`
    margin: 15px 0px;

`;


export default Tweet;