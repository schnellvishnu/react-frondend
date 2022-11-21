import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import Navbar from '../../components/Navigation/Navbar';

const Customercreate = () => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [company_prefix, setCompany_prefix] = useState("");
  const [company_gln,setCompany_gln] =useState("");
  const [address,setAddress] =useState("");
  const [zip,setZip] =useState("");
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
      setCompany_prefix(localStorage.getItem("company_prefix"));
      setCompany_gln(localStorage.getItem("company_gln"));
      setAddress(localStorage.getItem("address"));
      setZip(localStorage.getItem("zip"));
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
        var companyprefixFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        onChange={(e) => setCompany_prefix(e.target.value)}
      /> 
      var companyglnFieldWidget = <input
      type="text"
      className="form-control form-control-sm"
      onChange={(e) => setCompany_gln(e.target.value)}
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
        var companyprefixFieldWidget = <input
          type="text"
          className="form-control form-control-sm"
          value = {company_prefix}
          onChange={(e) => setCompany_prefix(e.target.value)}
        />
        var companyglnFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        value = {company_gln}
        onChange={(e) => setCompany_gln(e.target.value)}
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
        .post('http://localhost:8000/master/customer/', 
        {
          "name": name,
          'company_prefix': company_prefix,
          'company_gln':company_gln,
          'address':address,
          'zip':zip ,  
       
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
          navigate("/customer/cusdatagrid");
        });
        
    }
    else if(operation === 'edit') {
      axios
        .put(`http://localhost:8000/master/customer/update/${id}`, 
        
        {
          "name": name,  
          'company_prefix': company_prefix,
          'company_gln':company_gln,
          'address':address,
          'zip':zip ,    
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
          navigate("/customer/cusdatagrid");
        });
    }
  };

  return (
    <>
      <Navbar data= {window.localStorage.getItem('username') ? window.localStorage.getItem('username') : ""}/> 
      <div className="d-flex justify-content-between m-2">
        {/* <h2>Create</h2> */}
        {headwidget}
        <Link to="/customer/cusdatagrid">
          <button className="btn btn-primary">Show Data</button>
        </Link>
      </div>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          {nameFieldWidget}
        </div>
        <div className="mb-3">
          <label className="form-label">Company Prefix</label>
          {companyprefixFieldWidget}
        </div>
        <div className="mb-3">
          <label className="form-label">Company GLN</label>
          {companyglnFieldWidget}
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

export default Customercreate;