import React, { useState } from 'react';

const useLikes = (isLiked, numLikes )=>{

    const [isLikedState, setIsLikedLocal] = useState(isLiked);
    const [numLikesState, setNumOfLikes] = useState(numLikes);

    const handleToggleLike = ()=>{
        if (isLikedState)
            setNumOfLikes((n) => n - 1);
        else
            setNumOfLikes((n) => n + 1);
        setIsLikedLocal(!isLikedState);
    };

    return ( [isLikedState, numLikesState, handleToggleLike]);

};

export default useLikes;