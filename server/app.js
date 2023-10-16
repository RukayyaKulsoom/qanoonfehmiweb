const mongoose = require('mongoose');
var express = require('express');
const path = require("path");
const app = express();
const bodyParser = require('body-parser')
var router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const secretKey="secretKey";
const pinecone = require('pinecone');
const { OpenAIApi } = require('openai');

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({ origin : [ "http://localhost:3001"]}));

var volumeRouter = require('./routes/volumeroute')
app.use("/", volumeRouter);

mongoose.set("strictQuery", false);
app.use(bodyParser.json())

const mongURI = "mongodb+srv://rukayyakulsoom:74732238@cluster0.r1kewxq.mongodb.net/asaanQanoon?retryWrites=true&w=majority"
mongoose.connect(mongURI,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})

mongoose.connection.on("connected",() =>{
    console.log("Connect Success")
})

mongoose.connection.on("error",(err) =>{
    console.log("error",err)
})


app.listen(3000,() =>{
    console.log("Listening on 3000")
})  

