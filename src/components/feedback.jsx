import { useState, useEffect } from "react";

import axios from "axios";
import "./App.css";
import Navbar from "./navbar";
import { AiFillEdit } from "react-icons/ai";
import { Outlet, Link } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";
import SideNavbar from "./sidebar";
import {AiFillSave} from "react-icons/ai";
import SideBar from './sidebar';
import { Container,Row, Col ,Card , Button} from 'react-bootstrap';

const Displayfeedback = (props) => {
  const [feedbacks, setfeedbacks] = useState([]);
  const [search, setsearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [show, setshow] = useState(true)
  const [editedMsg, setEditedMsg] = useState('');
  const [editedMsgId, setEditedMsgId] = useState('');



  const getfeedbacks = async (e) => {

    await axios.get("http://localhost:3000/getallfeedbacks").then((response) => {
console.log(response.data)
      setfeedbacks(response.data);
      //  console.log(feedbacks)


    });
  }
  const showing = () => {
    setshow(!show)
  }


  const Deletefeedback = async (id) => {

    await axios.delete("http://localhost:3000/deletefeedback/" + id)
      .then(() => {
   
        showing()
        
      })

  }


  const Deletefeedbacks = async (id) => {

    await axios.delete("http://localhost:3000/deletefeedbacks")
      .then(() => {
   
        showing()
        
      })

  }

  useEffect(() => {
    getfeedbacks();

    searchfunc();
  }, [feedbacks])
  const handleInputChange = (event) => {
    setsearch(event.target.value);
    searchfunc(event.target.value);
  }

  const searchfunc = () => {
    if (search !== "") {
      const newarray = feedbacks.filter((msg) => {
        return Object.values(msg)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setSearchResults(newarray)
    } else {
      setSearchResults(feedbacks);
    }
  }
 

  return (
    <div  > <Navbar />
  
    <div className="home-container " >
      <SideBar />

      <div className="row " style={{ width: '100%', marginTop:'1%',  overflow:'auto' }}>

        <div className='mb-1' style={{ flexDirection: 'row', marginBottom: 5, width: '100%', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', borderRadius: 0, border: 'none' }}>

          <form action="/search" >

            <input type="text" style={{ marginTop: 10, border: 'none', padding: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', borderRadius: '5px 0 0 5px', fontSize: '16px', width: '50%', marginLeft: '25%' }}
              msg={search.length < 1 ? feedbacks : searchResults}
              value={search}
              placeholder=" Filter feedbacks"
            
              onChange={handleInputChange}

            />  <button style={{ backgroundColor: '#1B4235', color: 'white', border: 'none', borderRadius: '0 5px 5px 0', cursor: 'pointer', padding: '10px' }} onClick={()=>searchfunc()} ><i className="fa fa-search" style={{ fontSize: '20px' }} ></i></button></form>



        </div>



        <div className="row ">
        <div className="col-12 mt-3 text-center text-md-end " >


      <Button style={{ maxWidth: '300px', width: '50%', backgroundColor:'#1B4235' , margin:"1%"}}  className="btn btn-dark"  onClick={Deletefeedbacks}>
        Delete All Feedbacks?
      </Button>
    </div>
          <div className="col-lg-12 col-12 grid-margin mb-3" style={{ margin:'2%', width: '100%', marginTop: '1%' }}>
            <div className="card">

              <div className="card-body">

                <div style={{
                  textAlign: 'left'
                }} >
                  <h4 className="card-title" > All Feedbacks </h4>

                </div>
                <p className="card-description"> Total : {feedbacks.length}
                </p>

                <div className="table-responsive">
                  <table className="table">
                    <thead >
                      <tr>

                        <th> Serial No.  </th>
                        <th style={{ width: '40%' }}> All Feedbacks</th>
                      
                        <th>Delete Feedback </th>


                      </tr>
                    </thead>

                    <tbody>

                      {searchResults.map((searchResults, index) => (

                        <tr key={searchResults._id}>
                          <td>{index + 1}  </td>
                       
                          <td>
                          {searchResults.feedback}</td>
                        


                          <td>
                            <button style={{
                              textDecoration: 'none', backgroundColor: 'white', borderWidth: 0


                            }}> <AiTwotoneDelete style={{ fontSize: '25px', color: '#1B4235' }} onClick={() => Deletefeedback(searchResults._id)} />


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

    </div>

  );
};
export default Displayfeedback