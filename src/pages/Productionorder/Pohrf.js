import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navigation/Navbar";
// import { SidebarData } from "../../components/SidebarData";
// import Navbar from "../../components/Navbar";

const Pohrf = () => {
  const [id, setId] = useState(0);
  const [hrf1,setHrf1]= useState("");
  const [hrf2,setHrf2]= useState("");
  const [hrf3,setHrf3]= useState("");
  const [hrf4,setHrf4]= useState("");
  const [hrf5,setHrf5]= useState("");
  const [ process_order_number, setPono] = useState("");
  const [manufacturing_location, setBno] = useState("");
  const [batch_number,setLocation] = useState("");
  const [production_date,setProduction_date] = useState("");

  // const [produced ,setProduced ] = useState("");
  const [created_by, setCreatedby] = useState("");
  const [status, setStatus] = useState("");
  ///   For navigate function
  const navigate = useNavigate();

  ////    for receiving the parameters from URL
  const { operation } = useParams();
  var username = window.localStorage.getItem('username')
  var password = window.localStorage.getItem('password')
  var currentUserrole = window.localStorage.getItem('userrole')
  ////  Fetch data from local storage
  useEffect(() => {
    if(operation === 'edit') {
      setId(localStorage.getItem("id"));
      setPono(localStorage.getItem(" process_order_number"));
      setBno(localStorage.getItem("manufacturing_location"));
      setLocation(localStorage.getItem("imn"));
      setProduction_date(localStorage.getItem("production_date"));

      // setProduced(localStorage.getItem("produced"));
      setCreatedby(localStorage.getItem("created_by"));
      setStatus(localStorage.getItem("status"))
    }
  }, []);

  if(operation === 'new') {
    var headwidget=<h3>HRF CREATE</h3>
    var hrf1Widget =           
      <select class="form-select" aria-label="Default select example" onChange={(e) => setHrf1(e.target.value)}>
        <option value="admin">Select</option>
      <option value="admin">AT-PZN</option>
      <option value="operator">BE-ABP Code</option>
      <option value="staff">BR Anvisa Registration Number</option>
      <option value="staff">CA-DIN</option>
      <option value="staff">CH-Swissmedic</option>
      <option value="staff">CN-Subtype Code</option>
      <option value="staff">DE-PPN</option>
      <option value="staff">DE-PZN</option>
      <option value="staff">Dosage</option>
      <option value="staff">Finished good code</option>
      <option value="staff">Form type</option>
      <option value="staff">Generic Name</option>
      </select> 

var headwidget=<h3>HRF CREATE</h3>
var hrf2Widget =           
  <select class="form-select" aria-label="Default select example" onChange={(e) => setHrf2(e.target.value)}>
    <option value="admin">Select</option>
  <option value="admin">AT-PZN</option>
  <option value="operator">BE-ABP Code</option>
  <option value="staff">BR Anvisa Registration Number</option>
  <option value="staff">CA-DIN</option>
  <option value="staff">CH-Swissmedic</option>
  <option value="staff">CN-Subtype Code</option>
  <option value="staff">DE-PPN</option>
  <option value="staff">DE-PZN</option>
  <option value="staff">Dosage</option>
  <option value="staff">Finished good code</option>
  <option value="staff">Form type</option>
  <option value="staff">Generic Name</option>
  </select>
  
  var headwidget=<h3>HRF CREATE</h3>
var hrf3Widget =           
  <select class="form-select" aria-label="Default select example" onChange={(e) => setHrf3(e.target.value)}>
    <option value="admin">Select</option>
  <option value="admin">AT-PZN</option>
  <option value="operator">BE-ABP Code</option>
  <option value="staff">BR Anvisa Registration Number</option>
  <option value="staff">CA-DIN</option>
  <option value="staff">CH-Swissmedic</option>
  <option value="staff">CN-Subtype Code</option>
  <option value="staff">DE-PPN</option>
  <option value="staff">DE-PZN</option>
  <option value="staff">Dosage</option>
  <option value="staff">Finished good code</option>
  <option value="staff">Form type</option>
  <option value="staff">Generic Name</option>
  </select>

var hrf4Widget =           
<select class="form-select" aria-label="Default select example" onChange={(e) => setHrf4(e.target.value)}>
  <option value="admin">Select</option>
<option value="admin">AT-PZN</option>
<option value="operator">BE-ABP Code</option>
<option value="staff">BR Anvisa Registration Number</option>
<option value="staff">CA-DIN</option>
<option value="staff">CH-Swissmedic</option>
<option value="staff">CN-Subtype Code</option>
<option value="staff">DE-PPN</option>
<option value="staff">DE-PZN</option>
<option value="staff">Dosage</option>
<option value="staff">Finished good code</option>
<option value="staff">Form type</option>
<option value="staff">Generic Name</option>
</select>

var headwidget=<h3>HRF CREATE</h3>
    var hrf5Widget =           
      <select class="form-select" aria-label="Default select example" onChange={(e) => setHrf5(e.target.value)}>
        <option value="admin">Select</option>
      <option value="admin">AT-PZN</option>
      <option value="operator">BE-ABP Code</option>
      <option value="staff">BR Anvisa Registration Number</option>
      <option value="staff">CA-DIN</option>
      <option value="staff">CH-Swissmedic</option>
      <option value="staff">CN-Subtype Code</option>
      <option value="staff">DE-PPN</option>
      <option value="staff">DE-PZN</option>
      <option value="staff">Dosage</option>
      <option value="staff">Finished good code</option>
      <option value="staff">Form type</option>
      <option value="staff">Generic Name</option>
      </select> 

    var bnoFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        onChange={(e) => setBno(e.target.value)}
      /> 
      var locationFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        onChange={(e) => setLocation(e.target.value)}
      /> 
      var production_dateFieldWidget = <input
      type="text"
      className="form-control form-control-sm"
      onChange={(e) => setProduction_date(e.target.value)}
    /> 

//   var producedFieldWidget = <input
//   type="text"
//   className="form-control form-control-sm"
//   onChange={(e) => setProduced(e.target.value)}
// /> 

    var createdbyFieldWidget = <input
          type="text"
          className="form-control"
          aria-describedby="emailHelp"
          onChange={(e) => setCreatedby(e.target.value)}
        />
        var statusWidget =           
        <select class="form-select" aria-label="Default select example" onChange={(e) => setStatus(e.target.value)}>
          <option value="admin">Inporoduction</option>
          <option value="operator">Paused</option>
          <option value="staff">Running</option>
        </select>
      
  }
  else if(operation === 'edit') {
    var headwidget=<h3>Update</h3>
    var hrf1Widget =           
    <select value ={hrf1} class="form-select" aria-label="Default select example" onChange={(e) => setHrf1(e.target.value)}>
      <option value="admin">Select</option>
      <option value="admin">AT-PZN</option>
      <option value="operator">BE-ABP Code</option>
      <option value="staff">BR Anvisa Registration Number</option>
      <option value="staff">CA-DIN</option>
      <option value="staff">CH-Swissmedic</option>
      <option value="staff">CN-Subtype Code</option>
      <option value="staff">DE-PPN</option>
      <option value="staff">DE-PZN</option>
      <option value="staff">Dosage</option>
      <option value="staff">Finished good code</option>
      <option value="staff">Form type</option>
      <option value="staff">Generic Name</option>
    </select> 

var headwidget=<h3>Update</h3>
var hrf2Widget =           
<select value ={hrf2} class="form-select" aria-label="Default select example" onChange={(e) => setHrf2(e.target.value)}>
  <option value="admin">Select</option>
  <option value="admin">AT-PZN</option>
  <option value="operator">BE-ABP Code</option>
  <option value="staff">BR Anvisa Registration Number</option>
  <option value="staff">CA-DIN</option>
  <option value="staff">CH-Swissmedic</option>
  <option value="staff">CN-Subtype Code</option>
  <option value="staff">DE-PPN</option>
  <option value="staff">DE-PZN</option>
  <option value="staff">Dosage</option>
  <option value="staff">Finished good code</option>
  <option value="staff">Form type</option>
  <option value="staff">Generic Name</option>
</select> 

var headwidget=<h3>Update</h3>
var hrf3Widget =           
<select value ={hrf3} class="form-select" aria-label="Default select example" onChange={(e) => setHrf3(e.target.value)}>
  <option value="admin">Select</option>
  <option value="admin">AT-PZN</option>
  <option value="operator">BE-ABP Code</option>
  <option value="staff">BR Anvisa Registration Number</option>
  <option value="staff">CA-DIN</option>
  <option value="staff">CH-Swissmedic</option>
  <option value="staff">CN-Subtype Code</option>
  <option value="staff">DE-PPN</option>
  <option value="staff">DE-PZN</option>
  <option value="staff">Dosage</option>
  <option value="staff">Finished good code</option>
  <option value="staff">Form type</option>
  <option value="staff">Generic Name</option>
</select>

var headwidget=<h3>Update</h3>
var hrf3Widget =           
<select value ={hrf4} class="form-select" aria-label="Default select example" onChange={(e) => setHrf4(e.target.value)}>
  <option value="admin">Select</option>
  <option value="admin">AT-PZN</option>
  <option value="operator">BE-ABP Code</option>
  <option value="staff">BR Anvisa Registration Number</option>
  <option value="staff">CA-DIN</option>
  <option value="staff">CH-Swissmedic</option>
  <option value="staff">CN-Subtype Code</option>
  <option value="staff">DE-PPN</option>
  <option value="staff">DE-PZN</option>
  <option value="staff">Dosage</option>
  <option value="staff">Finished good code</option>
  <option value="staff">Form type</option>
  <option value="staff">Generic Name</option>
</select> 

var headwidget=<h3>Update</h3>
    var hrf1Widget =           
    <select value ={hrf5} class="form-select" aria-label="Default select example" onChange={(e) => setHrf5(e.target.value)}>
      <option value="admin">Select</option>
      <option value="admin">AT-PZN</option>
      <option value="operator">BE-ABP Code</option>
      <option value="staff">BR Anvisa Registration Number</option>
      <option value="staff">CA-DIN</option>
      <option value="staff">CH-Swissmedic</option>
      <option value="staff">CN-Subtype Code</option>
      <option value="staff">DE-PPN</option>
      <option value="staff">DE-PZN</option>
      <option value="staff">Dosage</option>
      <option value="staff">Finished good code</option>
      <option value="staff">Form type</option>
      <option value="staff">Generic Name</option>
    </select> 

        var bnoFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        value = {manufacturing_location}
        onChange={(e) => setBno(e.target.value)}
      />
      var locationFieldWidget = <input
      type="text"
      className="form-control form-control-sm"
      value = {batch_number}
      onChange={(e) => setLocation(e.target.value)}
    />
    var production_dateFieldWidget = <input
    type="text"
    className="form-control form-control-sm"
    value = {production_date}
    onChange={(e) => setProduction_date(e.target.value)}
  />

//   var producedFieldWidget = <input
//   type="text"
//   className="form-control form-control-sm"
//   value = {produced}
//   onChange={(e) => setProduced(e.target.value)}
// />


    var createdbyFieldWidget = <input
        type="text"
        className="form-control"
        value={created_by}
        aria-describedby="emailHelp"
        onChange={(e) => setCreatedby(e.target.value)}
      />
      var statusWidget =           
      <select value={status} class="form-select" aria-label="Default select example" onChange={(e) => setStatus(e.target.value)}>
       <option value="admin">Inporoduction</option>
          <option value="operator">Paused</option>
          <option value="staff">Running</option>
      </select>
     
   
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    //alert(address);
    
    if(operation === 'new') {
      axios
        .post('http://127.0.0.1:8000/master/productionorder/', 
        {
          " process_order_number":  process_order_number,    
          "manufacturing_location":manufacturing_location,
          "batch_number":batch_number,
          "production_date":production_date,
  
          // "produced":produced,
          "created_by": created_by,
           "status":status
        },
        {
          auth: {
            username: username,
            password: password
          }
        }
        )
        .then(() => {
          navigate("/po/podatagrid");
        });
        
    }
    else if(operation === 'edit') {
      axios
        .put(`http://127.0.0.1:8000/master/productionorder/update/${id}`, 
        
        {
            "process_order_number":process_order_number,    
            "manufacturing_location":manufacturing_location,
            "batch_number":batch_number,
            "production_date":production_date,
    
            // "produced":produced,
            "created_by": created_by,
            "status":status
        },
        {
          auth: {
            username: username,
            password: password
          }
        }
        )
        .then(() => {
          navigate("/po/podatagrid");
        });
    }
  };

  return (
    <>
     <Navbar data= {window.localStorage.getItem('username') ? window.localStorage.getItem('username') : ""}/> 
      <div className="d-flex justify-content-between m-2">
        {/* <h2>Create</h2> */}
        {headwidget}
        <Link to="/po/podatagrid">
          <button className="btn btn-primary">Show Data</button>
        </Link>
      </div>
      <form>
        <div className="mb-3">
          <label className="form-label"> HRF1</label>
          {hrf1Widget}
        </div>
        <div className="mb-3">
          <label className="form-label">HRF2</label>
          {hrf2Widget}
        </div>
        <div className="mb-3">
          <label className="form-label">HRF3</label>
          {hrf3Widget}
        </div>
          <div className="mb-3">
          <label className="form-label">HRF4</label>
          {hrf4Widget}
        </div>
        
       
        <div className="mb-3">
          <label className="form-label">HRF5</label>
          {hrf5Widget}
        </div>
        {/* <div className="mb-3">
          <label className="form-label">Status</label>
          {statusWidget}
        </div> */}

      
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Pohrf;