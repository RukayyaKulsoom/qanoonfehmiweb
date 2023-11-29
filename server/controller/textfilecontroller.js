const mongoose = require('mongoose');
const TextFile = require('../Models/textfile'); // Import the text file model
const { spawn } = require('child_process');
const fs = require('fs');

const uploadTextFile = async (req, res) => {
  try {
    const { buffer } = req.file;
    const textContent = buffer.toString();

    // Create a new text file entry in the database
    const newTextFile = new TextFile({ content: textContent });
    await newTextFile.save();
console.log('File content:', textContent);
    // Optionally, you can save the file on the server
    const fileName = 'uploaded_file.txt';
    fs.writeFileSync(fileName, textContent);
    // Run Python script with the file content
    const pythonProcess = spawn('python3', ['/Users/ramisha/Desktop/fyp2/qanoonfehmiweb/server/controller/training.py', textContent]);

    let outputData = '';

    pythonProcess.stdout.on('data', (data) => {
      outputData += data;
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Error executing Python script: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      console.log(`Python script exited with code ${code}`);
      console.log(`Python script output: ${outputData}`);
      // Optionally, you can handle the output as needed

      res.status(201).json({ message: 'Text file uploaded, content stored, and Python script executed.', output: outputData, code: code });
    });



  } catch (error) {
    console.error('Error uploading text file:', error);
    res.status(500).json({ error: 'Error uploading text file.' });
  }
};
const Createtext = async (req, res) => {
  try {
    const { content } = req.body;

    const volumedata = await TextFile.create({ content });
    const fileName = 'uploaded_file.txt';

    // Assuming TextFile model has a 'content' property
    fs.writeFileSync(fileName, volumedata.content);

    const pythonProcess = spawn('python3', ['/Users/ramisha/Desktop/fyp2/qanoonfehmiweb/server/controller/training.py']);

    let outputData = '';

    pythonProcess.stdout.on('data', (data) => {
      outputData += data;
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Error executing Python script: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      console.log(`Python script exited with code ${code}`);
      console.log(`Python script output: ${outputData}`);
      // Optionally, you can handle the output as needed

      res.status(201).json({
        message: 'Text file uploaded, content stored, and Python script executed.',
        output: outputData,
        code: code,
        volumedata: volumedata, // Include volumedata in the response if needed
      });
    });
  } catch (error) {
    console.error('Error uploading text file:', error);
    res.status(500).json({ error: 'Error uploading text file.' });
  }
};




module.exports = {
  uploadTextFile,
  Createtext
};
