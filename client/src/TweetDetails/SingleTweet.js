import React from 'react';
import styled from 'styled-components';
import moment from 'moment'


const SingleTweet = ({ id, handle, status, name, avatar, date, media, retweeted })=> {  
    const isMedia = media.length !== 0 && media[0].type === 'img' ? true : false;
    const isRetweeted = retweeted ? true : false;

    return (                 
            <WrapperContent>
                <Top>
                    < Avatar src={avatar} alt="avatar" />
                    <Name>
                        <p><strong>{name}</strong></p>
                        <Handle >{`@${handle}`}</Handle >
                    </Name>
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

const Name = styled.div`
    display: flex;
    flex-direction:column;
    justify-content:center;
   // cursor: pointer;  
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