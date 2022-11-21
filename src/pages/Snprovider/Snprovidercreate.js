import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navigation/Navbar";
// import Sidebar from "../../components/Sidebar/Sidebar";
const Snprovidercreate = () => {
  const [id, setId] = useState(0);
  const [name, setname] = useState("");

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
      setname(localStorage.getItem("name"));
   
      setCreatedby(localStorage.getItem("created_by"));
    }
  }, []);

  if(operation === 'new') {
    var headwidget=<h2>Create</h2>
    var nameFieldWidget = <input
          type="text"
          className="form-control"
          onChange={(e) => setname(e.target.value)}
        /> 

    var createdbyFieldWidget = <input
          type="text"
          className="form-control"
          aria-describedby="emailHelp"
          onChange={(e) => setCreatedby(e.target.value)}
        />

      
  }
  else if(operation === 'edit') {
    var headwidget=<h2>Update</h2>
    var nameFieldWidget = <input
          type="text"
          className="form-control"
          value = {name}
          onChange={(e) => setname(e.target.value)}
        />

    var createdbyFieldWidget = <input
        type="text"
        className="form-control"
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
        .post('http://localhost:8000/master/snprovider/', 
        {
          "name":name,    
       
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
          navigate("/snprovider/sndatagrid");
        });
        
    }
    else if(operation === 'edit') {
      axios
        .put(`http://127.0.0.1:8000/master/snprovider/update/${id}`, 
        
        {
          "name":name,    
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
          navigate("/snprovider/sndatagrid");
        });
    }
  };

  return (
    <>
     <Navbar data= {window.localStorage.getItem('username') ? window.localStorage.getItem('username') : ""}/>
     <br></br>

<div class="container">
    <div class="row">
      <div class="col-2">
      {/* <Sidebar/> */}
        
      </div>
    <div class="col-10">
      <div className="d-flex justify-content-between m-2">
        {/* <h2>Create</h2> */}
        <div className="mb-3">

        {headwidget}
        </div>  
        <Link to="/snprovider/sndatagrid">
          <button className="btn btn-primary">Show Data</button>
        </Link>
      </div>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          {nameFieldWidget}
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
      </div> 
      </div>
      </div>
    </>
  );
};

export default Snprovidercreate;
