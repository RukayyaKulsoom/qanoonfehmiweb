import React from 'react'

import SideNavbar from "./sidebar";
import Main from './main';
import Signup from './signup';
import SideBar from './sidebar';
import './Home.css'; // Import your CSS file for styling
import Navbar from './navbar'

const Home = () => {
  return (
   <div>  
 <Navbar />
  
   <div className="home-container" >
       
      <SideBar /> 
      <Main></Main>
 
   </div>
    </div>
    
  )
}

export default Home