
import React from 'react'
import { Outlet, Link } from "react-router-dom";
import Navbar from "./navbar";
import { useState, useEffect, button } from "react";
import axios from 'axios'
import './App.css';
import * as XLSX from 'xlsx';
import SideNavbar from './sidebar';
import SideBar from './sidebar';
import { Container, Row, Col, Button } from 'react-bootstrap';

const ModelTrain = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3000/uploadfile', formData);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error uploading text file:', error);
      setMessage('Error uploading text file.');
    }
  };
    return (
        <div  > <Navbar />
  
    <div className="home-container " >

      <SideBar />
      <div className="row mb-5" style={{ width: '100%', marginTop:'1%',  overflow:'auto',height:'auto' }}>
<Container fluid >
  <Row className="justify-content-center mt-5" >
    <Col xs={12} md={8} lg={10}>
      <h1 className="tainmodel">Upload Text File</h1>
      <div
        style={{
          background: "rgb(215 212 212 / 30%)",
          padding: '40px',
          height: '580px',
        }}
      >
   
       
        <div className="col-12 mt-3 text-center text-md-end " >
    <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} accept=".txt" required />
     
 
      

      <Button type="submit" style={{ maxWidth: '300px', width: '50%', backgroundColor:'#1B4235' , margin:"1%"}}  className="btn btn-dark" >
       Train
      </Button>  
       </form>
       <div>{message}</div>  
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


export default ModelTrain