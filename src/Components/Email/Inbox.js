import { useContext, useEffect, useState } from 'react'
import Card from '../UI/Card'
import Card1 from '../UI/Card1'
import AuthContext from '../../Context/AuthContext'
import classes from './Inbox.module.css'

const Inbox=(props)=>{
    const [inbox,setInbox]=useState([])
    const ctx=useContext(AuthContext)
    const Email=ctx.email.replace(/[@.]/g,'')

    const deleteHandler=async (item)=>{
      try{
        const res=await fetch(`https://mailboxclient-5c2d5-default-rtdb.firebaseio.com/user/${Email}/inbox/${item.id}.json`,{
          method:'DELETE'
        })
      }
      catch(err){
        alert(err)
      }
    }

    useEffect(()=>{
        const fetchInbox=async ()=>{
          try{
            const res=await fetch(`https://mailboxclient-5c2d5-default-rtdb.firebaseio.com/user/${Email}/inbox.json`)

            if(!res.ok){
                throw new Error('Fetching Inbox data is failed.')
            }

            const data=await res.json()
            const loader=[]
            for(let key in data){
                loader.push({
                    id:key,
                    From : data[key].From,
                    Subject : data[key].Subject,
                    Message : data[key].message
                })
            }
            setInbox(loader)
          }
          catch(err){
              alert(err)
          }
        }
        fetchInbox()
      },[Email,deleteHandler])
    
    useEffect(()=>{
        props.inboxlength(inbox.length)
    },[inbox,deleteHandler])

    return(
       <Card1>
          {
            !inbox.length && <h2 className={classes.h2}>Inbox is empty</h2>
          }
          {
            inbox.length>0 && <h2 className={classes.h2}>Inbox</h2>
          }
          { inbox.length>0 &&
            inbox.map((inbox)=>(
                <Card>
                  <div className={classes.p}>
                    <p className={classes.p1}>
                        <span className={classes.bold}>From :</span> {inbox.From}
                    </p>
                    <p className={classes.p2}>
                        <span className={classes.bold}>Subject : </span>{inbox.Subject}
                    </p>
                    <button className={classes.delete} onClick={()=>deleteHandler(inbox)}>X</button>
                  </div> 
                  <hr />
                  <p className={classes.p3}>{inbox.Message}</p>
                </Card>
            ))
          }
       </Card1>
    )
}

export default Inbox