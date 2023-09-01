import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MedicineListItem from "./MedicineListItem";
import React from 'react';
import { useSelector } from "react-redux";
import checkAuth from "../auth/checkAuth";
import Navbar from "../Navbar";



function ListMed() {
    const user = useSelector(store => store.auth.user);
    console.log(user);
    var [meds, setMeds]=useState([]);
    // eslint-disable-next-line no-unused-vars
   
   
    function fetchMeds(){
        if(user){
        axios.get('http://127.0.0.1:8000/get/',
        {
            headers: 
                {'Authorization': 'Token ' + user.token}
    }
    ).then(response=>{
            setMeds(response.data)
        })
    }
    }
    useEffect(()=>{
        fetchMeds()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (<div>
        <Navbar></Navbar>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h5 className="text-center my-4">Medicine List</h5>
                </div>
            </div>
            <div className="row">
                <div className="col-8 offset-2">
                    <Link to ="/Add" className="btn btn-info mb-2">Add Medicine</Link>
                    <Link to="/Search " className="btn btn-info mb-2 ml-4">Search Medicine</Link> 
                    {meds.map(med =><MedicineListItem key={med.id} med={med} refresh={fetchMeds}/>)}
                </div>
            </div>
        </div>
    </div>)
}

export default checkAuth(ListMed);
