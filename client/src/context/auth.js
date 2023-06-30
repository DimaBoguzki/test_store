import React from "react";
import axios from 'axios';
import FullSpinner from "../components/FullLoader";

const TOKEN='token';
export const getToken=()=>localStorage.getItem(TOKEN);
export const setToken=(token)=>localStorage.setItem(TOKEN, token);
export const getAuthHeaderValue = () => `Bearer ${getToken()}`;
export const removeToken=()=>localStorage.removeItem(TOKEN);


const UserContext = React.createContext(null);

export const useUserContext = () => React.useContext(UserContext);


function UserProvider({children}){
  const [ user, setUser ] = React.useState(undefined);

  React.useEffect(()=>{
    // middlewares if token expires
    axios.interceptors.response.use( (res) =>{
      return res;
    },
    (err) => {
      if(err?.response && err?.response?.status === 407) { // Invalid Token
        alert("חלף הזמן של הרשאה, אנא התחבר מחדש")
        logOut();
      }
      return Promise.reject(err);
    });
    axios.get("/user/me",{ headers: { Authorization : getAuthHeaderValue() } })
      .then((res) => {
        setUser({ 
          id: res.data.id,
          name: res.data.name,
          email: res.data.email
        });
        axios.defaults.headers.common.Authorization = getAuthHeaderValue(); 
      })
      .catch((err) => {
        console.log(err);
        removeToken();
        setUser(null);
      });    
  },[  ])

  const logOut=()=>{
    removeToken();
    setUser(null);
  }

  return (
    <UserContext.Provider value={{user, setUser, logOut}}>
      { user === undefined ? 
      <FullSpinner />
      : children}
    </UserContext.Provider>
  )
}

export default UserProvider;