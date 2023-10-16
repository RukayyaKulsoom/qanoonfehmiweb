var User= require("../Models/signup")
var getuser = require("../Models/signup");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const CreateUser = async (req, res) => {
    const {fname,lname,email,password,retypepass,contact,role} = req.body;
    const userfound = await User.findOne({ email });
    if (userfound) {
      // Show an alert message
      return res.status(400).json({ error: "User already exists with this email." });
    }
  else{
    const Userdata = await User.create({fname,lname,email,password,retypepass,contact,role })
  if (Userdata) {
    console.log(Userdata);
    res.json(Userdata);
  } else {
      console.log("User Not Created");
      res.json("User Not Created");
  }
  }
   
};


const userLoginController =  async (req, res) => {
 
  const { email, password } = req.body;
  const userfound = await User.findOne({ email,password });
  console.log(userfound)

    if (userfound) {
    
      res.json({ userfound});

    }else {
      res.json("User Not found ");
      console.log("user Not Found");

  }
};


const GetOneuser = async (req, res) => {
    const id = req.params.id;
    const userdata = await getuser.findById(id);
      if (userdata) {
        
      console.log("user Found");
      res.json(userdata);
    } else {
      console.log("user Not Found");
    }
  };
  

  const getallusers= async (req, res) => {
    const userdata = await User.find()
    if (userdata !== []) {
        console.log(userdata)
        res.json(userdata)
    }
    else {
        console.log("No user data")
        res.json("No user data");
        
    }
  }
  
  const Updateuser= async (req, res) => {
    const {  fname, lname, email, contact , password , retypepass, role} = req.body;
    const id =req.params.id
  const Userdata = await User.findById(id);
  if (Userdata) {
    Userdata.fname = fname
    Userdata.lname = lname
    Userdata.email = email
    Userdata.contact = contact
    Userdata.password = password
    Userdata.retypepass = retypepass
    Userdata.role = role

      const updateUser = await Userdata.save()
      res.json(updateUser)
  } else {
      console.log("User Not Updated");
       res.json("User Not Updated");
  }
  };

  const DeleteUser = async (req, res) => {
    const id = req.params.id;
    const ObjectId = require('mongoose').Types.ObjectId;
  
  const result = await User.deleteOne({ _id: new ObjectId(id) });
  
  if (result.deletedCount === 1) {
    
    console.log("The User has been deleted successfully");
  } else {
    console.log("The User was not found or could not be deleted");
  }
  };

module.exports = {
    
    CreateUser,
    GetOneuser,
    userLoginController,
    getallusers,
    DeleteUser,
    Updateuser,
    
};