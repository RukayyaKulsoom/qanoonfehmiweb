import React, { useRef , useState} from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import { Jodit } from "jodit-react";

const config = {
  direction: "rtl", // Set direction property to "rtl"
  language: "fa", // Set language property to "fa" (Persian/Farsi)
  toolbar: true, 
  height:'700px',
  readonly: false,
  placeholder:'یہاں لکھیں۔',
  i18n: {
      ur: {
	'Type something': 'اختتام',
 
      }
  }

};
const RichTextEditor = ({ initialValue, getValue }) => {
  const editor = useRef(null);  
  // console.log(editor)
 

   const getValues = () => {
    console.log(editor.value)
    var text = editor.value; 
    alert(text); 
  };
    

  return (
    <div>
       {/* <button onClick={getValues}>Click me!</button> */}
    <JoditEditor
      ref={editor}
      value={initialValue}
      config={config}
      tabIndex={1}
      //   onBlur={(newContent) => getValue(newContent)}
      onChange={(newContent) => getValue(newContent)}
     
    />
    </div>
  );
};
export default RichTextEditor;