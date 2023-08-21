import React, { useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { AiFillEye } from "react-icons/ai";
import { Container, Row, Col, Button } from 'react-bootstrap';

const Resetpassword = () => {
 
  const [password, setpassword] = useState("");
  const [retypepass, setretypepass] = useState("");
  const { token } = useParams();
  const [show, setShow] = useState(false);
    const [showc, setShowc] = useState(false);

   

    const [error, seterror] = useState(false)
    const [errormessage, seterrormessage] = useState();
    const [success, setsuccess] = useState(false);
    const [successmessage, setsuccessmessage] = useState();

    const showPass = () => {
      if (show === false) {
          setShow(true);
          return;
      }
      setShow(false);
  };
  const showCPass = () => {
      if (showc === false) {
          setShowc(true);
          return;
      }
      setShowc(false);
  };
    const handleResetPassword = async (e) => {
      e.preventDefault();

      if (
    
          !password ||
          !retypepass 
    
      )   {
        alert('Enter Something!')
    } else if (password !== retypepass) {
          seterrormessage("");
          document.getElementById('resetpass').innerHTML = "Passwords do not match";
      } 
      else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(password)) {
          // The regex checks if the password contains at least one lowercase letter, one uppercase letter, and one number.
          seterrormessage("");
          document.getElementById('retypepass').innerHTML = "Password should contain at least one lowercase letter, one uppercase letter, and one number";
      } 

      else {
        try {
          const response = await axios.post(`http://localhost:3000/resetpassword/${token}`, {
        
            password: password, 
            retypepass: retypepass
          });
    
          if (response.status === 201) {
            alert("Password Updated!")
            setpassword("")
            setretypepass("")
          } else {
            alert("Password Not Updated!")
          }
        } catch (error) {
          console.error(error);
        }
      };

  };
 

  return (

   <div className="background-image form-container" style={{ flexDirection: 'column' }}>
     <Col xs={12} sm={5} md={8} lg={12}>
          
            <Container className="container " style={{ maxWidth:'600px',backgroundColor: 'white', borderRadius: 10,  borderWidth: 2, height: '540px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', marginTop: '7%' }}>
                <Row className="justify-content-center">
                    <Col className="text-center mb-3">
                    <div className="img-responsive">
                    <img src={require('./images/ljcp.jpg')} alt="face" style={{ maxWidth: '10%', height: 'auto' }} />
                  </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4 className="text-center font-weight-light mb-lg-5 mt-3" style={{ fontWeight: 'bold' }}>Reset Your Password</h4>
                        <form>
                            <div className="form-floating mb-1" style={{ padding: 6, margin: 17, color: 'black' }}>
                                <input
                                    type={show ? 'text' : 'password'}
                                    className="form-control"
                                    id="password"
                                    size="lg"
                                    placeholder="Reset Password"
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)}
                                    required
                                />
                                <AiFillEye
                                    onClick={showPass}
                                    style={{ fontSize: '25px', color: '#1B4235', cursor: 'pointer', position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}
                                />
                                <label htmlFor="resetPassword">Reset Password</label>
                                <span style={{ color: 'red' }} id="resetpass" > </span>
                            </div>
                            <div className="form-floating mb-1" style={{ padding: 6, margin: 17 }}>
                                <input
                                    type={showc ? 'text' : 'password'}
                                    className="form-control"
                                    id="retypepassword"
                                    size="lg"
                                    placeholder="Confirm Password"
                                    value={retypepass}
                                    onChange={(e) => setretypepass(e.target.value)}
                                    required
                                />
                                <AiFillEye
                                    onClick={showCPass}
                                    style={{ fontSize: '25px', color: '#1B4235', cursor: 'pointer', position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}
                                />
                                <label htmlFor="retypepass">Confirm Password</label>
                                <span style={{ color: 'red' }} id="retypepass" > </span>
                            </div>
                            <center>
                                <Button
                                    type="button"
                                    className="btn btn-dark mt-5"
                                    style={{ width: '90%', borderRadius: 5, background: '#1B4235', height: 50, marginTop: 3 }}
                                    onClick={handleResetPassword}
                                >
                                    Reset Password
                                </Button>
                            </center>
                        </form>
                    </Col>
                </Row>
            </Container>
           </Col>
    </div>
   
  );
};

export default Resetpassword;
