import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import classes from './Navbar.module.css'
import {Link,NavLink} from 'react-router-dom'
import AuthContext from '../../Context/AuthContext';
import {useHistory} from 'react-router-dom'

const MainNavbar = () => {
  const ctx=useContext(AuthContext)
  const history=useHistory()

  const logoutHandler=()=>{
    ctx.logout()
    history.push('/')
  }

  return (
    <Navbar  expand="md" className={classes.Navbar}>
      <Navbar.Brand href="#home" className={classes.logo}>MailBox Client</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className={classes.list}>
        <Nav className={`mr-auto ${classes.list1}`} >
          {
            !ctx.isLoggedIn &&
            <Nav.Link className={classes.list1item}><NavLink to='/'>Home</NavLink></Nav.Link>
          }
          {
            ctx.isLoggedIn &&
            <Nav.Link className={classes.list1item}><NavLink to='/gmail'>Gmail</NavLink></Nav.Link>
          }
        </Nav>
        {
          ctx.isLoggedIn && 
          <Nav className={classes.list2}>
          <NavDropdown title="User Profile" id="basic-nav-dropdown"  className={classes.list2item}>
              <NavDropdown.Item className={classes.list2dropitem}>{ctx.email}</NavDropdown.Item>
            <NavDropdown.Divider />
            <Link to='/' onClick={logoutHandler}>
            <NavDropdown.Item className={classes.list2dropitem}>
                Logout
            </NavDropdown.Item>
            </Link>
          </NavDropdown>
        </Nav>
        }
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavbar;
