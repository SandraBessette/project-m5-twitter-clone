import React from 'react';
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import { AiOutlineRetweet } from "react-icons/ai";
import moment from 'moment'

import { COLORS } from "../GlobalStyles";
import ActionBar from './ActionBar';


const Tweet = ({ tweet, fetchData })=> {  
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

    const isMedia = media.length !== 0 && media[0].type === 'img' ? true : false;
    const isRetweetedFrom = retweetFrom ? true : false;
    const history = useHistory();    

    const onClickLink = (ev)=>{       
        ev.preventDefault();
        history.push(`/${author.handle}`);
    };
  
    return (
       <NavLinkStyle exact to={`/tweet/${id}`} activeClassName='active'>
            <Wrapper >
                {isRetweetedFrom &&
                    <Retweet><AiOutlineRetweet/> {`${retweetFrom.displayName} Remeowed`}</Retweet>}
                <WrapperContent>
                    < Avatar src={author.avatarSrc} alt="avatar" />
                    <div>            
                        <p>
                            <Name onClick={onClickLink}><strong>{author.displayName}</strong></Name>
                            <Span>{ `@${author.handle} - ${moment(timestamp).format("MMM Do")}`}</Span>
                        </p>
                        <Status>{status}</Status>
                        {isMedia &&
                        <Media src={media[0].url} alt="media" /> }
                    </div>
                </WrapperContent>
                <ActionBar 
                    id={id}
                    numLikes={numLikes}
                    numRetweets={numRetweets}
                    isLiked={isLiked}
                    isRetweeted={isRetweeted}
                    fetchData={fetchData}/>
            </Wrapper>
        </NavLinkStyle>
    );

};

const NavLinkStyle = styled(NavLink)`
    text-decoration: none;
    color: black;
    
`;

const Name = styled.span`
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
const Span = styled.span`
    color: gray;
    font-size: 14px;
    margin-left: 5px;
`;

const Retweet = styled(Span)`
    margin-left: 40px;
`;

const Status = styled.p`
    margin: 15px 0px;

`;


export default Tweet;