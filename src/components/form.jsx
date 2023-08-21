import React from 'react'
import SideNavbar from './sidebar'
import { Component, useState } from 'react'
import { Outlet, Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { FaPlus } from 'react-icons/fa';
import { AiTwotoneDelete } from "react-icons/ai";
import { CDBInput, CDBCard, CDBCardBody, CDBIcon, CDBBtn, CDBLink, CDBContainer } from 'cdbreact';
import SideBar from './sidebar';
import RichTextEditor from "./editor";

const Form = () => {
  const [text, setText] = useState('');

  function handleTextChange(event) {
    setText(event.target.value);
  }
  const [categories, setCategories] = useState([{ name: '', id: 0 }]);
  const [categoryOptions] = useState([
    { value: 'Option 1', label: 'Option 1' },
    { value: 'Option 2', label: 'Option 2' },
    { value: 'Option 3', label: 'Option 3' },
  ]);
  const handleCategoryChange = (e, index) => {
    const newCategories = [...categories];
    newCategories[index].name = e.target.value;
    setCategories(newCategories);
  };
  const [options, setOptions] = useState([{ name: '', id: 0 }]);
  const [selectOptions] = useState([
    { value: 'Option 1', label: 'Option 1' },
    { value: 'Option 2', label: 'Option 2' },
    { value: 'Option 3', label: 'Option 3' },
  ]);
  const handleOptionChange = (e, index) => {
    const newOptions = [...options];
    newOptions[index].name = e.target.value;
    setOptions(newOptions);
  };


  return (

    <div><SideBar />


      <div className="col-lg-11 grid-margin stretch-card" style={{ marginLeft: '16%', width: '84%', marginTop: '10%' }}>
        <h1 className='tainmodel'>
          Add category
        </h1>
        <div
          style={{
            background: "rgb(215 212 212 / 30%)",
            padding: '40px',
            marginLeft: '69px',
            marginRight: '66px'
            , height: '400px'
            , display: 'flex',flexDirection:'column'
          }}>
          <div style={{
            display: 'flex'}}>
            {categories.map((category, index) => (
              <div style={{ height: '38PX' }} key={category.id}>
                <label className='tainmodel91'>Select Category </label>
                <select
                  style={{ border: 'green', borderRadius: '6px', margin: '2px' }}
                  value={category.name}
                  onChange={(e) => handleCategoryChange(e, index)}
                >
                  <option style={{ border: 'green', borderRadius: '6px' }} value="">Select Category</option>
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <input style={{ margin: '2px' }}
                  type="text"
                  
                  value={category.name}
                  onChange={(e) => handleCategoryChange(e, index)}
                />
              </div>
            ))}



            {options.map((category, index) => (
              <div style={{ marginLeft: '83px', height: '38PX' }} key={category.id}>
                <label className='tainmodel91'>Select Sub-Category </label>
                <select
                  style={{ border: 'green', borderRadius: '6px', margin: '2px' }}
                  value={category.name}
                  onChange={(e) => handleOptionChange(e, index)}
                >
                  <option style={{ border: 'green', borderRadius: '6px' }} value="">Select Category</option>
                  {selectOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <input style={{ margin: '2px' }}
                  type="text"
                  value={category.name}
                  onChange={(e) => handleOptionChange(e, index)}
                />
              </div>
            ))}

          </div>

          <div style={{
           
            marginTop: '66px'
            
            , display: 'flex'}}>
            <textarea
              value={text}placeholder='یہاں لکھیں'
              onChange={handleTextChange}
              style={{ direction: 'rtl', height: '200px', width: '100%' }}
            /></div>
          <div
          style={{width: '102%', justifyContent: 'center', display: 'flex', alignItems: 'center',    marginTop: '14px' }}>
          <Link class="nav-link" to="/sucess">
                        <div className='button1' >
                            Add category
                        </div>
          </Link>
          </div>

        </div>
          

      </div>

    </div>
  )
}

export default Form