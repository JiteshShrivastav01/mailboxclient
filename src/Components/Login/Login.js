import React, { useRef } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import classes from './SignUp.module.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';



const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const history=useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Email = email.current.value;
    const Password = password.current.value;
  
  
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBWUOLhQox3z3-V_vo9NCXn2NxcqWJj5WU',
        {
          method: 'POST',
          body: JSON.stringify({
            email: Email,
            password: Password,
            returnSecureToken: true 
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      if (!response.ok) {
        throw new Error('Authentication Error');
      }
      const data = await response.json();
      console.log('Login Successfully');
      console.log(data)
      history.push('/')
  
      email.current.value = '';
      password.current.value = '';
    } catch (error) {
      alert(error.message);
      email.current.value = '';
      password.current.value = '';
    }
  };
  

  return (
    <div className={`${classes.mainDiv}`}>
    <Container
      className={` ${classes.container} d-flex justify-content-center align-items-center `}
    >
       
      <Form onSubmit={handleSubmit} className={`${classes.form} w-100 p-4`}>
      <h2 className={classes.h2}>Login</h2>
        <Form.Group controlId="formBasicEmail">
          <Form.Label  className={classes.label}>Email</Form.Label>
          <Form.Control className={classes.input}
            type="email"
            placeholder="Enter email"
            ref={email}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label className={classes.label}>Password</Form.Label>
          <Form.Control className={classes.input}
            type="password"
            placeholder="Password"
            ref={password}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className={classes.btnPrimary}>
          Login
        </Button>
      </Form>
      <hr />
    </Container>
    </div>
  );
};

export default Login;
