
import React from 'react';
import { useState } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import SideBar from './sidebar';
import Navbar from "./navbar";

const Category = () => {
  const [category, setcategory] = useState('');
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showPass = () => {
    setShow(!show);
  };

  const addcategory = async () => {
    if (!category) {
      setErrorMessage('Enter some content!');
    } else {

      try {
         await axios.post('http://localhost:3000/createcategory', {
            category
        });
        setErrorMessage('');
        setcategory("")
        alert('Category Added!');
      } catch (error) { }
    }
  };


  return (
    <div  > <Navbar />
  
  <div className="home-container " >

    <SideBar />
      
    <div className="row " style={{ width: '100%',  marginLeft: 'auto',  marginRight:'auto',overflow:'auto',height:'100vh' }}>
    <Container fluid className="background-image form-container">

      <div className='col-12'
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
        marginLeft: 'auto',
        marginRight:'auto',
          maxWidth: "500px", // Set the maximum width for the container
          padding: '20px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',

        }}>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={10}>
            <Container className="container">
              <Row className="justify-content-center">
                <Col xs="auto" className="text-center">
                  <div className="img-responsive" style={{ position: "relative", overflow: "hidden" }}
                  >
                    <img
                     src={require('./images/ljcp.jpg')} alt="face"
                      class="img-fluid"
                      style={{ maxWidth: '50%', height: 'auto' }}
                    />
                    <div class="sliding-div3"></div>
                  </div>
                  <Card.Text style={{ fontWeight: 'bold', fontSize: 19, marginTop: '5%' }}>
                    ADD CATEGORY FORM
                  </Card.Text>

                </Col>
              </Row>
              <Alert variant="light" className="mt-1" style={{ padding: '1px', color: 'red' }}>
                {errorMessage}
              </Alert>
              <div className="d-flex justify-content-center mt-5">

                <Form style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
                  <Form.Group controlId="category" className="mb-3">
                 
                    <Form.Control
                      type="category"
                      placeholder="Enter Category Name"
                      value={category}
                      onChange={(e) => setcategory(e.target.value)}

                      required
                    />

                  </Form.Group>

                  <div className="text-center" >
                    <Button style={{ maxWidth: '400px', width: '50%', backgroundColor:'#1B4235' }}  className="btn btn-dark" onClick={addcategory}>
                     Add Category
                    </Button>
                  </div>
                </Form>
              </div>
            </Container>
          </Col>
        </Row>
      </div>
    </Container>
    </div></div></div>
  );
};


export default Category;
