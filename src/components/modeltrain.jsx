
import React from 'react'
import { Outlet, Link } from "react-router-dom";
import Navbar from "./navbar";
import { useState, useEffect, button } from "react";
import axios from 'axios'
import './App.css';
import * as XLSX from 'xlsx';
import SideNavbar from './sidebar';
import SideBar from './sidebar';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

const ModelTrain = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [data, setdata] = useState('');
  const [files, setfiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState('');

  const getfiles = async (e) => {

    await axios.get("http://localhost:3000/getallqanoon").then((response) => {

      setfiles(response.data);
      //  console.log(files)


    });
  }
const handleFileChangen = async (event) => {

  setSelectedFileId(event.target.value);
console.log(selectedFileId)
 GettingVolume()

  
};

const GettingVolume = async () => {
  const selectedId = selectedFileId; // Store the selectedFileId in a local variable

  if (!selectedId) {
    console.log('empty')
    return;
  }

  try {
    const response = await axios.get("http://localhost:3000/getoneqanoon/" + selectedId);
    const contentWithHtml = response.data.content; // Assuming the content contains HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(contentWithHtml, "text/html");
    const contentWithoutHtml = doc.body.textContent;

    setdata(contentWithoutHtml);
    console.log(contentWithoutHtml);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

useEffect(() => {
  // Call GettingVolume whenever selectedFileId changes
  if (selectedFileId) {
    GettingVolume();
  }
}, [selectedFileId]);
  useEffect(() => {
  
    getfiles()

  }, []);

  const handleUploadn = async (event) => {
    event.preventDefault();



    try {
      const response = await axios.post('http://localhost:3000/uploadtext', { content: data });
      setMessage(response.data.message);
      alert('file Uploaded')
    } catch (error) {
      console.error('Error uploading text file:', error);
      setMessage('Error uploading text file.');
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();



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
        <div className="row mb-5" style={{ width: '100%', marginTop: '1%', overflow: 'auto', height: 'auto' }}>
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
                      <input type="file" onChange={handleFileChange} accept=".txt" />

                      <Button type="submit" style={{ maxWidth: '300px', width: '50%', backgroundColor: '#1B4235', margin: "1%" }} className="col-12 btn btn-dark" >
                        Train Model
                      </Button>
                    </form>
                    <div>{message}</div>
                  </div>
                  <div className="col-12 mt-3 text-center text-md-end " >
  <Form >
  <Form.Group>
      <Form.Control as="select" onChange={handleFileChangen}>
        <option value="">Select from your files</option>
        {files.map((file) => (
          <option key={file._id} value={file._id}>
            {file.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  </Form>
<button className="col-12 btn btn-dark" style={{ maxWidth: '300px', width: '50%', backgroundColor: '#1B4235', margin: "1%" }} onClick={ handleUploadn} >
                              
Upload File

</button> 


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