import { useState, useEffect } from "react";
import React from 'react'
import axios from "axios";
import "./App.css";
import Navbar from "./navbar";
import { Outlet, Link } from "react-router-dom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SideNavbar from "./sidebar";
import { AiFillEdit } from "react-icons/ai";
import SideBar from './sidebar';
import { AiTwotoneDelete } from "react-icons/ai";
import { AiOutlineDownload } from "react-icons/ai";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
const Displayfiles = () => {



  const [files, setfiles] = useState([]);
  const [show, setshow] = useState(true)
  const showing = () => {
    setshow(!show)
  }
  const add = 0;
  const storeData = async (id) => {
    console.log(id)
    try {
      await AsyncStorage.setItem('fileid', id);
    } catch (e) {
      throw e;
    }
  };


  const DeleteFiles = async (id) => {

    await axios.delete("http://localhost:3000/deleteqanoon/" + id)
      .then(() => {

        showing()
      })

  }


  const downloadFile = async (fileName, content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const textContent = doc.body.textContent;
  
    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };
  

  const getfiles = async (e) => {

    await axios.get("http://localhost:3000/getallqanoon").then((response) => {

      setfiles(response.data);
      //  console.log(files)


    });
  }
  useEffect(() => {
    getfiles();

  }, [files])



  return (
    <div  > <Navbar />

      <div className="home-container " >

        <SideBar />

        <div className="row " style={{ width: '83%', marginTop: '1%', marginLeft: 'auto', overflow: 'auto', height: '100vh' }}>
          <div className="col-12 mt-3 text-center text-md-end " >

            <Link to="/texteditor">
              <Button style={{ maxWidth: '300px', width: '50%', backgroundColor: '#1B4235', margin: "1%" }} className="btn btn-dark" >
                New File
              </Button></Link>
          </div><div className="col-lg-12 col-12 grid-margin mb-5" >
            <div className="card">

              <div className="card-body">

                <div style={{
                  textAlign: 'center', flexDirection: 'row'
                }} >
                  <div className="img-responsive">
                    <img src={require('./images/ljcp.jpg')} alt="face" style={{ maxWidth: '10%', height: 'auto' }} />
                  </div>
                  <h4 className="card-title" >Editor Files  </h4>

                </div>
                <p className="card-description"> Total Files: {files.length}
                </p>

                <div className="table-responsive">
                  <table className="table">
                    <thead >
                      <tr>
                        <th> No:  </th>
                        <th style={{ width: '39%' }}> File Name</th>

                        <th> Created On </th>
                        <th> Download Txt </th>
                        <th>Edit File </th>
                        <th>Delete File </th>

                      </tr>
                    </thead>

                    <tbody>

                      {files.map((file, index) => (

                        <tr key={file._id}>

                          <td>{index + 1}  </td>

                          <td>
                            {file.name}</td>
                          <td> {file.created.substring(0, 10)} </td>

                          <td>
                            {/* Download File */}
                            <button
                              style={{ textDecoration: "none", backgroundColor: "white", borderWidth: 0 }}
                              onClick={() => downloadFile(file.name + ".txt", file.content)}
                            >
                             <AiOutlineDownload style={{ fontSize: '25px', color: '#1B4235' , margin:10}}  />
                            </button>
                          </td>


                          <td  ><button style={{
                            textDecoration: 'none', backgroundColor: 'white', borderWidth: 0


                          }}> <Link to="/Updatefileeditor" style={{ color: 'white', textDecoration: 'none' }}><AiFillEdit style={{ fontSize: '25px', color: '#1B4235' }} onClick={() => storeData(file._id)} />  </Link>


                          </button>


                          </td>
                          <td >

                            <button style={{
                              textDecoration: 'none', backgroundColor: 'white', borderWidth: 0


                            }}><AiTwotoneDelete style={{ fontSize: '25px', color: '#1B4235' }} onClick={() => DeleteFiles(file._id)} />


                            </button>  </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default Displayfiles