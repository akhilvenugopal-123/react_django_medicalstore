import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import { useSelector } from "react-redux";
import checkAuth from "../auth/checkAuth";
import Navbar from "../Navbar";


function AddMed() {
    const user = useSelector(store => store.auth.user);
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry_date, setExpiry_Date] = useState('');
    const [ description,setDescription] = useState('');
    const [price,setPrice] = useState('');
    const [remaining_stock,setRemaining_Stock] = useState('');
    var navigate = useNavigate()
    const head ={
        headers: 
          {'Authorization': 'Token ' + user.token}
   }
    const body ={
      name: name,
      company: company,
      expiry_date:expiry_date,
      description:description,
      price:price,
      remaining_stock:remaining_stock,
   }
    function addMed() {
        if(user){
        axios.post('http://127.0.0.1:8000/createapi/',body,head)
             .then(response=>{
                navigate('/Home')
            })
            .catch(error => {
                console.error("Axios Error:", error);
            });
        }   
    }
    return (<div>
        <Navbar></Navbar>
        <div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1 className="text-center">Add Medicine</h1>
                    <div className="form-group">
                        <label>Name:</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        value={name} 
                        onChange={(event)=>{setName(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Company:</label>
                        <input
                        type="text" 
                        className="form-control" 
                        value={company} 
                        onChange={(event)=>{setCompany(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                            <label >Expiry Date:</label>
                            <textarea
                                className="form-control"
                                placeholder="2023-05-01"
                                value={expiry_date}
                                onChange={(event) => {setExpiry_Date(event.target.value) }}
                            />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        value={description} 
                        onChange={(event)=>{setDescription(event.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                            <label >Price:</label>
                            <textarea
                                className="form-control"
                                placeholder="10"
                                value={price}
                                onChange={(event) => {setPrice(event.target.value) }}
                            />
                    </div>
                    <div className="form-group">
                            <label >Remaining Stock:</label>
                            <textarea
                                className="form-control"
                                placeholder="10"
                                value={remaining_stock}
                                onChange={(event) => {setRemaining_Stock(event.target.value) }}
                            />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary float-right" onClick={addMed}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default checkAuth(AddMed);