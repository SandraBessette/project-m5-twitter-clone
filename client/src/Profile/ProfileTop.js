import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { FiMapPin, FiCalendar } from "react-icons/fi";
import { COLORS } from "../GlobalStyles";
import Button from "../Tools/Button";



const ProfileTop = ({ profileInfo })=> {
    return (
        <Wrapper>
            <Banner src= {profileInfo.bannerSrc} alt='banner' />
            <Avatar src= {profileInfo.avatarSrc} alt='avatar' />
            < ButtonWrapper>
            <Button
                 color={profileInfo.isBeingFollowedByYou ? 'white' : COLORS.primary }
                 fill={profileInfo.isBeingFollowedByYou ? COLORS.primary : 'white'}
            >{profileInfo.isBeingFollowedByYou ? 'Following' : 'Follow'}
            </Button>
            </ ButtonWrapper>
            <WrapperInfo>
                <Name><strong>{profileInfo.displayName}</strong></Name>
                <Handle>{`@${profileInfo.handle}`} {profileInfo.isFollowingYou && <FollowYou>follow you</FollowYou>}</Handle>
                <Bio>{profileInfo.bio}</Bio>
                <Container>
                    <Location><FiMapPin /> {profileInfo.location}</Location> 
                    <p><FiCalendar/> {`Joined ${moment(profileInfo.joined).format('MMMM YYYY')}`}</p>
                </Container>
                <Container>
                    <Num><strong>{profileInfo.numFollowing}</strong></Num> 
                    <Follow>Following</Follow>
                    <Num><strong>{profileInfo.numFollowers}</strong></Num>
                    <p>Followers</p>
                </Container>
            </WrapperInfo>
        </Wrapper>
    );

};

const Wrapper = styled.div`
    position: relative;
`;

const Avatar = styled.img`
    position: absolute;
    top: 125px;
    left: 25px;
    height: 150px;
    width: 150px;
    object-fit: cover;
    border-radius: 50%;
    border: solid 3px white;
`;

const Banner = styled.img`
    height: 200px;
    width: 100%;
    object-fit: cover;
`;

const WrapperInfo = styled.div`
    margin: 90px 25px 25px 25px;
`;
const ButtonWrapper = styled.div`
    float: right;
    width: 125px;
    margin: 20px;
`;

const Name = styled.p`
    font-size: 18px;
`;

const Handle = styled.p`
    font-size: 14px;
    color: grey;
    margin: 5px 0;
`;

const Container = styled.div`
    display: flex;
    color: grey;
    font-size: 15px;
    margin-bottom: 20px;
`;

const Bio = styled.p`
    margin: 20px 0;
`;

const Location = styled.p`
    margin-right: 30px;
`;

const Num = styled.p`
    color: black;
    margin-right: 5px;
`;

const Follow = styled.p`
    margin-right: 25px;
`;

const FollowYou = styled.span`
    background-color: ${COLORS.lightGrey};
    padding: 0 5px;
    margin: 0 2px;
    border-radius: 5px;
`;

export default ProfileTop;