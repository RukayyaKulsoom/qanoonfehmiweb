import React from 'react'
import Card from 'react-bootstrap/Card';
import { Outlet, Link } from "react-router-dom";
import Navbar from "./navbar";
import { useState } from "react";
import axios from 'axios'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

import { AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


const Forgotpassword = () => {
    const [email, setemail] = useState("");
   
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const getuser = async () => {
      const response = await axios.post('http://localhost:3000/forgotpassword', {
        email: email
     
      });
      try {
        if(email==''){
          setErrorMessage('Enter Email!')
          
          return; // Return early if email is empty
        }
         if (response.status === 200) {
        // Login successful, navigate to the home page
        setErrorMessage('')
        alert('Email Sent to Your Account!')
     
      }
      } catch (error) {
        console.error(error);
      }
    };
   
  
    return (
      <Container fluid className="background-image form-container">

      <div class="container "
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          maxHeight:'600px',
          maxWidth: "400px", // Set the maximum width for the container
          padding: '20px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',

        }}>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={12}>
            <Container className="container">
              <Row className="justify-content-center">
                <Col xs="auto" className="text-center">
                  <div className="img-responsive">
                    <img src={require('./images/ljcp.jpg')} alt="face" style={{ maxWidth: '40%', height: 'auto' }} />
                  </div>
                  <h5 className="text-center font-weight-bold mt-3">Law and Justice Commission Of Pakistan</h5>


                </Col>
              </Row>
              <h5 className="text-center font-weight-bold mt-3">Reset Your Password.</h5>
           <Alert variant="light" className="mt-1" style={{ padding: '1px', color: 'red' }}>
          {errorMessage}
        </Alert>

              <div className="d-flex justify-content-center">


                <Form style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>

                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}

                      required
                    />

                  </Form.Group>


                  <div className="text-center" >
                    <Button style={{ maxWidth: '400px', width: '50%', backgroundColor:'#1B4235' }}  className="btn btn-dark" onClick={getuser}>
                      Send Email
                    </Button>
                  </div>
                </Form>
              </div>
            </Container>
          </Col>
        </Row>
      </div>
    </Container>
    );
  }
  

export default Forgotpassword

