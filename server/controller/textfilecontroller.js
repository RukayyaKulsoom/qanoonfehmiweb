const mongoose = require('mongoose');
const TextFile = require('../Models/textfile'); // Import the text file model

const uploadTextFile = async (req, res) => {
  try {
    const { buffer } = req.file;
    const textContent = buffer.toString();

    // Create a new text file entry in the database
    const newTextFile = new TextFile({ content: textContent });
    await newTextFile.save();

    res.status(201).json({ message: 'Text file uploaded and content stored.' });
  } catch (error) {
    console.error('Error uploading text file:', error);
    res.status(500).json({ error: 'Error uploading text file.' });
  }
};


const Createtext = async (req, res) => {
  const {  content} = req.body;
  
  const volumedata = await TextFile.create({  content })

if (volumedata) {
  console.log(volumedata);
  res.json(volumedata);
} else {
    console.log("volume Not Created");
    res.json("volume Not Created");
}
};

module.exports = {
  uploadTextFile,
  Createtext
};
