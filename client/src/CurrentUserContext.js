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
             
              if(json){
                setCurrentUser({...json});
                setStatus("idle"); 
              }
            /*const { status, data, message } = json; 
            if (status === 200) {
              setUserReservation({...data});
              setSubStatus("confirmed");   
            }
            else {
              setSubStatus("error"); 
              window.localStorage.clear();
              console.log(message)
            };*/
          });
        }   , []);
  
    return (
      <CurrentUserContext.Provider value={{ currentUser, status }}>
        {children}
      </CurrentUserContext.Provider>
    );
  };