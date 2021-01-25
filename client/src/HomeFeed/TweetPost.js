import React, {useState} from 'react';
import styled from 'styled-components';

import { COLORS } from "../GlobalStyles";

const TweetPost = ({ avatar, fetchHomeFeedTweet, handleErrorStatus}) =>{
    const [message, setMessage] = useState("");

    const handleSubmitTweetMessage = (ev)=>{
        ev.preventDefault(); 
        console.log('message', message);  
        fetch("/api/tweet", {
            method: "POST",
            body: JSON.stringify({status: message}),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((json) => {
              setMessage("");
              fetchHomeFeedTweet();  
            })
            .catch((error)=>{
                console.log('TweetPosterror', error);
                setMessage("");
                handleErrorStatus("error");
              })
      };   
     
  
    return(                   
        <Wrapper>
            <Avatar src={avatar} alt="avatar" />
            <form onSubmit={(ev)=>handleSubmitTweetMessage(ev)}>
                <TextArea 
                    id="tweetPost" 
                    name="tweetPost" 
                    value={message}
                    onChange={(ev)=>(setMessage(ev.target.value))}
                    placeholder="What's happening?"                                       
                    />
                <Container>
                    <NumLetterBox
                        type="text"
                        readOnly={true}
                        value= {280 - message.length}
                        colorLetter={()=>{
                            if (280 - message.length < 0)
                                return "red"
                            if (280 - message.length <= 55)
                                return "gold";                            
                            return "lightgrey";
                        }}
                        />
                    <Button 
                        type="submit" 
                        value="Meow" 
                        disabled={280 - message.length === 280 || 280 - message.length < 0}                        
                        />
                </Container>
            </form>
        </Wrapper>       
    );
};

const Container = styled.div`
   float: right;
`;


const Wrapper = styled.div`
    display: flex;
       padding: 15px 20px;
    
   // height: 50px;
    border-bottom: solid 10px ${COLORS.lightGrey};
    margin-bottom: 15px;
    //font-size: 20px;
`;

const Avatar = styled.img`
    width: 55px;
    height: 55px;
    border-radius: 50%;
    margin-right: 15px;
`;

const TextArea = styled.textarea`
    //colorborder: none;
    resize: none;
    font-family: inherit;
    font-size: inherit;
    width: 600px;
    height: 125px;
    padding: 15px;

    border: none;    
    outline: none;

   // -webkit-box-shadow: none;
   // -moz-box-shadow: none;
   // box-shadow: none;
`;

const Button = styled.input`
   // float: right;
    border-radius: 20px;
    padding: 12px 17px;
    background-color: ${COLORS.primary};
    color: white;
    border: none;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    margin: 5px 0px 0px 5px;

    &:disabled {
        cursor: unset;
        opacity: 0.4;
  }
`;

const NumLetterBox = styled.input`
    width: 40px;
    padding: 5px;
    border: none;
    color: ${p => p.colorLetter};
    text-align: right;
    outline: none;
`;

export default TweetPost;