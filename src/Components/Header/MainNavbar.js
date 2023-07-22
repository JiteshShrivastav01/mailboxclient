import React from 'react';
import { Navbar, Nav, NavDropdown} from 'react-bootstrap';
import classes from './Navbar.module.css'
import {Link,NavLink} from 'react-router-dom'

const MainNavbar = () => {
  return (
    <Navbar bg="light" expand="md" className={classes.Navbar}>
      <Navbar.Brand href="#home" className={classes.logo}>MailBox Client</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className={classes.list}>
        <Nav className={`mr-auto ${classes.list1}`} >
          <Nav.Link className={classes.list1item}><NavLink to='/'>Home</NavLink></Nav.Link>
          <Nav.Link className={classes.list1item}><NavLink to='/'>About</NavLink></Nav.Link>
        </Nav>
        <Nav className={classes.list2}>
          <NavDropdown title="User Profile" id="basic-nav-dropdown"  className={classes.list2item}>
            <NavDropdown.Item className={classes.list2dropitem}>Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item className={classes.list2dropitem}> 
                <Link to='/login'>Login</Link>
            </NavDropdown.Item>
            <NavDropdown.Item className={classes.list2dropitem}>
                <Link to='/'>Logout</Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavbar;
