import axios from "axios";
import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import React from 'react';
import { useSelector } from "react-redux";
import checkAuth from "../auth/checkAuth";
import Navbar from "../Navbar";





function EditMedicine(){

    const {medId} = useParams();
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [expiry_date, setExpiry_Date] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');
    const [remaining_stock,setRemaining_Stock] = useState('');
    var user = useSelector((store)=>store.auth.user);
    var navigate = useNavigate();


    useEffect(()=>{
        if(user){
        axios.get('http://127.0.0.1:8000/view/'+medId,{

                 headers:{Authorization:"Token " + user.token},
        })
        .then((response)=>{
            setName(response.data.name);
            setCompany(response.data.company);
            setExpiry_Date(response.data.expiry_date);
            setDescription(response.data.description);
            setPrice(response.data.price);
            setRemaining_Stock(response.data.remaining_stock)
        });
     
    }  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[medId]);

    function updateMedicine(){
        
        axios.put('http://127.0.0.1:8000/updateapi/'+medId+'/',
        {
            name: name,
            company: company,
            expiry_date:expiry_date,
            description:description,
            price:price,
            remaining_stock:remaining_stock,
    },
      {
        headers:{Authorization:"Token " + user.token },
      }
    )
    
    .then((response)=>{
            navigate('/Home');
     
        });
    
    }

    return <div>
<Navbar></Navbar>
<div className="container">
            <div className="row">
                <div className="col-8 offset-2">
                    <h1 className="text-center">Edit Medicine</h1>
                    <div className="form-group">
                        <label>Name:</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        value={name} 
                        onChange={e=>{setName(e.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Company:</label>
                        <input
                        type="text"
                        className="form-control" 
                        value={company} 
                        onChange={e=>{setCompany(e.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                    <label>Expiry Date:</label>
                        <textarea
                        
                        className="form-control"
                        value={expiry_date}
                        onChange={e => { setExpiry_Date(e.target.value) }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <input
                        type="text"
                        className="form-control" 
                        value={description} 
                        onChange={e=>{setDescription(e.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                    <label>Price:</label>
                        <textarea
                        
                        className="form-control"
                        value={price}
                        onChange={e => { setPrice(e.target.value) }}
                        />
                    </div>
                    <div className="form-group">
                    <label>Remaining Stock:</label>
                        <textarea
                        
                        className="form-control"
                        value={remaining_stock}
                        onChange={e => { setRemaining_Stock(e.target.value) }}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary float-right" onClick={updateMedicine}>Submit</button>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
}

export default checkAuth(EditMedicine);

    
    











