
import React, { useState } from "react";

import RichTextEditor from "./editor";
import axios from "axios";
import "./App.css";
import Navbar from "./navbar";
import jsPDF from "jspdf";
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const Textedit = () => {
  const [value, setValue] = useState("");
  const [title, settitle] = useState("");

  // const getValues = async() => {
   
  //   await axios.get("http://localhost:3000/getoneqanoon/63f21c3c9d267e645f88b296").then((data) => { 

  //      setValue(data.data);
   
  //  })

   
  // } 

  const getpdf = () => {
//     var doc = new jsPDF();

// // Set the language to 'ur' (Urdu)
// doc.setLanguage('ur');

// // Set the font size to 4
// doc.setFontSize(4);

// // Get the HTML content that you want to convert to PDF
// var content = value.content;

// // Set the direction of the HTML content to RTL
// content = '<div dir="rtl">' + content + '</div>';

// // Use the html2pdf plugin to generate the PDF content from the HTML
// doc.html(content, {
//   callback: function(pdf) {
//     // Generate the PDF binary data
//     var pdfData = pdf.output('blob');

//     // Create a URL for the PDF data
//     var url = URL.createObjectURL(pdfData);

//     // Create a link element to trigger the download
//     var link = document.createElement('a');
//     link.href = url;
//     link.download = 'document.pdf';

//     // Click the link to trigger the download
//     link.click();
//   }
// });

    // var blob= new Blob([doc.output('blob')],{type:'application/pdf'});
    // var bloburl= URL.createObjectURL(blob);
    // getpdf("#pdf_preview").attr('src', bloburl);
    // var doc = new jsPDF();
    // doc.setLanguage("ur");
    // doc.setFontSize(4)
    // // Generate the PDF content from the HTML
    // doc.html(value.content, {
    //   callback: function() {
    //     // Generate the PDF binary data
    //     var pdfData = doc.output('blob');
    
    //     // Create a URL for the PDF data
    //     var url = URL.createObjectURL(pdfData);
    
    //     // Create a link element to trigger the download
    //     var link = document.createElement('a');
    //     link.href = url;
    //     link.download = 'document.pdf';
    
    //     // Click the link to trigger the download
    //     link.click();
    //   }
    // });

// set text direction to RTL

  //   const element = value;
    
  //   const options = {
  //     direction: 'rtl',
  //     filename: 'my-document.pdf',
  //     margin:1,
  //     image: { type: 'jpeg', quality: 0.98 },
  //     html2canvas: { dpi: 192, letterRendering: true,scale: 2 },
  //     jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  //     format: [210, 297] // A4 size
  //   };
  
  //   html2pdf().set(options).from(element).save();
  //   // Convert HTML to PDF

  // 
}

  const onButtonClick = () => {
    const htmlContent = value.content;

    const blob = new Blob([htmlContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.docx';
    
    link.click();

// Get the Jodit Editor instance
// var editor = Jodit.instances[0];

// // Get the text content from the editor
// var content = editor.getEditorValue();

// // Create a new Docx document
// var docx = new Docx();

// // Add a new paragraph to the document with the editor content
// docx.addParagraph(content);

// // Generate the Word file binary data
// var fileData = docx.generate();

// // Create a blob from the binary data
// var blob = new Blob([fileData], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

// // Create a URL for the blob
// var url = URL.createObjectURL(blob);

// // Create a link element to trigger the download
// var link = document.createElement('a');
// link.href = url;
// link.download = 'document.docx';

// // Click the link to trigger the download
// link.click();

  //  var doc = new jsPDF()
//    // Register the font
// var fontPath = 'E:\aasaanqanoonWeb\aasaanqanoon\Alvi Nastaleeq Regular.ttf';
// var fontName = 'AlviNastaleeqRegular';

// doc.addFileToVFS(fontPath, fontName);
// doc.addFont(fontName, 'AlviNastaleeqRegular', 'normal');

// // Use the font in the document
// doc.setFont('AlviNastaleeqRegular');
// doc.setFontSize(12);
// doc.html(value.content);

// // // Download the document
// // doc.save('myPDF.pdf');

}
const getValue = (value) => {
  setValue(value);
};
    var abc =value
  const createvolume = async (e) => {
    console.log(title)
   await axios.post("http://localhost:3000/createqanoon",{ name: title, content: abc}).then((response) => {  
   try{
    alert("Your Data has been saved!");
    }catch(e){
      alert("Enter some content");
    }
      
    
    });

   
  
    // const data = documment.querySelector(".golang").innerHTML;
}
  return (
<div  > <Navbar />
<div>
  
      <div className="col-lg-12 col-md-6" style={{ margin: "auto", marginTop: "0px" }}>
      
        {/* const data = document.querySelector(".jodit-wysiwyg").innerHTML; */}
        <div class="mb-3">
     

     
<Container>
  <Row>
    <Col md={12} className="mb-3 mt-3">
      <Form.Control
        type="text"
        value={title}
        id="title"
        onChange={(e) => settitle(e.target.value)}
        dir="rtl"
        placeholder="عنوان"
      />
    </Col>
  </Row>
  <Row>
    <Col md={12}>
      <RichTextEditor getValue={getValue} initialValue="" />
    </Col>
  </Row>
</Container>
        <br />
</div></div>

<div className="text-center mb-5" >
                    <Button style={{ maxWidth: '400px', width: '50%', backgroundColor:'#1B4235' }}  className="btn btn-dark" onClick={createvolume}>
                     Save File
                    </Button>
                  </div>     </div>
    </div>
  );
};

export default Textedit;