var express = require("express");
var router = express.Router();
var textfile = require('../controller/textfilecontroller')
var QanoonController = require('../controller/QanoonController')
var usercontroller = require('../controller/usercontroller')
var Category = require("../Models/category")
var message=require("../Models/msg")
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
router.delete("/deletemessages",QanoonController.DeleteAllmessages);

router.post("/uploadtext",textfile.Createtext);

router.get('/getallqanoon',QanoonController.Allvolume)


router.post("/createcategory" , QanoonController.Createcategory);
router.delete("/deletecategory/:id" , QanoonController.Deletecategory);
router.get('/getallcategories',QanoonController.Allcategory);
router.put("/updatecategory/:id",QanoonController.Updatecategory);



module.exports = router;
const storage = multer.memoryStorage();
const upload = multer({ storage });
// Route to handle file upload
router.post('/uploadfile', upload.single('file'), textfile.uploadTextFile);


const { spawn } = require('child_process');
const app = express();
router.get('/run-python',  async (req, res) => {
  const inputData = 'Your input data'; // Replace with your actual input data
  const categorydata = await Category.find();
  const messagedata = await message.find()
  const msg =messagedata.map(message =>message.msg); 
  const categoryNames = categorydata.map(category => category.category); // Extract category names
  const combinedData = {
    messages: msg,
    categories: categoryNames
   
  };
  const pythonProcess = spawn('python', ['F:/7th semester/aasaanqanoon/asan-qanoon--main/server/controller/graph.py',JSON.stringify(combinedData)]);
  let outputData = '';

  pythonProcess.stdout.on('data', (data) => {
    outputData += data;
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`Error executing Python script: ${data}`);
  });

  pythonProcess.on('close', async (code) => {
    console.log(`Python script exited with code ${code}`);
    console.log(`Python script output: ${outputData}`);

    try {
      console.log('Raw output data:', outputData); // Add this line to print the raw outputData
      const outputJson = JSON.parse(outputData); // Parse the JSON data
      const results = outputJson; // Assuming your Python script directly outputs the dictionary

      for (const category in results) {
        const count = results[category];
        // Update the count in your MongoDB collection (replace with your actual update logic)
        await Category.updateOne({ category }, { $set: { count } });
      }

      res.json({ message: 'Python script executed', output: results });
    } catch (error) {
      console.error('Error parsing JSON output:', error);
      res.status(500).json({ error: 'Error parsing JSON output' });
    }
  });
});






module.exports=router