import React from 'react'
import { LineChart, Line, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, Cell, XAxis, YAxis  } from 'recharts';
import Navbar from "./navbar";
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { BiCategory ,BiNote} from 'react-icons/bi';
import { useState, useEffect, useRef } from "react";
import { Row, Col ,Card} from 'react-bootstrap';
import './App.css';
import axios from "axios";

const Main = () => {
  const [categories, setcategories] = useState([]);
  const [messages, setmessages] = useState([]);
  const [feedbacks, setfeedbacks] = useState([]);


  const getfeedbacks = async (e) => {

    await axios.get("http://localhost:3000/getallfeedbacks").then((response) => {
console.log(response.data)
      setfeedbacks(response.data);
      //  console.log(feedbacks)


    });
  }
  const getmessages = async (e) => {

    await axios.get("http://localhost:3000/getallmessage").then((response) => {

      setmessages(response.data);
      //  console.log(messages)


    });
  }
  const getcategories = async (e) => {

    await axios.get("http://localhost:3000/getallcategories").then((response) => {

      setcategories(response.data);
       console.log(categories)


    });
  }
  useEffect(() => {
    getcategories()
    getmessages()
    getfeedbacks()
  }, [])
  // Transform categories data for the chart
// Extract category names for the chart
const chartData = categories.map((categories) => ({

  "name":categories.category,
  "uv":categories.count,

}));
const data=[{
  "name":"Inheritance",
  "uv":50,



},

{
  "name":"Marriage",
  "uv":40


},

{
  "name":"Corruption",
  "uv":30


},
{
  "name":"Criminal",
  "uv":20


},
{
  "name":"Corruption",
  "uv":30


},{
  "name":"Corruption",
  "uv":30


},{
  "name":"Corruption",
  "uv":40


},{
  "name":"Divorce",
  "uv":10


}
]

  return (
 
    <div className="row " style={{ width: '100%', marginTop:'1%',marginLeft:'1%',  overflow:'auto',height:'100vh' }}>
      <Row className="card-container justify-content-center mt-5">
        <Col md={4} sm={6} xs={12} >
          <Card className="card" style={{ background: '#1D4537', color: 'white', margin:10 }}>
            <Card.Body>
            <h2 className="responsive-heading">Question Asked</h2>
              <p>{messages.length}</p>
              <AiOutlineQuestionCircle className="tainmodel2" size="2rem" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={6} xs={12} >
          <Card className="card"  style={{ background: '#1D4537', color: 'white', margin:10 }}>
            <Card.Body>
              <h2 className="responsive-heading">Current Categories</h2>
              <p>{categories.length}</p>
              <BiCategory className="tainmodel2" size="2rem" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} sm={6} xs={12}>
          <Card className="card"  style={{ background: '#1D4537', color: 'white', margin:10 }}>
            <Card.Body>
              <h2 className="responsive-heading">Feedbacks</h2>
              <p>{feedbacks.length}</p>
              <BiNote className="tainmodel2"  size="2rem" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="blur-background justify-content-center mt-3 mb-3" >
      {/* <Col md={6} sm={12} xs={12} style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',margin: '20px' }}>
          <LineChart width={500} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
          </LineChart>
        </Col> */}
        
        <Col md={6} sm={12} xs={12} style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', margin: '30px' }}>
          <BarChart
            width={600}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis datakey="uv"/>
            <Tooltip />
            <Legend />
            <Bar dataKey="uv" fill="#1D4537"  barSize={40} barGap={15}/>
          </BarChart>
        </Col>  <Row>
        </Row>
      </Row>
    </div>

  )
}

export default Main
