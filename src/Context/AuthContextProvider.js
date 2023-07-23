import { useState } from 'react'
import Context from './AuthContext'

const AuthContextProvider=(props)=>{

    const initialToken=localStorage.getItem('token')
    const initialEmail=localStorage.getItem('email')
    const [Token,setToken]=useState(initialToken)
    const [email,setEmail]=useState(initialEmail)
    const isLoggedIn=!!Token
    const [inboxUnread , setInboxUnread]=useState(0)
    const [sentUnread , setSentUnread]=useState(0)


    const loginHandler=(token,email)=>{
       setToken(token)
       setEmail(email)
       localStorage.setItem('token',token)
       localStorage.setItem('email',email)
    }

    const logoutHandler=()=>{
        setEmail(null)
        setToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem('email')
    }

    const inboxUnreadHandler=(amt)=>{setInboxUnread(amt)}
    const sentUnreadHandler=(amt)=>{setSentUnread(amt)}

    const value={
      token : Token,
      email : email,
      isLoggedIn : isLoggedIn,
      login : loginHandler ,
      logout : logoutHandler,
      unreadInbox : inboxUnread,
      unreadInboxMsg : inboxUnreadHandler,
      unreadSent : sentUnread,
      unreadSentMsg : sentUnreadHandler,
    }

    return(
        <Context.Provider value={value}>
           {props.children}
        </Context.Provider>
    )
}

export default AuthContextProvider