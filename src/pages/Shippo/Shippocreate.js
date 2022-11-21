import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navigation/Navbar";
import Select from "react-select";

const Shippocreate = () => {
  const [id, setId] = useState(0);
  const [shipping_order_name, setName] = useState("");
  const [source_location, setSourceLoc] = useState("");
  const [destination_location, setDestinationLoc] = useState("");
  const [subject_name, setSubjectName] = useState("");
  const [shipping_date, setShipingDate] = useState("");
  const [created_by, setCreatedby] = useState("");

  const [batch_for_export, setExport] = useState("");
  const [CustomerIdOptionsNew, setCustomerOptionsNew] = useState("");
  const[SelectCustomerName,setSelectCustomerName] =useState("")

  const [LocationIdOptionsNew,setLocationOptionsNew]=useState("");
  const [SelectLocationName,setLocationOptionsName]=useState("");



  ///   For navigate function
  const navigate = useNavigate();
  const getLocation=event=>{
    setSubjectName(event.value)
    setSelectCustomerName(event.label)
    //  alert(event.value)
    //  alert(event.label)
}
const getDestinationLocation=event=>{
  setDestinationLoc(event.value)
  setLocationOptionsName(event.label)


}

  ////    for receiving the parameters from URL
  const { operation } = useParams();
  var username = window.localStorage.getItem('username')
  var password = window.localStorage.getItem('password')
  var currentUserrole = window.localStorage.getItem('userrole')
  let optionsNew = [];
  let locationoption=[];
  ////  Fetch data from local storage
  useEffect(() => {
    if(operation === 'edit') {
      setId(localStorage.getItem("id"));
      setName(localStorage.getItem("shipping_order_name"));
      setSourceLoc(localStorage.getItem("source_location"));
      setDestinationLoc(localStorage.getItem("destination_location"));
      setSubjectName(localStorage.getItem("subject_name"));
      setShipingDate(localStorage.getItem("shipping_date"));
      setCreatedby(localStorage.getItem("created_by"));
      setExport(localStorage.getItem("batch_for_export"));
    }
  }, []);

  if(operation === 'new') {
    var headwidget=<h3>Create</h3>
    var nameFieldWidget = <input
          type="text"
          className="form-control form-control-sm"
          onChange={(e) => setName(e.target.value)}
        /> 
        var sorcelocFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        onChange={(e) => setSourceLoc(e.target.value)}
      />
      var destinationFieldWidget = 
      <Select onChange={getDestinationLocation} options={LocationIdOptionsNew} /> 
        
    

    var createdbyFieldWidget = <input
          type="text"
          className="form-control form-control-sm"
          aria-describedby="emailHelp"
          onChange={(e) => setCreatedby(e.target.value)}
        />
         var subjectnameFieldWidget = 
        
        <Select onChange={getLocation} options={CustomerIdOptionsNew} /> 
        
        var shipinddateFieldWidget = <input
          type="text"
          className="form-control form-control-sm"
          aria-describedby="emailHelp"
          onChange={(e) => setShipingDate(e.target.value)}
        />
        var exportFieldWidget = <input
          type="text"
          className="form-control form-control-sm"
          aria-describedby="emailHelp"
          onChange={(e) => setExport(e.target.value)}
        />

      
  }
  else if(operation === 'edit') {
    var headwidget=<h3>Update</h3>
    var nameFieldWidget = <input
          type="text"
          className="form-control form-control-sm"
          value = {shipping_order_name}
          onChange={(e) => setName(e.target.value)}
        />
        var sorcelocFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        value = {source_location}
        onChange={(e) => setSourceLoc(e.target.value)}
      />
      var destinationFieldWidget = <input
      type="text"
      className="form-control form-control-sm"
      value = {destination_location}
      onChange={(e) => setDestinationLoc(e.target.value)}
    />

    var createdbyFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        value={created_by}
        aria-describedby="emailHelp"
        onChange={(e) => setCreatedby(e.target.value)}
      />
      var subjectnameFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        value={subject_name}
        aria-describedby="emailHelp"
        onChange={(e) => setSubjectName(e.target.value)}
      />
      var shipinddateFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        value={shipping_date}
        aria-describedby="emailHelp"
        onChange={(e) => setShipingDate(e.target.value)}
      />
      var exportFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        value={ batch_for_export}
        aria-describedby="emailHelp"
        onChange={(e) => setExport(e.target.value)}
      />
    
   
  }
  function getLocationId() {
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
      
        setLocationOptionsNew(locationoption);
        // setOptionName((localStorage.setItem(optionsName)))
        // alert(optionsName)
        
      });
  }
  useEffect(() => {
    getLocationId();

  }, []);

  
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
    //alert(name);
    
    if(operation === 'new') {
      axios
        .post('http://127.0.0.1:8000/master/shippo/', 
        {
          "shipping_order_name": shipping_order_name, 
          'source_location':source_location,
          'destination_location':destination_location,   
          "created_by": created_by,
          "subject_name":subject_name,
          "shipping_date":shipping_date,
          "batch_for_export":batch_for_export
        },
      
        {
          auth: {
            username: username,
            password: password
          }
        }
        )
        .then(() => {
          navigate("/shippo/shippodatagrid");
      
        });
        
    }
    else if(operation === 'edit') {
      axios
        .put(`http://127.0.0.1:8000/master/shippo/update/${id}`, 
        
        {
          "shipping_order_name": shipping_order_name,   
          "batch_for_export":batch_for_export,
          "shipping_date":shipping_date, 
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
          navigate("/shippo/shippodatagrid");
        });
    }
  };

  return (
    <>
     {/* <Navbar data= {window.localStorage.getItem('username') ? window.localStorage.getItem('username') : ""}/> */}
      <div className="d-flex justify-content-between m-2">
        {/* <h2>Create</h2> */}
        {headwidget}
        <Link to="/shippo/shippodatagrid">
          <button className="btn btn-primary">Show Data</button>
        </Link>
      </div>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          {nameFieldWidget}
        </div>
        <div className="mb-3">
          <label className="form-label">SourceLocation</label>
          {sorcelocFieldWidget}
        </div>
        <div className="mb-3">
          <label className="form-label">DestinationLocation</label>
          {destinationFieldWidget}
        </div>

        <div className="mb-3">
          <label className="form-label">Created By</label>
          {createdbyFieldWidget}
        </div>
        <div className="mb-3">
          <label className="form-label">Subject Name</label>
          {subjectnameFieldWidget}
        </div>
        <div className="mb-3">
          <label className="form-label">ShipingDate</label>
          {shipinddateFieldWidget}
        </div>
        <div className="mb-3">
          <label className="form-label">Export</label>
          {exportFieldWidget}
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

export default Shippocreate;