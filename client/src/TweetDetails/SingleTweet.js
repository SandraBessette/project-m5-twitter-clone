import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { useHistory } from "react-router-dom";


const SingleTweet = ({ id, handle, status, name, avatar, date, media, retweeted })=> { 
    const history = useHistory(); 
    const isMedia = media.length !== 0 && media[0].type === 'img' ? true : false;
    const isRetweeted = retweeted ? true : false;

    const onClickLink = (ev)=>{       
        ev.preventDefault();
        history.push(`/${handle}`);
    };

    return (                 
            <WrapperContent>
                <Top>
                    < Avatar src={avatar} alt="avatar" />
                    <Identification>
                        <p><Name onClick={onClickLink}><strong>{name}</strong></Name></p>
                        <Handle >{`@${handle}`}</Handle >
                    </Identification>
                </Top>
                <div> 
                    <Status>{status}</Status>
                    {isMedia &&
                    <Media src={media[0].url} alt="media" /> }
                    <Date>{ `${moment(date).format('h:mm A, MMM D YYYY')} - critter web app`}</Date>
                </div>
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
    margin: 10px 0;
    font-size: 14px;  
    
`;

const WrapperContent = styled.div`
    display: flex;
    flex-direction: column;
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

const Status = styled.p`
    margin: 15px 0px;
    font-size: 18px;  
`;


export default SingleTweet;