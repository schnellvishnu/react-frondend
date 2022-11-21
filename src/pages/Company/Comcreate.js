import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import Navbar from '../../components/Navigation/Navbar';


const Comcreate = () => {
  const [id, setId] = useState(0);
  const [company_name, setComname] = useState("");
  const [address, setAddress] = useState("");
  const [zip,setZip] = useState("");
  const [state,setState] = useState("");

  const [gln,setGln] = useState("");
  const [created_by, setCreatedby] = useState("");

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
      setComname(localStorage.getItem("company_name"));
      setAddress(localStorage.getItem("address"));
      setZip(localStorage.getItem("zip"));
      setState(localStorage.getItem("state"));
   
      setGln(localStorage.getItem("gln"));
      setCreatedby(localStorage.getItem("created_by"));
    }
  }, []);

  if(operation === 'new') {
    var headwidget=<h3>Create</h3>
    var comnameFieldWidget = <input
          type="text"
          className="form-control form-control-sm"
          onChange={(e) => setComname(e.target.value)}
        /> 
    var addressFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        onChange={(e) => setAddress(e.target.value)}
      /> 
    var zipFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        onChange={(e) => setZip(e.target.value)}
    /> 
    var stateFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        onChange={(e) => setState(e.target.value)}
/> 

     var glnFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        onChange={(e) => setGln(e.target.value)}
/> 

    var createdbyFieldWidget = <input
          type="text"
          className="form-control form-control-sm"
          aria-describedby="emailHelp"
          onChange={(e) => setCreatedby(e.target.value)}
        />

      
  }
  else if(operation === 'edit') {
    var headwidget=<h3>Update</h3>
    var comnameFieldWidget = <input
          type="text"
          className="form-control  form-control-sm"
          value = {company_name}
          onChange={(e) => setComname(e.target.value)}
        />

        var addressFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        value = {address}
        onChange={(e) => setAddress(e.target.value)}
      /> 
    var zipFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        value = {zip}
        onChange={(e) => setZip(e.target.value)}
    /> 
    var stateFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        value = {state}
        onChange={(e) => setState(e.target.value)}
/> 
   
     var glnFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        value = {gln}
        onChange={(e) => setGln(e.target.value)}
/> 


    var createdbyFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        value={created_by}
        aria-describedby="emailHelp"
        onChange={(e) => setCreatedby(e.target.value)}
      />
    
   
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    //alert(address);
   
    if(operation === 'new') {
      axios
        .post('http://localhost:8000/master/company/', 
        {
          "company_name":company_name, 
          "address":address,
          "zip":zip,
          "state":state,
        
          "gln":gln,
          "created_by":created_by,
        },
        {
          auth: {
            username: username,
            password: password
          }
        }
        )
        .then(() => {
          navigate("/company/comdatagrid");
        });
        
    }

    else if(operation === 'edit') {
      axios
        .put(`http://127.0.0.1:8000/master/company/update/${id}`, 
        
        {
          "company_name":company_name,    
          "created_by":created_by,
          "address":address,
          "zip":zip,
          "state":state,
        
          "gln":gln,
          "created_by":created_by,
        },
        {
          auth: {
            username: username,
            password: password
          }
        }
        )
        .then(() => {
          navigate("/company/comdatagrid");
        });
    }
  };

  return (
    <>
     {/* <Navbar data= {window.localStorage.getItem('username') ? window.localStorage.getItem('username') : ""}/> */}
      <div className="d-flex justify-content-between m-2">
        {/* <h2>create</h2>  */}
        <div className="mb-3">
          
          {headwidget}
        </div>
        <Link to="/company/comdatagrid">
          <button className="btn btn-primary">Show Data</button>
        </Link>
      </div>
      <form >
      
        <div className="mb-3">
          <label className="form-label">Name</label>
          {comnameFieldWidget}
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          {addressFieldWidget}
        </div>
        <div className="mb-3">
          <label className="form-label">Zip</label>
          {zipFieldWidget}
        </div>
        <div className="mb-3">
          <label className="form-label">State</label>
          {stateFieldWidget}
        </div>
       
        <div className="mb-3">
          <label className="form-label">GLN</label>
          {glnFieldWidget}
        </div>

        <div className="mb-3">
          <label className="form-label">Created By</label>
          {createdbyFieldWidget}
        </div>

      
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

export default Comcreate;
