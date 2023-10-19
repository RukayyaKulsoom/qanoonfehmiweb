var volume = require("../Models/data")
var message=require("../Models/msg")
var feedback=require("../Models/feedback")
var Category = require("../Models/category")

const Allvolume = async (req, res) => {
    const volumedata = await volume.find()
    

    if (volumedata.length !== 0) {
        console.log(volumedata)
        res.json(volumedata)
    }
    else {
        console.log("No volume data")
        res.json("No volume data");
    }
}
const Allmessages= async (req, res) => {
  const messagedata = await message.find()
  if (messagedata.length !== 0) {
      console.log(messagedata)
      res.json(messagedata)
  }
  else {
      console.log("No message data")
      res.json("No message data");
      
  }
}


const Allfeedback= async (req, res) => {
  const Feedbackdata = await feedback.find()
  if (Feedbackdata.length !== 0) {
      console.log(Feedbackdata)
      res.json(Feedbackdata)
  }
  else {
      console.log("No Feedback data")
      res.json("No Feedback data");
      
  }
}

const Createvolume = async (req, res) => {
    const { name, content} = req.body;
    
    const volumedata = await volume.create({ name, content })

  if (volumedata) {
    console.log(volumedata);
    res.json(volumedata);
  } else {
      console.log("volume Not Created");
      res.json("volume Not Created");
  }
};


const Createfeedback = async (req, res) => {
  const { email,feedback} = req.body;
  
  const feedbackdata = await feedback.create({ email, feedback })

if (feedbackdata) {
  console.log(feedbackdata);
  res.json(feedbackdata);
} else {
    console.log("feedback Not Created");
    res.json("feedback Not Created");
}
};
const Createmessage= async (req, res) => {
  const { msg} = req.body;
  
  const messagedata = await message.create({ msg })

if (messagedata) {
  console.log(messagedata);
  res.json(messagedata);
} else {
    console.log("message Not Created");
    res.json("message Not Created");
}
};

const GetOnevolume = async (req, res) => {
  const id = req.params.id;
  const volumedata = await volume.findById(id);
    if (volumedata) {
      
    console.log("volume Found");
    res.json(volumedata);
  } else {
    console.log("volume Not Found");
  }
};

const Updatevolume = async (req, res) => {
    const {  name,content } = req.body;
    const id =req.params.id
  const volumedata = await volume.findById(id);
  if (volumedata) {
    volumedata.name = name
      volumedata.content = content
    
      const updatevolume = await volumedata.save()
      res.json(updatevolume)
  } else {
      console.log("volume Not Updated");
       res.json("volume Not Updated");
  }
};


const Updatemsg= async (req, res) => {
  const {  msg } = req.body;
  const id =req.params.id
const messagedata = await message.findById(id);
if (messagedata) {
  messagedata.msg = msg
  
  
    const updatemessage = await messagedata.save()
    res.json(updatemessage)
} else {
    console.log("message Not Updated");
     res.json("message Not Updated");
}
};

const Deletevolume = async (req, res) => {
  const id = req.params.id;
  const ObjectId = require('mongoose').Types.ObjectId;

const result = await volume.deleteOne({ _id: new ObjectId(id) });

if (result.deletedCount === 1) {
  console.log("The object has been deleted successfully");
} else {
  console.log("The object was not found or could not be deleted");
}
};
const Deletefeedback = async (req, res) => {
  
  const id = req.params.id;
  const ObjectId = require('mongoose').Types.ObjectId;

const result = await feedback.deleteOne({ _id: new ObjectId(id) });

if (result.deletedCount === 1) {
  
  console.log("The feedback has been deleted successfully");
} else {
  console.log("The feedback was not found or could not be deleted");
}
};

const DeleteAllFeedbacks = async (req, res) => {
  try {
    const deleteResult = await feedback.deleteMany();
    console.log(`${deleteResult.deletedCount} feedbacks deleted successfully`);
    res.json(`${deleteResult.deletedCount} feedbacks deleted successfully`);
  } catch (error) {
    console.error("Error deleting feedbacks:", error);
    res.status(500).json("Error deleting feedbacks");
  }
};

const DeleteAllmessages = async (req, res) => {
  try {
    const deleteResult = await message.deleteMany();
    console.log(`${deleteResult.deletedCount} messages deleted successfully`);
    res.json(`${deleteResult.deletedCount} messages deleted successfully`);
  } catch (error) {
    console.error("Error deleting messages:", error);
    res.status(500).json("Error deleting messages");
  }
};


const Deletemessage = async (req, res) => {
  const id = req.params.id;
  const ObjectId = require('mongoose').Types.ObjectId;

const result = await message.deleteOne({ _id: new ObjectId(id) });

if (result.deletedCount === 1) {
  
  console.log("The message has been deleted successfully");
} else {
  console.log("The message was not found or could not be deleted");
}
};
const Createcategory = async (req, res) => {
  const {category} = req.body;
  
  const cdata = await Category.create({ category })

if (cdata) {
  console.log(cdata);
  res.json(cdata);
} else {
    console.log("c Not Created");
    res.json("c Not Created");
}
};


const Deletecategory = async (req, res) => {
  const id = req.params.id;
  const ObjectId = require('mongoose').Types.ObjectId;

const result = await Category.deleteOne({ _id: new ObjectId(id) });

if (result.deletedCount === 1) {
  
  console.log("The category has been deleted successfully");
} else {
  console.log("The category was not found or could not be deleted");
}
};



const Allcategory= async (req, res) => {
  const categorydata = await Category.find()
  if (categorydata.length !== 0) {
    console.log(categorydata)
      res.json(categorydata)
  }
  else {
      console.log("No category data")
      res.json("No category data");
  }
}


const Updatecategory= async (req, res) => {
  const {  category} = req.body;
  const id =req.params.id
const categorydata = await Category.findById(id);
if (categorydata) {
  categorydata.category = category
    const updatecategory = await categorydata.save()
    res.json(updatecategory)
} else {
    console.log("category Not Updated");
     res.json("category Not Updated");
}
}; 
module.exports = {
  Allvolume,
  Createvolume,
  GetOnevolume,
  Updatevolume,
  Deletevolume,
  Createmessage,
  Allmessages,
  Createfeedback,
  Deletefeedback,
  Deletemessage,
  Updatemsg,
  Allfeedback,
  DeleteAllFeedbacks,
  Createcategory,
  Deletecategory,
  Allcategory,
  Updatecategory,
  DeleteAllmessages
};