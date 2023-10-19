
import React, { useState,useEffect } from "react";

import RichTextEditor from "./editor";
import axios from "axios";
import "./App.css";
import Navbar from "./navbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigate } from 'react-router-dom';

const Updatefileeditor = () => {
    const [value, setValue] = useState("");
    const [title, settitle] = useState("");
    const navigate = useNavigate();
    
    const getValues = async () => {
        const id = await AsyncStorage.getItem('fileid')
        await axios.get("http://localhost:3000/getoneqanoon/" + id).then((data) => {
        
            setValue(data.data.content);

        })
    }
    useEffect(() => {
       getValues()
   getTitle()
    }, [])


    const getTitle = async () => {
        const id = await AsyncStorage.getItem('fileid')
      
        await axios.get("http://localhost:3000/getoneqanoon/" + id).then((data) => {
        
         console.log(data.data.name)
            settitle(data.data.name);

        })
       
    }

    var abc = value
    var n=title

    
    const updatevolume = async () => {
        const id = await AsyncStorage.getItem('fileid')
     console.log(title)
        await axios.put("http://localhost:3000/updateqanoon/"+id, { content: abc ,name:n }).then(() => {
            try {
                alert("Your Data has been saved!");
            } catch (e) {
                alert("Enter some content");
            }
        });
        navigate('/displayfiles');

         // Use the correct screen name defined in your navigation setup
        // const data = documment.querySelector(".golang").innerHTML;
    }
    const getValue = (value) => {
        setValue(value);
      };

      const handleChange = (event) => {
        settitle(event.target.value);
      }
    return (
        <div className="row">
            <Navbar />
            <div>
                <div className="col-lg-12 col-md-6" style={{ margin: "auto", marginTop: "0px" }}>
                    {/* const data = document.querySelector(".jodit-wysiwyg").innerHTML; */}
                    <div class="mb-3">
                        <label for="title" class="form-label" style={{ marginLeft: '96%' }}>
                            عنوان
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            value={title}
                            id="title"
                            aria-describedby="title"
                            onChange={handleChange}
                            dir='rtl'
                        />
                    </div>
                    <RichTextEditor
                        getValue={getValue}
                        initialValue={value}

                    />

                    <br />
                </div>
                <div>{value.content}</div>
              
                <button onClick={updatevolume} style={{ marginBottom: '1%', marginLeft: '50%', width: '10%', borderColor: 'white', borderRadius: 5, backgroundColor: 'white', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)' }}>Update File</button>
            </div>
        </div>
    );
};

export default Updatefileeditor;