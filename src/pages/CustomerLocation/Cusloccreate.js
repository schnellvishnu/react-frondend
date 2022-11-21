import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import Navbar from '../../components/Navigation/Navbar';

import Select from "react-select";

const Cusloccreate = () => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [customer_id,setCustomer_id] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [state, setState] = useState("");
  const [loc_gln, setLocgln] = useState("");
  const [created_by, setCreatedby] = useState("");
  const [cname,setCname] = useState([]);
  const [CustomerIdOptionsNew, setCustomerOptionsNew] = useState("");
  const[SelectCustomerName,setSelectCustomerName] =useState("")
  // const[OptionName,setOptionName]=useState("")
  // const [val,setVal] = useState("")
  ///   For navigate function
  const navigate = useNavigate();

  ////    for receiving the parameters from URL\
  const getLocation=event=>{
    setCustomer_id(event.value)
    setSelectCustomerName(event.label)
    //  alert(event.value)
    //  alert(event.label)
}
  const { operation } = useParams();
  var username = window.localStorage.getItem('username')
  var password = window.localStorage.getItem('password')
  var currentUserrole = window.localStorage.getItem('userrole')
  let optionsNew = [];
  // let optionsname=[];
  ////  Fetch data from local storage
  useEffect(() => {
    if(operation === 'edit') {
      setId(localStorage.getItem("id"));
      setName(localStorage.getItem("name"));
      // setCustomer_id(localStorage.getItem("customer_id"));
      setAddress(localStorage.getItem("address"));
      setState(localStorage.getItem("state"));
      setLocgln(localStorage.getItem("loc_gln"));
      setCreatedby(localStorage.getItem("created_by"));
     
    }
  }, []);
  if(operation === 'new') {
    var headwidget=<h3>Create</h3>
    var locnameFieldWidget = <input
          type="text"
          className="form-control form-control-sm"
          onChange={(e) => setName(e.target.value)}
        /> 
        var hjwidget=<label className="form-label">Customer Name</label>
        // var custnameFieldWidget = <input
        // type="text"
        // className="form-control form-control-sm"
        // onChange={(e) => setCustomer_id(e.target.value)}
      // /> 
        var custnameFieldWidget = 
        
          <Select onChange={getLocation} options={CustomerIdOptionsNew} /> 
          
          
     
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
  var locglnFieldWidget = <input
  type="text"
  className="form-control form-control-sm"
  aria-describedby="emailHelp"
  onChange={(e) => setLocgln(e.target.value)}
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
    var locnameFieldWidget = <input
          type="text"
          className="form-control form-control-sm"
          value = {name}
          onChange={(e) => setName(e.target.value)}
        />
      
        var addressFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        value = {address}
        onChange={(e) => setAddress(e.target.value)}
      />
      var zipFieldWidget = <input
      type="number"
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
  var locglnFieldWidget = <input
  type="text"
  className="form-control form-control-sm"
  value={loc_gln}
  aria-describedby="emailHelp"
  onChange={(e) => setLocgln(e.target.value)}
/>

    var createdbyFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        value={created_by}
        aria-describedby="emailHelp"
        onChange={(e) => setCreatedby(e.target.value)}
      />
    
    
  }


  function getCustomerId() {
    //alert("anu");
    axios
      .get("http://127.0.0.1:8000/master/customer/",
        {
          auth: {
            username: username,
            password: password
          }
        },
        {
          'param': 'anu' 
        }
      )
      .then((res) => {
        // let batchNumberOptionsInitial = "";
        res.data.map(data => {
          optionsNew.push({ value: data.id,label:data.name});
          // optionsname.push({ label:data.name })

        });
      
        setCustomerOptionsNew(optionsNew);
        // setOptionName((localStorage.setItem(optionsName)))
        // alert(optionsName)
        
      });
  }
  useEffect(() => {
    getCustomerId();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    
var cust=customer_id
// alert(2)
    //alert(address);
    
    if(operation === 'new') {
    
      axios
        .post('http://localhost:8000/master/locations/', 
        {
         
          "name": name, 
          "customer_id":customer_id,
          "address":address,
          "zip":zip,
          "state":state,   
          "loc_gln":loc_gln,
          "created_by": created_by
          
        },
      
        {
          auth: {
            username: username,
            password: password
          }
        }
        )
        .then(() => {
          navigate("/customerlocation/cuslocdatagrid");
        });
      // }  
    }
    else if(operation === 'edit') {
      axios
        .put(`http://localhost:8000/master/locations/update/${id}`, 
        
        {
            "name": name,
            "customer_id":customer_id,
            "address":address,
            "zip":zip,
            "state":state,   
            "loc_gln":loc_gln,
            "created_by": created_by
        },
        {
          auth: {
            username: username,
            password: password
          }
        }
        )
        .then(() => {
          navigate("/customerlocation/cuslocdatagrid");
        });
    }
  };

  return (
    <>
      <Navbar data= {window.localStorage.getItem('username') ? window.localStorage.getItem('username') : ""}/> 
      <div className="d-flex justify-content-between m-2">
        {/* <h2>Create</h2> */}
        {headwidget}
        <Link to="/customerlocation/cuslocdatagrid">
          <button className="btn btn-primary">Show Data</button>
        </Link>
      </div>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          {locnameFieldWidget}
        </div>
        <div className="mb-3">
        <label className="form-label">Customer Name</label>
          {custnameFieldWidget}
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
          <label className="form-label">Location Gln</label>
          {locglnFieldWidget}
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

export default Cusloccreate;
