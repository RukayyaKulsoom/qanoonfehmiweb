import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BarChart, Bar, Cell, XAxis, YAxis } from "recharts";
import Navbar from "./navbar";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BiCategory, BiNote } from "react-icons/bi";
import { useState, useEffect, useRef } from "react";

import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "./App.css";
import axios from "axios";

const Main = () => {
  const [categories, setcategories] = useState([]);
  const [messages, setmessages] = useState([]);
  const [feedbacks, setfeedbacks] = useState([]);

  const getfeedbacks = async (e) => {
    await axios
      .get("http://localhost:3000/getallfeedbacks")
      .then((response) => {
        setfeedbacks(response.data);
        //  console.log(feedbacks)
      });
  };

  const getgraphcount = async (e) => {
    console.log("abc");
    await axios.get("http://localhost:3000/run-python").then((response) => {
      console.log(response.data);
    });
  };

  const getmessages = async (e) => {
    await axios.get("http://localhost:3000/getallmessage").then((response) => {
      setmessages(response.data);
      //  console.log(messages)
    });
  };
  const getcategories = async (e) => {
    await axios
      .get("http://localhost:3000/getallcategories")
      .then((response) => {
        setcategories(response.data);
      });
  };
  useEffect(() => {
    getcategories();
    getmessages();
    getfeedbacks();
  }, []);
  // Transform categories data for the chart
  // Extract category names for the chart
  const chartData = categories.map((categories) => ({
    name: categories.category,
    uv: categories.count,
  }));

  return (
    <div
      className="row "
      style={{
        width: "100%",
        marginLeft: "1%",
        overflow: "auto",
        height: "100vh",
      }}
    >
      <Row className="card-container justify-content-center mt-4">
        <Col md={4} sm={6} xs={12}>
          <div className="thecard">
            <div className="thefront">
              <h1>Question Asked</h1>
              <AiOutlineQuestionCircle className="tainmodel2" size="3rem" />
              <p>The Amount Of Questions Asked By User Related To Law.</p>
            </div>
            <div className="theback">
              <h1>{messages.length}</h1>
            </div>
          </div>
        </Col>
        <Col md={4} sm={6} xs={12}>
          <div className="thecard">
            <div className="thefront">
              <h1>Current Categories</h1>
              <BiCategory className="tainmodel2" size="3rem" />
              <p>The Amount Of Categories Added by Admins.</p>
            </div>
            <div className="theback">
              <h1>{categories.length}</h1>
            </div>
          </div>
        </Col>
        <Col md={4} sm={6} xs={12}>
          <div className="thecard">
            <div className="thefront">
              <h1>Feedbacks</h1>
              <BiNote className="tainmodel2" size="3rem" />
              <p>The Number of Feedbacks Given By Users.</p>
            </div>
            <div className="theback">
              <h1>{feedbacks.length}</h1>
            </div>
          </div>
        </Col>
      </Row>
      <Row
        className="blur-background justify-content-center"
        style={{ marginTop: "-25px" }}
      >
        {/* <Col md={6} sm={12} xs={12} style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',margin: '20px' }}>
          <LineChart width={500} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
          </LineChart>
        </Col> */}

        <Col
          md={7}
          sm={12}
          xs={12}
          style={{
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
            margin: "30px",
            height: "370px",
          }}
        >
          <Row className="justify-content-end">
            <Button
              style={{
                maxWidth: "170px",
                width: "50%",
                backgroundColor: "#1B4235",
                margin: "1%",
              }}
              className="btn btn-dark"
              onClick={getgraphcount}
            >
              Refresh Graph
            </Button>{" "}
          </Row>
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
            <YAxis datakey="uv" />
            <Tooltip />
            <Legend />
            <Bar dataKey="uv" fill="#1D4537" barSize={40} barGap={15} />
          </BarChart>
        </Col>
      </Row>
    </div>
  );
};

export default Main;
