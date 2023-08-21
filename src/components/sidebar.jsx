import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { ImExit } from 'react-icons/im';
import { BsFiles, BsQuestionSquare, BsFillMenuButtonWideFill, BsPatchQuestionFill } from 'react-icons/bs';
import { BiUser, BiHome } from 'react-icons/bi';
import { FaUsers } from 'react-icons/fa';
import Offcanvas from "react-bootstrap/Offcanvas";
import Dropdown from "react-bootstrap/Dropdown";
import logo3 from "./images/logo.png";
import { NavLink, useNavigate,Link } from "react-router-dom";
import { BiGroup } from "react-icons/bi";

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarSubMenu,
  CDBSidebarMenuItem,
  CDBSidebarMenu,
  CDBDropDown,
} from "cdbreact";



const SideBar = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'));
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login")
  }

  return (
    
    <div
      style={{ display: "flex", height: "100vh" }}
    >

      <CDBSidebar textColor="#fff" backgroundColor="#002C1C">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        <a className="text-decoration-none" style={{ color: "inherit" }}>
            Qanoon Fehmi
            <br></br>
            (Admin Panel)
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content" style={{ fontsize: 20}}>
          <CDBSidebarMenu>
           

            <NavLink exact to="/home" activeClassName="activeClicked" >
              <CDBSidebarMenuItem icon="home">
                <h5
                  className="pt-2"
                  style={{ fontWeight: 300, marginLeft: 20, fontsize: 15 }}
                >
                  {" "}
                  Home 
                </h5>
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/displayfiles" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="file">

                <h5
                  className="pt-2"
                  style={{ fontWeight: 300, marginLeft: 20, fontsize: 22 }}
                >
                  {" "}
                  My Files 
                </h5>
                
              </CDBSidebarMenuItem>
            </NavLink>

       
            <NavLink exact to="/modeltraining" activeClassName="activeClicked" >
              <CDBSidebarMenuItem icon="credit-card">
                <h5
                  className="pt-2"
                  style={{ fontWeight: 300, marginLeft: 20, fontsize: 22 }}
                >
                  {" "}
                   Model Training
                </h5>
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/displaymessages" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="question">
                <h5
                  className="pt-2"
                  style={{ fontWeight: 300,marginLeft: 20, fontsize: 19 }}
                >
                  {" "}
                  Questions Asked
                </h5>
              </CDBSidebarMenuItem>
            </NavLink>
            {/* chart-line */}

            <NavLink exact to="/users" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="users">
                <h5 className="pt-2" style={{  marginLeft: 20,fontWeight: 300, fontsize: 19 }}>
                User Management  <br /> (Admin only)
                </h5>
              </CDBSidebarMenuItem>
            </NavLink>
            {/* exclamation-circle */}

            <NavLink exact to="/texteditor" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="book">
                <h5
                  className="pt-2"
                  style={{ fontWeight: 300,marginLeft: 20, fontsize: 19 }}
                >
                  {" "}
                  Text Editor
                </h5>
              </CDBSidebarMenuItem>
            </NavLink>


            <NavLink exact to="/displayfeedbacks" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="book">
                <h5
                  className="pt-2"
                  style={{ fontWeight: 300,marginLeft: 20, fontsize: 19 }}
                >
                  {" "}
                  Feedbacks
                </h5>
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/addcategory" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="book">
                <h5
                  className="pt-2"
                  style={{ fontWeight: 300,marginLeft: 20, fontsize: 19 }}
                >
                  {" "}
                 Add categories
                </h5>
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/allcategories" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="book">
                <h5
                  className="pt-2"
                  style={{ fontWeight: 300,marginLeft: 20, fontsize: 19 }}
                >
                  {" "}
                View All categories
                </h5>
              </CDBSidebarMenuItem>
            </NavLink>

    

          </CDBSidebarMenu>
        </CDBSidebarContent>

    
      </CDBSidebar>
    </div>
  );
};
export default SideBar;