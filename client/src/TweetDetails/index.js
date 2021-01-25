import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { FiArrowLeft } from "react-icons/fi";

import { COLORS } from "../GlobalStyles";
import SingleTweet from './SingleTweet';


const TweetDetails = () => {
  const { tweetId } = useParams();
  const [tweetDetails, setTweetDetails] = useState(null);
  const [status, setStatus] = useState("loading");
  const history = useHistory(); 

  const fetchTweetDetails = useCallback(()=>{
    setStatus("loading");   
    fetch(`/api/tweet/${tweetId}`)
    .then((res) => res.json())
    .then((json) => {  
        if(json){
          setTweetDetails({...json});
          setStatus("idle");
         // console.log('Tweetjson', json.tweetIds);
        }    
    });

  }, [tweetId]);

  useEffect(() => {  
    fetchTweetDetails();   
  } , [fetchTweetDetails]);

    return (     
      <Wrapper>
         <TitleWrapper>
           <Button onClick={()=>history.goBack()}>
              <ArrowIcon color='grey'/>
            </Button>
            <h1>Meow</h1>
        </TitleWrapper>   
      {tweetDetails === null ? <p>Tweet details....</p> : (
             
             <SingleTweet 
               key={tweetId}
               tweet={tweetDetails.tweet} 
               fetchData={fetchTweetDetails}              
               /> 
           )
       }
      </Wrapper>
    );
  };
  

  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;  
    margin: 0 20px;    
  `;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;    
  height: 50px;
  border-right: solid 1px ${COLORS.lightGrey};     
  border-left: solid 1px ${COLORS.lightGrey}; 
  font-size: 20px;
  `;

const Button = styled.button` 
  margin: 0;
  padding: 0; 
  border: none;
  background: transparent;
  cursor: pointer;  
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
`;

const ArrowIcon = styled(FiArrowLeft)`
  margin-right: 20px;
  width: 20px;
  height: 20px;
`;
  
  export default TweetDetails;