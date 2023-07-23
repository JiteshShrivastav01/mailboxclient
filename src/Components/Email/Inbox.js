import { useContext, useEffect, useState } from 'react'
import Card from '../UI/Card'
import Card1 from '../UI/Card1'
import AuthContext from '../../Context/AuthContext'
import classes from './Inbox.module.css'
import {GoDotFill} from 'react-icons/go'

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

    const readHandler = async (mail) => {
      console.log(mail);
      const updatedMail = { ...mail,isRead: true };
      console.log(updatedMail);
      try {
        const res = await fetch(`https://mailboxclient-5c2d5-default-rtdb.firebaseio.com/user/${Email}/inbox/${mail.id}.json`, {
          method: 'PUT',
          body: JSON.stringify(updatedMail),
        });
    
        if (!res.ok) {
          console.log('Failed to update mail status.');
          return;
        }
    
      } 
      catch(err) {
        console.log(err);
      }
    };
    

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
                    Message : data[key].Message,
                    isRead:data[key].isRead
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
            inbox.map((mail)=>(
                <Card>
                  <div onClick={()=>readHandler(mail)}>
                  <div className={classes.p}>
                    <p className={classes.p1}>
                    {!mail.isRead && <span className={classes.greenDot}><GoDotFill/></span>}
                        <span className={classes.bold}>From :</span> {mail.From}
                    </p>
                    <p className={classes.p2}>
                        <span className={classes.bold}>Subject : </span>{mail.Subject}
                    </p>
                    <button className={classes.delete} onClick={()=>deleteHandler(mail)}>X</button>
                  </div> 
                  <hr />
                  <p className={classes.p3}>{mail.Message}</p>
                  </div>
                </Card>
            ))
          }
       </Card1>
    )
}

export default Inbox