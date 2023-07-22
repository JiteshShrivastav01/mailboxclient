import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai';
import './Home.css';
import Animation from "../Home/Animation"

const Home = () => {
  return (
    <>
    <div className="home">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md={6} className="text-center">
            <h1>Hello, Welcome to the Mail-Box Client</h1>
            <p>This application is the cheapest copy of Gmail.</p>
            <div className="button-group">
              <Link to="/login" className="btn btn-primary">
                <AiOutlineLogin className="icon" />
                Login
              </Link>
              <span className="divider">/</span>
              <Link to="/signup" className="btn btn-success">
                <AiOutlineUserAdd className="icon" />
                Create New Account
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    <div>
      <Animation/>
    </div>
    </>
  );
};

export default Home;
