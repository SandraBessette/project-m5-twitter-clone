import React from 'react';
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import { AiOutlineRetweet } from "react-icons/ai";
import moment from 'moment'


const Tweet = ({ id, handle, status, name, avatar, date, media, retweeted })=> {  
    const isMedia = media.length !== 0 && media[0].type === 'img' ? true : false;
    const isRetweeted = retweeted ? true : false;
    const history = useHistory();
    const onClickSingleTweet = (ev)=>{
        console.log('ev.target', ev.target);
        ev.preventDefault();
        history.push(`/tweet/${id}`);
    };

    const onClickLink = (ev)=>{       
        ev.preventDefault();
        history.push(`/${handle}`);
    };
    /*onClick={onClickSingleTweet}*/
   //<p><NavLink exact to={`/${handle}`}><strong>{name}</strong></NavLink> <Span>{ `@${handle} - ${moment(date).format("MMM Do")}`}</Span></p>
   //<p><Test onClick={onClickLink}><strong>{name}</strong></Test> <Span>{ `@${handle} - ${moment(date).format("MMM Do")}`}</Span></p>
    return (
        <NavLinkStyle exact to={`/tweet/${id}`} activeClassName='active'>
        <Wrapper >
            {isRetweeted &&
                <Retweet><AiOutlineRetweet/> {`${retweeted.displayName} Remeowed`}</Retweet>}
            <WrapperContent>
                < Avatar src={avatar} alt="avatar" />
                <div>            
                    <p><Name onClick={onClickLink}><strong>{name}</strong></Name> <Span>{ `@${handle} - ${moment(date).format("MMM Do")}`}</Span></p>
                    <Status>{status}</Status>
                    {isMedia &&
                    <Media src={media[0].url} alt="media" /> }
                </div>
            </WrapperContent>
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
    padding: 0 20px;
`;

const WrapperContent = styled.div`
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