import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import Navbar from '../../components/Navigation/Navbar';
import Select from "react-select";

const Productcreate = () => {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [imn, setAddress] = useState("");
  const [description , setZip] = useState("");
  const [customer_id,setCustomer_id] = useState("");
  // const [state, setState] = useState("");
  // const [gtin_number, setLocgln] = useState("");
  const [created_by, setCreatedby] = useState("");
  const [CustomerIdOptionsNew, setCustomerOptionsNew] = useState("");
  const[SelectCustomerName,setSelectCustomerName] =useState("")

  ///   For navigate function
  const navigate = useNavigate();
  const getLocation=event=>{
    setCustomer_id(event.value)
    setSelectCustomerName(event.label)
    //  alert(event.value)
    //  alert(event.label)
}

  ////    for receiving the parameters from URL
  const { operation } = useParams();
  var username = window.localStorage.getItem('username')
  var password = window.localStorage.getItem('password')
  var currentUserrole = window.localStorage.getItem('userrole')
  let optionsNew = [];
  ////  Fetch data from local storage
  useEffect(() => {
    if(operation === 'edit') {
      setId(localStorage.getItem("id"));
      setName(localStorage.getItem("name"));
      setAddress(localStorage.getItem("imn"));
      // setState(localStorage.getItem("description "));
      // setLocgln(localStorage.getItem("loc_gln"));
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
  //   var stateFieldWidget = <input
  //   type="text"
  //   className="form-control form-control-sm"
  //   onChange={(e) => setState(e.target.value)}
  // /> 
//   var locglnFieldWidget = <input
//   type="text"
//   className="form-control form-control-sm"
//   aria-describedby="emailHelp"
//   onChange={(e) => setLocgln(e.target.value)}
// />
var custnameFieldWidget = 
        
          <Select onChange={getLocation} options={CustomerIdOptionsNew} /> 
          
          


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
        value = {imn}
        onChange={(e) => setAddress(e.target.value)}
      />
      var zipFieldWidget = <input
      type="text"
      className="form-control form-control-sm"
      value = {description }
      onChange={(e) => setZip(e.target.value)}
    />
  //   var stateFieldWidget = <input
  //   type="text"
  //   className="form-control form-control-sm"
  //   value = {state}
  //   onChange={(e) => setState(e.target.value)}
  // />
//   var locglnFieldWidget = <input
//   type="text"
//   className="form-control form-control-sm"
//   value={gtin_number}
//   aria-describedby="emailHelp"
//   onChange={(e) => setLocgln(e.target.value)}
// />

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
          optionsNew.push({ value: data.id, label: data.name });

        });
      
        setCustomerOptionsNew(optionsNew);
        
      });
  }
  useEffect(() => {
    getCustomerId();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    //alert(address);
    
    if(operation === 'new') {
      axios
        .post('http://localhost:8000/master/product/', 
        {
          "name": name, 
          "imn":imn,
          "description ":description ,
          "customer_id":customer_id,
          // "state":state,   
          // "gtin_number":gtin_number,
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
          navigate("/product/productdatagrid");
        });
        
    }
    else if(operation === 'edit') {
      axios
        .put(`http://localhost:8000/master/product/update/${id}`, 
        
        {"id":id,
            "name": name,
            "imn":imn,
            "description ":description ,
            // "state":state,   
            // "gtin_number":gtin_number,
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
          navigate("/product/productdatagrid");
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
          <label className="form-label">imn</label>
          {addressFieldWidget}
        </div>
        <div className="mb-3">
          <label className="form-label">description </label>
          {zipFieldWidget}
        </div>
        <div className="mb-3">
        <label className="form-label">Customer Name</label>
          {custnameFieldWidget}
        </div>
        {/* <div className="mb-3">
          <label className="form-label">State</label>
          {stateFieldWidget}
        </div>
        <div className="mb-3">
          <label className="form-label">gtin_number</label>
          {locglnFieldWidget}
        </div> */}
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

export default Productcreate;
