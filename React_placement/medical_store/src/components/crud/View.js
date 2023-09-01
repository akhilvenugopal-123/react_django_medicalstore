import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import React from 'react';
import { useSelector } from "react-redux";
import checkAuth from "../auth/checkAuth";
import Navbar from "../Navbar";

function ViewMedicine() {
    const {medId} = useParams();
    const user = useSelector(store => store.auth.user);
    const [med,setMed] = useState({name:'',company:'',expiry_date:''});
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/view/'+medId,{
            headers:{Authorization:"Token " + user.token},
  })
        .then((response)=>{
            setMed(response.data)
        })
    },[medId, user.token]);



return <div>
    <Navbar></Navbar>
<div className="container">
<div className="row">
    <div className="col-12">
        <div className="card">
            <div className="card-header"><h3>Name: {med.name}</h3></div>
            <div className="card-body" style={{  textAlign: "center" }}>Company: {med.company}</div>
            <div  className="card-body"   style={{  textAlign: "center"}}>Expiry :{med.expiry_date}</div>
        </div>
    </div>
</div>
</div>
</div>

}

export default checkAuth(ViewMedicine);