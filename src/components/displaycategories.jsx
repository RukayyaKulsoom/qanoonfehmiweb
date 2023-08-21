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

const Displaycategory = (props) => {
  const [category, setcategory] = useState([]);
  const [search, setsearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [show, setshow] = useState(true)
  const [editedcategory, setEditedcategory] = useState('');
  const [editedcategoryId, setEditedcategoryId] = useState('');

  const getcategory = async (e) => {

    await axios.get("http://localhost:3000/getallcategories").then((response) => {

      setcategory(response.data);
      console.log(category)


    });
  }
  const showing = () => {
    setshow(!show)
  }

  const updatecategory = async (id) => {
   
 if(editedcategory!=''){


    await axios.put("http://localhost:3000/updatecategory/"+id, { category: editedcategory }).then(() => {
        try {
            alert("category Updated!");
        } catch (e) {
            alert("Enter some content");
        }
    });
     } else {
      alert("Enter some content");
     }
}
  const Deletecategory = async (id) => {

    await axios.delete("http://localhost:3000/deletecategory/" + id)
      .then(() => {
   
        showing()
        
      })

  }


  useEffect(() => {
    getcategory();

    searchfunc();
  }, [category])
  const handleInputChange = (event) => {
    setsearch(event.target.value);
    searchfunc(event.target.value);
  }

  const searchfunc = () => {
    if (search !== "") {
      const newarray = category.filter((category) => {
        return Object.values(category)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setSearchResults(newarray)
    } else {
      setSearchResults(category);
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
              category={search.length < 1 ? category : searchResults}
              value={search}
              placeholder=" Filter category"
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
                  <h4 className="card-title" > Category </h4>

                </div>
                <p className="card-description"> Total : {category.length}
                </p>

                <div className="table-responsive">
                  <table className="table">
                    <thead >
                      <tr>

                        <th> Serial No.  </th>
                        <th style={{ width: '40%' }}> Categories</th>
                       
                        <th>Edit category </th>
                        <th>Delete Category </th>


                      </tr>
                    </thead>

                    <tbody>

                      {searchResults.map((searchResults, index) => (

                        <tr key={searchResults._id}>
                          <td>{index + 1}  </td>
                          <td>


                            {editedcategoryId === searchResults._id ? (
                              <div>
                              <textarea
                                value={editedcategory}
                                onChange={(e) => setEditedcategory(e.target.value)}
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
                                // Call your save function here to update the category in the database
                                // with editedcategory and editedcategoryId
                                    updatecategory(searchResults._id);

                                setEditedcategory('');
                                setEditedcategoryId('');
                              }}
                            >
                           Update
                            </button>
                            </div>
                            ) : (
                              searchResults.category
                            )}
                        
                          </td>

                      
                          <td >
                            <button style={{
                              textDecoration: 'none', backgroundColor: 'white', borderWidth: 0

                            }} onClick={() => {
                              setEditedcategory(searchResults.category);
                              setEditedcategoryId(searchResults._id);
                            }}> <AiFillEdit style={{ fontSize: '25px', color: '#1B4235' }} />
                            </button>
                          </td>


                          <td>
                            <button style={{
                              textDecoration: 'none', backgroundColor: 'white', borderWidth: 0


                            }}> <AiTwotoneDelete style={{ fontSize: '25px', color: '#1B4235' }} onClick={() => Deletecategory(searchResults._id)} />


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
export default Displaycategory