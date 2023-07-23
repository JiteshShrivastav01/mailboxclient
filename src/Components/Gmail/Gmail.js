import EmailSection from "../Email/EmailSection"
import { Button } from "react-bootstrap"
import classes from './Gmail.module.css'
import { useState } from "react"
import {BsFillPencilFill} from 'react-icons/bs'
import {AiOutlineStar , AiOutlineSend} from 'react-icons/ai'
import {RiInboxUnarchiveFill} from 'react-icons/ri'
import {MdOutlineUnfoldMore} from 'react-icons/md'
import Starred from '../Email/Starred'
import Inbox from "../Email/Inbox"
import Sent from '../Email/Sent'
import AuthContext from "../../Context/AuthContext"
import { useContext } from "react"


const Gmail=()=>{
    const [isEmail,setIsEmail]=useState(false)
    const [isSent,setIsSent]=useState(false)
    const [isInbox,setIsInbox]=useState(false)
    const [isStarred,setIsStarred]=useState(false)
    const [inboxlen,setInboxLength]=useState(0)
    const [sentlen,setSentLength]=useState(0)
    const ctx=useContext(AuthContext)

    const createEmailHandler=()=>{
        setIsEmail(!isEmail)
        setIsInbox(false)
        setIsSent(false)
        setIsStarred(false)
    }
    const InboxHandler=()=>{
        setIsInbox(!isInbox)
        setIsEmail(false)
        setIsSent(false)
        setIsStarred(false)
    }
    const starredHandler=()=>{
        setIsStarred(!isStarred)
        setIsEmail(false)
        setIsInbox(false)
        setIsSent(false)
    }
    const sentHandler=()=>{
        setIsSent(!isSent)
        setIsEmail(false)
        setIsInbox(false)
        setIsStarred(false)
    }
    const inboxlength=(length)=>{setInboxLength(length)}
    const sentlength=(length)=>{setSentLength(length)}

    return(
        <div className={classes.container}>
          <div className={classes.container1}>
            <Button varient='primary' className={classes.btn} onClick={createEmailHandler}><BsFillPencilFill className={classes.icon}/>
                Componse Mail
            </Button>
            <div className={classes.list}>
                <button className={classes.listitem} onClick={InboxHandler}>
                  <RiInboxUnarchiveFill className={classes.icon2}/> Inbox
                  <span className={classes.number}>
                    <span style={{color:'green',fontWeight:'bold'}}>{ctx.unreadInbox}</span>/{inboxlen}</span>
                </button>
                <button className={classes.listitem} onClick={starredHandler}>
                   <AiOutlineStar className={classes.icon2}/> Starred
                   <span className={classes.number}>0</span>
                </button>
                <button className={classes.listitem} onClick={sentHandler}>
                   <AiOutlineSend className={classes.icon2}/> Sent
                   <span className={classes.number}>
                    <span style={{color:'green',fontWeight:'bold'}}>{ctx.unreadSent}</span>/{sentlen}</span>
                </button>
                <hr />
                <button className={classes.morebtn}>
                    <MdOutlineUnfoldMore className={classes.icon2}/> More
                </button>
            </div>
          </div>
          <div className={classes.sec2}>
          <div className={classes.container2}>
            {isEmail && <EmailSection/>}
            {isInbox && <Inbox inboxlength={inboxlength}/>}
            {isSent && <Sent sentlength={sentlength}/>}
            {isStarred && <Starred/>}
          </div>
          </div>
        </div>
    )
}

export default Gmail