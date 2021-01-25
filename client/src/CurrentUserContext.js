import React, { useEffect } from 'react';


export const CurrentUserContext = React.createContext(null);
export const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = React.useState(null);
    const [status, setStatus] = React.useState("loading");
  
    // Fetch the user data from the API (/me/profile)
    // When the data is received, update currentUser.
    // Also, set `status` to `idle`
   
    useEffect(() => {        
          setStatus("loading");   
          fetch('api/me/profile')
          .then((res) => res.json())
          .then((json) => {
              console.log('MainProfileFecht');             
              if (json){
                setCurrentUser({...json});
                setStatus("idle"); 
              } 
          })
          .catch((error)=>{
            console.log('CurrentUsererror', error);
            setStatus("error");
          })
        }   , []);
  
    return (
      <CurrentUserContext.Provider value={{ currentUser, status }}>
        {children}
      </CurrentUserContext.Provider>
    );
  };