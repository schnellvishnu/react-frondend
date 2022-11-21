import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import Navbar from '../../components/Navigation/Navbar';

const Manucreate = () => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [gln_number, setGlnnumber] = useState("");
  const [address, setAddress] = useState("");
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
      setName(localStorage.getItem("name"));
      setGlnnumber(localStorage.getItem("gln_number"));
      setAddress(localStorage.getItem("address"));
      setCreatedby(localStorage.getItem("created_by"));
    }
  }, []);

  if(operation === 'new') {
    var headwidget=<h3>Create</h3>
    var nameFieldWidget = <input
          type="text"
          className="form-control form-control-sm"
          onChange={(e) => setName(e.target.value)}
        /> 
        var glnnumberFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        onChange={(e) => setGlnnumber(e.target.value)}
      />
      var addressFieldWidget = <input
      type="text"
      className="form-control form-control-sm"
      onChange={(e) => setAddress(e.target.value)}
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
    var nameFieldWidget = <input
          type="text"
          className="form-control form-control-sm"
          value = {name}
          onChange={(e) => setName(e.target.value)}
        />
        var glnnumberFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        value = {gln_number}
        onChange={(e) => setGlnnumber(e.target.value)}
      />
      var addressFieldWidget = <input
      type="text"
      className="form-control form-control-sm"
      value = {address}
      onChange={(e) => setAddress(e.target.value)}
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
    //alert(name);
    
    if(operation === 'new') {
      axios
        .post('http://localhost:8000/productionline/manufacturinglocation/', 
        {
          "name": name, 
          'gln_number':gln_number,
          'address':address,   
          "created_by": created_by,
        },
      
        {
          auth: {
            username: username,
            password: password
          }
        }
        )
        .then(() => {
          navigate("/manufacture/manudatagrid");
      
        });
        
    }
    else if(operation === 'edit') {
      axios
        .put(`http://localhost:8000/productionline/manufacturinglocation/update/${id}`, 
        
        {
          "name":name,    
          'gln_number':gln_number,
          'address':address,   
          "created_by": created_by,
        },
        {
          auth: {
            username: username,
            password: password
          }
        }
        )
        .then(() => {
          navigate("/manufacture/manudatagrid");
        });
    }
  };

  return (
    <>
      <Navbar data= {window.localStorage.getItem('username') ? window.localStorage.getItem('username') : ""}/> 
      <div className="d-flex justify-content-between m-2">
        {/* <h2>Create</h2> */}
        {headwidget}
        <Link to="/manufacture/manudatagrid">
          <button className="btn btn-primary">Show Data</button>
        </Link>
      </div>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          {nameFieldWidget}
        </div>
        <div className="mb-3">
          <label className="form-label">Adress</label>
          {glnnumberFieldWidget}
        </div>
        <div className="mb-3">
          <label className="form-label">Gln </label>
          {addressFieldWidget}
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

export default Manucreate;