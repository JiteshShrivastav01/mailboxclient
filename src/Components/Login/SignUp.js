import React, { useRef, useState } from 'react';
import { Container, Form} from 'react-bootstrap';
import classes from './SignUp.module.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';



const Signup = () => {
  const email = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const [passError , setPassError]=useState(false)
  const history=useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Email = email.current.value;
    const Password = password.current.value;
    const ConfirmPassword = confirmPassword.current.value;
  
    if (Password !== ConfirmPassword) {
      setPassError(true);
      password.current.value = '';
      confirmPassword.current.value = '';
      setTimeout(() => {
        setPassError(false);
      }, 3000);
      return;
    }
  
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBWUOLhQox3z3-V_vo9NCXn2NxcqWJj5WU',
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
      console.log('SignUp Successfully');
      console.log(data)
      history.push('/gmail')
  
      email.current.value = '';
      password.current.value = '';
      confirmPassword.current.value = '';
    } catch (error) {
      alert(error.message);
      email.current.value = '';
      password.current.value = '';
      confirmPassword.current.value = '';
    }
  };
  

  return (
    <div className={`${classes.mainDiv}`}>
    <Container
      className={` ${classes.container} d-flex justify-content-center align-items-center `}
    >
       
      <Form onSubmit={handleSubmit} className={`${classes.form} w-100 p-4`}>
      <h2 className={classes.h2}>Create Account</h2>
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

        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label className={classes.label}>Confirm Password</Form.Label>
          <Form.Control className={classes.input}
            type="password"
            placeholder="Confirm Password"
            ref={confirmPassword}
            required
          />
          {passError && <small className={classes.passError}>Password not matched.</small>}
        </Form.Group>

        <button  type="submit" className={classes.btnPrimary}>
          Create Account
        </button>
      </Form>
    </Container>
    </div>
  );
};

export default Signup;
