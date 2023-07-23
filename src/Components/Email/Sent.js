import { useContext, useEffect, useState } from 'react'
import Card from '../UI/Card'
import Card1 from '../UI/Card1'
import AuthContext from '../../Context/AuthContext'
import classes from './Inbox.module.css'
import { GoDotFill } from 'react-icons/go'

const Sent=(props)=>{
    const [sent,setSent]=useState([])
    const ctx=useContext(AuthContext)
    const Email=ctx.email.replace(/[@.]/g,'')

    const deleteHandler=async (item)=>{
      try{
        const res=await fetch(`https://mailboxclient-5c2d5-default-rtdb.firebaseio.com/user/${Email}/sent/${item.id}.json`,{
          method:'DELETE'
        })
      }
      catch(err){
        alert(err)
      }
    }

    const readHandler = async (mail) => {
      console.log(mail.Message);
      const updatedMail = { ...mail, isRead: true };
      console.log(updatedMail);
      try {
        const res = await fetch(`https://mailboxclient-5c2d5-default-rtdb.firebaseio.com/user/${Email}/sent/${mail.id}.json`, {
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
            const res=await fetch(`https://mailboxclient-5c2d5-default-rtdb.firebaseio.com/user/${Email}/sent.json`)

            if(!res.ok){
                throw new Error('Fetching sent data is failed.')
            }

            const data=await res.json()
            const loader=[]
            for(let key in data){
                loader.push({
                    id:key,
                    To : data[key].To,
                    Subject : data[key].Subject,
                    Message : data[key].Message,
                    isRead : data[key].isRead
                })
            }
            setSent(loader)
          }
          catch(err){
              alert(err)
          }
        }
        fetchInbox()
      },[Email,deleteHandler,readHandler])
    
      useEffect(()=>{
        props.sentlength(sent.length)
    },[sent,deleteHandler])

    return(
       <Card1>
          {
            !sent.length && <h2 className={classes.h2}>You have not sent any message yet.</h2>
          }
          {
            sent.length>0 && <h2 className={classes.h2}>Sent Message</h2>
          }
          { 
            sent.map((sent)=>(
                <Card>
                  <div onClick={()=>readHandler(sent)}>
                  <div className={classes.p}>
                    <p className={classes.p1}>
                    {!sent.isRead && <span className={classes.greenDot}><GoDotFill/></span>}
                        <span className={classes.bold}>To :</span> {sent.To}
                    </p>
                    <p className={classes.p2}>
                        <span className={classes.bold}>Subject : </span>{sent.Subject}
                    </p>
                    <button className={classes.delete} onClick={()=>deleteHandler(sent)}>X</button>
                  </div> 
                  <hr />
                  <p className={classes.p3}>{sent.Message}</p>
                  </div>
                </Card>
            ))
          }
       </Card1>
    )
}

export default Sent