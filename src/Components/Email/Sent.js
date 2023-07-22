import { useContext, useEffect, useState } from 'react'
import Card from '../UI/Card'
import Card1 from '../UI/Card1'
import AuthContext from '../../Context/AuthContext'
import classes from './Inbox.module.css'

const Sent=(props)=>{
    const [sent,setSent]=useState([])
    const ctx=useContext(AuthContext)
    const Email=ctx.email.replace(/[@.]/g,'')

    useEffect(()=>{
        const fetchInbox=async ()=>{
          try{
            const res=await fetch(`https://mailboxclient-5c2d5-default-rtdb.firebaseio.com/user/${Email}/sent.json`)

            if(!res.ok){
                throw new Error('Fetching sent data is failed.')
            }

            const data=await res.json()
            const loader=[]
            for(let key in data){
                loader.push({
                    To : data[key].To,
                    Subject : data[key].Subject,
                    Message : data[key].message
                })
            }
            setSent(loader)
          }
          catch(err){
              alert(err)
          }
        }
        fetchInbox()
      },[Email])
    
      useEffect(()=>{
        props.sentlength(sent.length)
    },[sent])

    return(
       <Card1>
          {
            !sent.length && <h2 className={classes.h2}>You have not sent any message yet.</h2>
          }
          {
            sent.length && <h2 className={classes.h2}>Sent Message</h2>
          }
          { 
            sent.map((sent)=>(
                <Card>
                  <div className={classes.p}>
                    <p className={classes.p1}>
                        <span className={classes.bold}>To :</span> {sent.To}
                    </p>
                    <p className={classes.p2}>
                        <span className={classes.bold}>Subject : </span>{sent.Subject}
                    </p>
                  </div> 
                  <hr />
                  <p className={classes.p3}>{sent.Message}</p>
                </Card>
            ))
          }
       </Card1>
    )
}

export default Sent