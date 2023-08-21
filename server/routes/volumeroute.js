var express = require("express");
var router = express.Router();
var textfile = require('../controller/textfilecontroller')
var QanoonController = require('../controller/QanoonController')
var usercontroller = require('../controller/usercontroller')
var otp =  require('../controller/otp')
const multer = require('multer');


router.get('/getallusers',usercontroller.getallusers)
router.put("/updateuser/:id",usercontroller.Updateuser);
router.delete("/deleteuser/:id",usercontroller.DeleteUser);
router.get("/getoneuser/:id",usercontroller.GetOneuser);
router.post("/createuser",usercontroller.CreateUser);
router.post("/loginuser",usercontroller.userLoginController);

router.post('/forgotpassword', otp.forgotPassword);
router.post('/resetpassword/:resettoken', otp.resetPassword);

router.get('/getallfeedbacks',QanoonController.Allfeedback);
router.post("/createfeedback",QanoonController.Createfeedback);
router.delete("/deletefeedback/:id",QanoonController.Deletefeedback);
router.delete("/deletefeedbacks",QanoonController.DeleteAllFeedbacks);

router.post("/createqanoon",QanoonController.Createvolume);
router.get("/getoneqanoon/:id",QanoonController.GetOnevolume);
router.put("/updateqanoon/:id",QanoonController.Updatevolume);
router.put("/updatemessage/:id",QanoonController.Updatemsg);
router.delete("/deleteqanoon/:id",QanoonController.Deletevolume);
router.post("/createmessage",QanoonController.Createmessage);
router.get('/getallmessage',QanoonController.Allmessages);

router.delete("/deletemessage/:id",QanoonController.Deletemessage);
router.get('/getallqanoon',QanoonController.Allvolume)

router.post("/createcategory" , QanoonController.Createcategory);
router.delete("/deletecategory/:id" , QanoonController.Deletecategory);
router.get('/getallcategories',QanoonController.Allcategory);
router.put("/updatecategory/:id",QanoonController.Updatecategory);


const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to handle file upload
router.post('/uploadfile', upload.single('file'), textfile.uploadTextFile);

module.exports=router