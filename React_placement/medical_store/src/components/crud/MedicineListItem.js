import axios from "axios";
import { Link } from "react-router-dom";
import React from 'react';
import { useSelector } from "react-redux";
import "./MedicineListItemStyle.css";


function MedicineListItem(props) {
    // const [showModal, setShowModal] = useState(false);
    var user = useSelector(store => store.auth.user);
    function deleteMed() {
        axios.delete('http://127.0.0.1:8000/deleteapi/'+props.med.id+'/',
        {
            headers: 
                {'Authorization': 'Token ' + user.token}
        }
        ).then(response=>{
            // setShowModal(true);
            // alert(response.data.message)
            props.refresh()
        })
    // }
    // function hideModal() {
    //     setShowModal(false);
    // }
    }

    return <div className="card">
    <div className="card-body">
        {props.med.name}
        <button className="btn btn-primary float-right" onClick={deleteMed}>Delete</button>
        <Link to={"/Edit/"+props.med.id} className="btn btn-primary float-right">Edit</Link>
        <Link to={"/View/"+props.med.id} className="btn btn-info float-right">View</Link>
    </div>
</div>
}
  
export default MedicineListItem;