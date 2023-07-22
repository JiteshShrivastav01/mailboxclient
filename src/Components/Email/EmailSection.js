import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import classes from './EmailSection.module.css'
import AuthContext from '../../Context/AuthContext';

const EmailSection = () => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [subject , setSubject] = useState('')
  const ctx=useContext(AuthContext)

  const handleSubmit =async (e) => {
    e.preventDefault();
    
    const recipient=recipientEmail.replace(/[@.]/g, '')
    const sender=ctx.email
    const senderEmail=ctx.email.replace(/[@.]/g,'')

    try{
        const res=await fetch(`https://mailboxclient-5c2d5-default-rtdb.firebaseio.com/user/${recipient}/inbox.json`,{
          method:'POST',
          body:JSON.stringify({From : sender ,Subject : subject , message : emailContent}),
          headers:{
            'Content-Type' : 'application.json'
          }
        })
        console.log(res)

        const res2=await fetch(`https://mailboxclient-5c2d5-default-rtdb.firebaseio.com/user/${senderEmail}/sent.json`,{
        method:'POST',
        body:JSON.stringify({To : recipientEmail ,Subject : subject , message : emailContent}),
        headers:{
          'Content-Type' : 'application.json'
        }
      })
      console.log(res2)
    }
    catch(err){
        alert(err)
    }
   
    setEmailContent('')
    setRecipientEmail('')
    setSubject('')
  };

  return (
    <>
    {
    ctx.isLoggedIn &&
    <div className={classes.container}>
      <h3>Message</h3><hr />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="recipientEmail" className={classes.line}>
          <Form.Label className={classes.label}>To</Form.Label>
          <Form.Control className={classes.input}
            type="email"
            placeholder="Enter recipient email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="subject" className={classes.line}>
          <Form.Label className={classes.label}>Subject</Form.Label>
          <Form.Control className={classes.input}
            type="text"
            placeholder="Enter Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="emailContent">
          <Form.Label className={classes.label}>Message</Form.Label>
          <Form.Control className={classes.input}
            as="textarea"
            rows={4}
            placeholder="Enter Message"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className={classes.btnPrimary}>
          Send Email
        </Button>
      </Form>
    </div>
    }
    {
    !ctx.isLoggedIn &&
    <div className={classes.container}>
        <h1>You have to login for sending Email</h1>
    </div>
    }
    </>
  );
};

export default EmailSection;
