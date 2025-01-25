import React, { useState, useEffect } from "react";
import "../css/contact.css"; 
import axios from "axios"

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('')
    const [message, setMessage] = useState('');
    const [error, setError] = useState("")
    const [selectData, setSelectData] = useState([])
    const [selectValue, setSelectValue] = useState('')

    useEffect(()=>{
        let processing = true //processing it used to ensure it doesnt run twice
        axiosFetchData(processing)
        return ()=>{
            processing=false
        }
        },[]
    )

    // const fetchData = async(processing) => {
    //     const option = {
    //         method: 'GET',
    //         headers: {'Content-type': 'application/json'},
    //         body: JSON.stringify(
    //             {
    //                 email: email,
    //                 message: message,
    //             }
    //         )
    // }
    //     await fetch('https://jsonplaceholder.typicode.com/users',option)
    //     .then(res=>res.json())
    //     .then(data=>{
    //         if(processing)
    //             setSelectData(data)}
    //             )
    //     .catch(err=>console.log(err))
    // }

    const axiosFetchData = async(processing) => {
        //axios can also take in options 
        await axios.get('http://localhost:3000/users')
        .then(res=>{ //auto converts to JSON
            if(processing)
                setSelectData(res.data)}
                )
        .catch(err=>console.log(err))
    }

    const axiosPostData = async() =>{
        const postData = {
            name: name,
            email: email,
            website: selectValue,
            message: message,
        }

        await axios.post('http://localhost:3000/contact', postData)
        .then(res => setError(<p className = "success">{res.data}</p>))
    }

    const SelectDropDown = () =>{
        return (
            <select value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
                {
                    selectData?.map( (item)=>
                        <option value={item.website} key={item.website}>{item.website}</option>

                    )
                }
            </select>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can perform form submission logic, like sending data to a server
        console.log("Form submitted:", { name, email,website, message });

        if(!message){
            setError(<p className='required'>Message is empty. Please type a message</p>)
        }
        else{
            setError('')
        }
        //process
        setError('')
        axiosPostData()

        
        
    };

    return (
        <div className="contact-container">
            <div className="contact-form">
                <h1>Contact Us</h1>
                <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

                    <label>How did you hear about us?</label>
                    <SelectDropDown/>

                    <label>Email</label>
                    <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label>Message</label>
                    <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} />
                    
                    {error}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
