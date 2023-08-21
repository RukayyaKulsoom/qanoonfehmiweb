import React from 'react';
import { useState } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showPass = () => {
    setShow(!show);
  };

  const getuser = async () => {
    if (!email || !password) {
      setErrorMessage('Enter some content!');
    } else {
      try {
        const response = await axios.post('http://localhost:3000/loginuser', {
          email,
          password,
        });

        if (response.data.userfound == null) {
          setErrorMessage('Email or Password is incorrect!');
        } else {
          console.log(response.data.userfound);
          localStorage.setItem('user', JSON.stringify(response.data.userfound));
          navigate('/home');
        }
      } catch (error) { }
    }
  };

  const navscreen = async () => {
    navigate('/forgotpassword');
  };

  return (
    <Container fluid className="background-image form-container">

      <div class="container "
        style={{
          backgroundColor: 'white',
          borderRadius: 10,

          maxWidth: "500px", // Set the maximum width for the container
          padding: '20px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',

        }}>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={10}>
            <Container className="container">
              <Row className="justify-content-center">
                <Col xs="auto" className="text-center">
                  <div className="img-responsive">
                    <img src={require('./images/ljcp.jpg')} alt="face" style={{ maxWidth: '50%', height: 'auto' }} />
                  </div>
                  <Card.Text style={{ fontWeight: 'bold', fontSize: 19, marginTop: '5%' }}>
                    Law and Justice Commission of Pakistan
                  </Card.Text>


                </Col>
              </Row>
              <h4 className="text-center font-weight-bold mt-3">Sign In</h4>
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


                  <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <div className="position-relative" >
                      <Form.Control
                        type={show ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}

                        required
                      />
                      <AiFillEye
                        onClick={showPass}
                        style={{
                          fontSize: '25px',
                          color: '#1B4235',
                          cursor: 'pointer',
                          position: 'absolute',
                          top: '45%',
                          right: '10px',
                          transform: 'translateY(-50%)',
                        }}
                      />
                    </div>
                  </Form.Group>

                  <div className="text-center mb-3" >
                    <Button style={{ maxWidth: '600px' }} variant="link" className="btn btn-light" onClick={navscreen}>
                      Forgot Password?
                    </Button>
                  </div>
                  <div className="text-center" >
                    <Button style={{ maxWidth: '400px', width: '50%', backgroundColor:'#1B4235' }}  className="btn btn-dark" onClick={getuser}>
                      Login
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
};

export default Login;
