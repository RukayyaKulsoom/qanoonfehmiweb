import React, { useState, useEffect } from 'react';
import SideNavbar from './sidebar';
import { Link } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';
import { AiTwotoneDelete } from 'react-icons/ai';
import axios from 'axios';
import SideBar from './sidebar';
import Navbar from './navbar';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const Users = () => {
  const [users, setusers] = useState([]);
  const [search, setsearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [show, setshow] = useState(true);
  const [editedfname, setEditedfname] = useState('');
  const [editeduserId, setEditeduserId] = useState('');
  const [editedlname, setEditedlname] = useState('');
  const [editedemail, setEditedemail] = useState('');
  const [editedcontact, setEditedcontact] = useState('');
  const [editedrole, setEditedrole] = useState('');
  const [editedpass, setEditedpass] = useState('');
  const [editedretypepass, setEditedretypepass] = useState('');


  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role || "";
  
  const getusers = async () => {

    console.log(user.role)
    await axios.get('http://localhost:3000/getallusers').then((response) => {
      setusers(response.data);
    });
  };

  const showing = () => {
    setshow(!show);
  };

  const updateuser = async (id) => {
    if (editedfname !== '' || editedlname !== '' || editedemail !== '' || editedcontact !== '' || editedpass!=='' || editedretypepass!=='' || editedrole!=='') {
      await axios.put(`http://localhost:3000/updateuser/${id}`, {
        fname: editedfname,
        lname: editedlname,
        email: editedemail,
        contact: editedcontact,
        password: editedpass,
        retypepass: editedretypepass,
        role:editedrole,
      });
      alert('User Updated!');
      setEditedfname('');
      setEditedlname('');
      setEditedemail('');
      setEditedcontact('');
      setEditeduserId('');
      setEditedpass('');
      setEditedretypepass('');
      setEditedrole('');
    } else {
      alert('Enter some content');
    }
  };

  const Deleteuser = async (id) => {
    await axios.delete(`http://localhost:3000/deleteuser/${id}`).then(() => {
      showing();
    });
  };

  const searchfunc = () => {
    if (search !== '') {
      const newarray = users.filter((user) => {
        return Object.values(user).join(' ').toLowerCase().includes(search.toLowerCase());
      });
      setSearchResults(newarray);
    } else {
      setSearchResults(users);
    }
  };

  useEffect(() => {
    getusers();
    searchfunc();
  }, [users]);

  const handleInputChange = (event) => {
    setsearch(event.target.value);
    searchfunc(event.target.value);
  };

 

  return (
    
    <div>
 {userRole !== 'admin' ? (
        // If the user is not an admin, display "Access denied" message
       <center> <div style={{ color:"red", fontWeight:"bold", fontSize:30, marginTop:'10%'}}>Access denied! You need to be an admin to view this page.</div></center>
      ) : (
    
        
<div  > <Navbar />
  
  <div className="home-container " >

    <SideBar />
      
    <div className="row " style={{ width: '100%', marginTop:'1%',  overflow:'auto',height:'100vh' }}>
        <div className='mb-3' style={{ flexDirection: 'row', marginBottom: 5, width: '100%', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', borderRadius: 0, border: 'none' ,height:'65px'}}>
          <form action="/search">
            <input
              type="text"
              style={{ marginTop: 10, border: 'none', padding: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', borderRadius: '5px 0 0 5px', fontSize: '16px', width: '50%', marginLeft: '25%' }}
              value={search}
              placeholder="Filter users"
              onChange={handleInputChange}
            />
            <button style={{ backgroundColor: '#1B4235', color: 'white', border: 'none', borderRadius: '0 5px 5px 0', cursor: 'pointer', padding: '10px' }} onClick={() => searchfunc()}>
              <i className="fa fa-search" style={{ fontSize: '20px' }}></i>
            </button>
          </form>
        </div>
        <div className="col-lg-12 grid-margin stretch-card" style={{   margin:'2%', width: '98%', marginTop: '1%'  }}>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Added Users</h4>
              <p className="card-description">Total Users: {users.length}</p>
              <div className="col-12 mt-3 text-center text-md-end " >

<Link to="/signup">
      <Button style={{ maxWidth: '200px', width: '50%', backgroundColor:'#1B4235' , margin:"1%"}}  className="btn btn-dark" >
        Add User
      </Button></Link>
    </div>

                  
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Contact No</th>
                      <th>Password</th>
                      <th>Confirm Password</th>
                      <th>Role</th>
                      <th>Edit Profile</th>
                      <th>Delete User</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((searchResult, index) => (
                      <tr key={searchResult._id}>
                        <td>{index + 1}</td>
                        <td>
                          {editeduserId === searchResult._id ? (
                            <div>
                              <textarea
                                value={editedfname}
                                onChange={(e) => setEditedfname(e.target.value)}
                                style={{
                                  minHeight: '60px',
                                  height: 'auto',
                                  resize: 'vertical',
                                  width: '80%',
                                }}
                              />
                              <br />
                              <button
                                style={{
                                  width: '100%',
                                  height: '20%',
                                  color: 'white',
                                  backgroundColor: '#1B4235',
                                  marginTop: '1%',
                                  marginLeft: '1%',
                                  borderWidth: 0,
                                }}
                                onClick={() => {
                                  updateuser(searchResult._id);
                                }}
                              >
                                Update
                              </button>
                            </div>
                          ) : (
                            searchResult.fname
                          )}
                        </td>
                        <td>
                          {editeduserId === searchResult._id ? (
                            <div>
                              <textarea
                                value={editedlname}
                                onChange={(e) => setEditedlname(e.target.value)}
                                style={{
                                  minHeight: '60px',
                                  height: 'auto',
                                  resize: 'vertical',
                                  width: '80%',
                                }}
                              />
                              <br />
                              <button
                                style={{
                                  width: '100%',
                                  height: '20%',
                                  color: 'white',
                                  backgroundColor: '#1B4235',
                                  marginTop: '1%',
                                  marginLeft: '1%',
                                  borderWidth: 0,
                                }}
                                onClick={() => {
                                  updateuser(searchResult._id);
                                }}
                              >
                                Update
                              </button>
                            </div>
                          ) : (
                            searchResult.lname
                          )}
                        </td>
                        <td>
                          {editeduserId === searchResult._id ? (
                            <div>
                              <textarea
                                value={editedemail}
                                onChange={(e) => setEditedemail(e.target.value)}
                                style={{
                                  minHeight: '60px',
                                  height: 'auto',
                                  resize: 'vertical',
                                  width: '80%',
                                }}
                              />
                              <br />
                              <button
                                style={{
                                  width: '50%',
                                  height: '20%',
                                  color: 'white',
                                  backgroundColor: '#1B4235',
                                  marginTop: '1%',
                                  marginLeft: '15%',
                                  borderWidth: 0,
                                }}
                                onClick={() => {
                                  updateuser(searchResult._id);
                                }}
                              >
                                Update
                              </button>
                            </div>
                          ) : (
                            searchResult.email
                          )}
                        </td>
                        <td>
                          {editeduserId === searchResult._id ? (
                            <div>
                              <textarea
                                value={editedcontact}
                                onChange={(e) => setEditedcontact(e.target.value)}
                                style={{
                                  minHeight: '60px',
                                  height: 'auto',
                                  resize: 'vertical',
                                  width: '80%',
                                }}
                              />
                              <br />
                              <button
                                style={{
                                  width: '70%',
                                  height: '20%',
                                  color: 'white',
                                  backgroundColor: '#1B4235',
                                  marginTop: '1%',
                                  marginLeft: '10%',
                                  borderWidth: 0,
                                }}
                                onClick={() => {
                                  updateuser(searchResult._id);
                                }}
                              >
                                Update
                              </button>
                            </div>
                          ) : (
                            searchResult.contact
                          )}
                        </td>


                        <td>
                          {editeduserId === searchResult._id ? (
                            <div>
                              <textarea
                                value={editedpass}
                                onChange={(e) => setEditedpass(e.target.value)}
                                style={{
                                  minHeight: '60px',
                                  height: 'auto',
                                  resize: 'vertical',
                                  width: '90%',
                                }}
                              />
                              <br />
                              <button
                                style={{
                                  width: '80%',
                                  height: '20%',
                                  color: 'white',
                                  backgroundColor: '#1B4235',
                                  marginTop: '1%',
                                  marginLeft: '10%',
                                  borderWidth: 0,
                                }}
                                onClick={() => {
                                  updateuser(searchResult._id);
                                }}
                              >
                                Update
                              </button>
                            </div>
                          ) : (
                            searchResult.password
                          )}
                        </td>

                        <td>
                          {editeduserId === searchResult._id ? (
                            <div>
                              <textarea
                                value={editedretypepass}
                                onChange={(e) => setEditedretypepass(e.target.value)}
                                style={{
                                  minHeight: '60px',
                                  height: 'auto',
                                  resize: 'vertical',
                                  width: '90%',
                                }}
                              />
                              <br />
                              <button
                                style={{
                                  width: '80%',
                                  height: '20%',
                                  color: 'white',
                                  backgroundColor: '#1B4235',
                                  marginTop: '1%',
                                  marginLeft: '10%',
                                  borderWidth: 0,
                                }}
                                onClick={() => {
                                  updateuser(searchResult._id);
                                }}
                              >
                                Update
                              </button>
                            </div>
                          ) : (
                            searchResult.retypepass
                          )}
                        </td>
                        <td>
                          {editeduserId === searchResult._id ? (
                            <div>
                              <textarea
                                value={editedrole}
                                onChange={(e) => setEditedrole(e.target.value)}
                                style={{
                                  minHeight: '60px',
                                  height: 'auto',
                                  resize: 'vertical',
                                  width: '80%',
                                }}
                              />
                              <br />
                              <button
                                style={{
                                  width: '100%',
                                  height: '20%',
                                  color: 'white',
                                  backgroundColor: '#1B4235',
                                  marginTop: '1%',
                                  marginLeft: '1%',
                                  borderWidth: 0,
                                }}
                                onClick={() => {
                                  updateuser(searchResult._id);
                                }}
                              >
                                Update
                              </button>
                            </div>
                          ) : (
                            searchResult.role
                          )}
                        </td>

                        
                        <td>
                          <button
                            style={{
                              textDecoration: 'none',
                              backgroundColor: 'white',
                              borderWidth: 0,
                            }}
                            onClick={() => {
                              setEditedfname(searchResult.fname);
                              setEditedlname(searchResult.lname);
                              setEditedemail(searchResult.email);
                              setEditedcontact(searchResult.contact);
                              setEditeduserId(searchResult._id);
                              setEditedpass(searchResult.password);
                              setEditedretypepass(searchResult.retypepass);
                              setEditedrole(searchResult.role);
                            }}
                          >
                            <AiFillEdit style={{ fontSize: '25px', color: '#1B4235' }} />
                          </button>
                        </td>
                        <td>
                          <button
                            style={{
                              textDecoration: 'none',
                              backgroundColor: 'white',
                              borderWidth: 0,
                            }}
                            onClick={() => Deleteuser(searchResult._id)}
                          >
                            <AiTwotoneDelete style={{ fontSize: '25px', color: '#1B4235' }} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div> </div>
      </div></div>
     )}
     </div>
       
  );
    
};

export default Users;
