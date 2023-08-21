
import React from 'react'
import { Outlet, Link } from "react-router-dom";
import Navbar from "./navbar";
import { useState, useEffect } from "react";
import axios from 'axios'
import SideNavbar from "./sidebar";
import { useNavigate } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import SideBar from './sidebar';
import { Col, Row , Button, Container} from 'react-bootstrap';

const Signup = () => {
    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [retypepass, setretypepass] = useState("");
    const [contact, setcontact] = useState("");
    const [error, seterror] = useState(false)
    const [errormessage, seterrormessage] = useState();
    const [success, setsuccess] = useState(false);
    const [successmessage, setsuccessmessage] = useState();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [showc, setShowc] = useState(false);


    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    const Creatinguser = async (e) => {
        e.preventDefault();

        if (
            !email ||
            !fname ||
            !contact ||
            !password ||
            !retypepass ||
            !lname
        ) {
            seterror(true);
            seterrormessage("Please enter all the fields");
        } else if (!emailRegex.test(email)) {
            seterrormessage("");
            document.getElementById('email').innerHTML = "Invalid email format";
        }
        else if (password.length < 8) {
            seterrormessage("");
            document.getElementById('passworddisplay').innerHTML = "Password should be a minimum of 8 characters";
        } else if (password !== retypepass) {
            seterrormessage("");
            document.getElementById('repassworddisplay').innerHTML = "Passwords do not match";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(password)) {
            // The regex checks if the password contains at least one lowercase letter, one uppercase letter, and one number.
            seterrormessage("");
            document.getElementById('passworddisplay').innerHTML = "Password should contain at least one lowercase letter, one uppercase letter, and one number";
        } else if (!/^[a-zA-Z]+$/.test(fname)) {
            seterrormessage("");
            // The regex checks if the first name and last name contain only alphabetic characters.
            document.getElementById('firstname').innerHTML = "Only characters allowed for first name ";
        }
        else if (!/^[a-zA-Z]+$/.test(lname)) {
            // The regex checks if the first name and last name contain only alphabetic characters.
            seterrormessage("");
            document.getElementById('lastname').innerHTML = "Only characters allowed for  last name";

        }

        else {


            try {
                const response = await axios.post("http://localhost:3000/createuser", {
                    fname,
                    lname,
                    email,
                    password,
                    retypepass,
                    contact,
                });

                if (response.data.error) {

                    alert(response.data.error); // Show an alert message with the error
                } else {
                    navigate("/login")
                }
            } catch (error) {
                console.error(error);

                alert("User already exists with this email."); // Show an alert message for other errors
            }
        };

    };

    // function validation() {

    //     var name = document.getElementById('fname').value
    //     var last = document.getElementById('lname').value
    //     var email = document.getElementById('email').value
    //     var pass = document.getElementById('password').value
    //     var cpass = document.getElementById('retypepassword').value
    //     var phone = document.getElementById('contactno').value

    //     if ((name.length <= 2) || (name.length > 20)) {
    //         document.getElementById('firstname').innerHTML = "Name length must be between 2 and 20!";
    //         return false;
    //     }

    //     if (!(isNaN(name))) {
    //         document.getElementById('firstname').innerHTML = "Only characters are allowed!";
    //         return false;

    //     }
    //     if ((last.length <= 2) || (last.length > 20)) {
    //         document.getElementById('lastname').innerHTML = "Name length must be between 2 and 20!";
    //         return false;
    //     }
    //     if (!(isNaN(last))) {
    //         document.getElementById('lastname').innerHTML = "Only characters are allowed!";
    //         return false;

    //     }
    //     if (pass.length <= 3 || pass.length >= 20) {
    //         document.getElementById('passworddisplay').innerHTML = "Password length must be between 3 -and 20!";
    //         return false;
    //     }

    //     if (cpass != pass) {
    //         document.getElementById('displaypassword').innerHTML = "Confirm Password does not match!";
    //         return false;
    //     }
    //     if (phone.length < 11) {
    //         document.getElementById('contactnumber').innerHTML = "Contact length should not be less then 11!";
    //         return false;
    //     }
    // }
    // console.log('abc')
    return (
        <div  > <Navbar />

            <div className="home-container " >

                <SideBar />
                    <div className="row " style={{ width: '100%', marginTop: '1%', overflow: 'auto', height: '100vh', margin:'1%' }}>
                     <Container fluid>
                <Row className="justify-content-center mt-3">
                    <Col xs={12} sm={12} md={8} lg={12}>
          
                    <div className="col-lg-12 col-12 grid-margin" style={{ margin: '3%', width: '95%', marginTop: '1%' }}>
                        <div className="card">

                            <div className="card-body">
                                <div style={{
                                    textAlign: 'center', flexDirection: 'row'
                                }} >
                                    <div className="img-responsive">
                                        <img src={require('./images/ljcp.jpg')} alt="face" style={{ maxWidth: '10%', height: 'auto' }} />
                                    </div>
                                    <h4 className="card-title" >Add user  </h4>

                                </div>





                                {error && (
                                    <h5 style={{ fontSize: 20, color: "red" }}>{errormessage}</h5>
                                )}
                                {success && (
                                    <h5 style={{ fontSize: 20, color: "green" }}>{successmessage}</h5>
                                )}


                                <form action="#" onSubmit={Creatinguser} >
                                    <div class="form-floating mb-3">

                                        <input type="text" class="form-control" id="fname" placeholder="firstname" value={fname} onChange={(e) => setfname(e.target.value)} required />

                                        <label for="name">First Name</label>
                                        <span id="firstname" > </span>
                                    </div>


                                    <div class="form-floating mb-3">

                                        <input type="text" class="form-control" id="lname" placeholder="lastname" value={lname} onChange={(e) => setlname(e.target.value)} required />

                                        <label for="name">Last Name</label>

                                        <span id="lastname" > </span>

                                    </div>


                                    <div class="form-floating mb-3">

                                        <input type="email" class="form-control " id="email" placeholder="email" value={email} onChange={(e) => setemail(e.target.value)} required />

                                        <label for="floatingInput">Email address</label>

                                        <span id="email" > </span>


                                    </div>

                                    <div className="form-floating mb-3" style={{ position: 'relative' }}>
                                        <input
                                            type={show ? "text" : "password"}
                                            className="form-control"
                                            id="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setpassword(e.target.value)}
                                            required
                                        />

                                        <Row>
                                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
                                                    <AiFillEye
                                                        onClick={showPass}
                                                        style={{
                                                            fontSize: '25px', // Adjust the size as needed
                                                            color: '#1B4235',
                                                            cursor: 'pointer',
                                                        }}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <label htmlFor="password">Password</label>
                                        <span id="passworddisplay" > </span>
                                    </div>
                                    <div className="form-floating mb-3" style={{ position: 'relative' }}>
                                        <input
                                            type={showc ? "text" : "password"}
                                            className="form-control"
                                            id="retypepassword"
                                            placeholder="Password"
                                            value={retypepass}
                                            onChange={(e) => setretypepass(e.target.value)}
                                            required
                                        />

                                        <Row>
                                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <div style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
                                                    <AiFillEye
                                                        onClick={showCPass}
                                                        style={{
                                                            fontSize: '25px', // Adjust the size as needed
                                                            color: '#1B4235',
                                                            cursor: 'pointer',
                                                        }}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>

                                        <label htmlFor="retypepassword">Re-Type Password</label>
                                        <span id="repassworddisplay"> </span>
                                    </div>

                                    <div class="form-floating ">
                                        <input type="number" class="form-control" id="contactno" placeholder="Contact Number" value={contact} onChange={(e) => setcontact(e.target.value)} required />
                                        <label for="contactnumber">Contact Number</label>

                                        <span id="contactnumber" > </span>

                                    </div>
                                    <div className="text-center mt-3" >
                                    <Link to="/home">
      <Button style={{ maxWidth: '300px', width: '50%', backgroundColor:'#1B4235' , margin:"1%"}}  className="btn btn-dark" onClick={Creatinguser}>
        Add User
      </Button></Link>
    </div>

                                </form>







                            </div>
                        </div>
                    </div>
                
                 </Col>
                </Row>
            </Container>
            </div>
            </div>
        </div>


    )



}

export default Signup