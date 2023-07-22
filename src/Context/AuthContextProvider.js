import { useState } from 'react'
import Context from './AuthContext'

const AuthContextProvider=(props)=>{

    const initialToken=localStorage.getItem('token')
    const initialEmail=localStorage.getItem('email')
    const [Token,setToken]=useState(initialToken)
    const [email,setEmail]=useState(initialEmail)
    const isLoggedIn=!!Token

    const [inbox , setInbox]=useState([])
    const [sent , setSent]=useState([])
    const [starred , setStarred]=useState([])

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

    const inboxHandler=(msg)=>{
        setInbox([...inbox,msg])
    }
    const sentHandler=(msg)=>{
        setSent([...inbox,msg])
    }
    const starredHandler=(msg)=>{
        setStarred([...inbox,msg])
    }

    const value={
      token : Token,
      email : email,
      isLoggedIn : isLoggedIn,
      login : loginHandler ,
      logout : logoutHandler,
      inbox : inbox,
      inInbox : inboxHandler ,
      sent : sent,
      inSent : sentHandler ,
      starred : starred ,
      inStarred : starredHandler
    }

    return(
        <Context.Provider value={value}>
           {props.children}
        </Context.Provider>
    )
}

export default AuthContextProvider