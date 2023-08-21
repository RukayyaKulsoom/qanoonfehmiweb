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

const Displaymessages = (props) => {
  const [messages, setmessages] = useState([]);
  const [search, setsearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [show, setshow] = useState(true)
  const [editedMsg, setEditedMsg] = useState('');
  const [editedMsgId, setEditedMsgId] = useState('');
  const getmessages = async (e) => {

    await axios.get("http://localhost:3000/getallmessage").then((response) => {

      setmessages(response.data);
      //  console.log(messages)


    });
  }
  const showing = () => {
    setshow(!show)
  }

  const updatemsg = async (id) => {
   
 if(editedMsg!=''){


    await axios.put("http://localhost:3000/updatemessage/"+id, { msg: editedMsg }).then(() => {
        try {
            alert("Message Updated!");
        } catch (e) {
            alert("Enter some content");
        }
    });
     } else {
      alert("Enter some content");
     }
}
  const DeleteMessage = async (id) => {

    await axios.delete("http://localhost:3000/deletemessage/" + id)
      .then(() => {
   
        showing()
        
      })

  }


  useEffect(() => {
    getmessages();

    searchfunc();
  }, [messages])
  const handleInputChange = (event) => {
    setsearch(event.target.value);
    searchfunc(event.target.value);
  }

  const searchfunc = () => {
    if (search !== "") {
      const newarray = messages.filter((msg) => {
        return Object.values(msg)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setSearchResults(newarray)
    } else {
      setSearchResults(messages);
    }
  }

  return (
    <div  > <Navbar />
  
    <div className="home-container " >
      <SideBar />

      <div className="row " style={{ width: '100%', marginTop:'1%',  overflow:'auto',height:'100vh' }}>
        <div className='mb-5' style={{ flexDirection: 'row', marginBottom: 5, width: '100%', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', borderRadius: 0, border: 'none' }}>



          <form action="/search" >

            <input type="text" style={{ marginTop: 10, border: 'none', padding: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', borderRadius: '5px 0 0 5px', fontSize: '16px', width: '50%', marginLeft: '25%' }}
              msg={search.length < 1 ? messages : searchResults}
              value={search}
              placeholder=" Filter Messages"
              dir="rtl"
              onChange={handleInputChange}

            />  <button style={{ backgroundColor: '#1B4235', color: 'white', border: 'none', borderRadius: '0 5px 5px 0', cursor: 'pointer', padding: '10px' }} onClick={()=>searchfunc()} ><i className="fa fa-search" style={{ fontSize: '20px' }} ></i></button></form>



        </div>



        <div className="row">
          <div className="col-lg-12 col-12 grid-margin" style={{ margin:'2%', width: '100%', marginTop: '1%' }}>
            <div className="card">

              <div className="card-body">

                <div style={{
                  textAlign: 'left'
                }} >
                  <h4 className="card-title" > Questions Asked By Users </h4>

                </div>
                <p className="card-description"> Total : {messages.length}
                </p>

                <div className="table-responsive">
                  <table className="table">
                    <thead >
                      <tr>

                        <th> Serial No.  </th>
                        <th style={{ width: '40%' }}> Questions Asked</th>
                        <th> Created On </th>
                        <th>Edit Message </th>
                        <th>Delete Question </th>


                      </tr>
                    </thead>

                    <tbody>

                      {searchResults.map((searchResults, index) => (

                        <tr key={searchResults._id}>
                          <td>{index + 1}  </td>
                          <td>


                            {editedMsgId === searchResults._id ? (
                              <div>
                              <textarea
                                value={editedMsg}
                                onChange={(e) => setEditedMsg(e.target.value)}
                                style={{
                                  minHeight: '60px', // Set the minimum height
                                  height: 'auto', // Allow the height to adjust automatically
                                  resize: 'vertical', // Allow vertical resizing
                                  width: '80%',
                                
                                }}
                              />
                              <br />
                              <button
                              style={{
                                width: '15%',
                                height:'20%',
                                color: 'white',
                                backgroundColor: '#1B4235', 
                              marginTop:'1%',
                              marginLeft:'30%',
                            
                              borderWidth:0

                              }}
                              onClick={() => {
                                // Call your save function here to update the message in the database
                                // with editedMsg and editedMsgId
                                    updatemsg(searchResults._id);

                                setEditedMsg('');
                                setEditedMsgId('');
                              }}
                            >
                           Update
                            </button>
                            </div>
                            ) : (
                              searchResults.msg
                            )}
                        
                          </td>

                          <td> {searchResults.created.substring(0, 10)} </td>
                          <td >
                            <button style={{
                              textDecoration: 'none', backgroundColor: 'white', borderWidth: 0

                            }} onClick={() => {
                              setEditedMsg(searchResults.msg);
                              setEditedMsgId(searchResults._id);
                            }}> <AiFillEdit style={{ fontSize: '25px', color: '#1B4235' }} />
                            </button>
                          </td>


                          <td>
                            <button style={{
                              textDecoration: 'none', backgroundColor: 'white', borderWidth: 0


                            }}> <AiTwotoneDelete style={{ fontSize: '25px', color: '#1B4235' }} onClick={() => DeleteMessage(searchResults._id)} />


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
export default Displaymessages