import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navigation/Navbar";
// import Sidebar from "../../components/Sidebar/Sidebar";
import Select from "react-select";

const  Regsystemcreate = () => {
  const [id, setId] = useState(0);

  const [ip_address, setIp] = useState("");
  const [system_name, setSystem] = useState("");
  const [line, setLine] = useState("");
  const [manufacturinglocation_id, setManufacturinglocationid] = useState("");
  const [manufactureLocationOptionsNew,setManufacturelocationoptionsnew]=useState("");
  const[locationname,setLocationname]=useState("");
  ///   For navigate function
  const navigate = useNavigate();
  let optionsNew = [];
  ////    for receiving the parameters from URL
  const { operation } = useParams();
  var username = window.localStorage.getItem('username')
  var password = window.localStorage.getItem('password')
  var currentUserrole = window.localStorage.getItem('userrole')
  ////  Fetch data from local storage
  useEffect(() => {
    if(operation === 'edit') {
      setId(localStorage.getItem("id"));
    //   setManid(localStorage.getItem("manufacturinglocation_id"));
      setIp(localStorage.getItem("ip_address"));
      setSystem(localStorage.getItem("system_name"));
      setLine(localStorage.getItem("line"))
    }
  }, []);

  const getmanlocation = event => {
    setManufacturinglocationid(event.value); 
    setLocationname(event.label); 
    // window.localStorage.setItem("customername")    
  }
  // window.localStorage.setItem("customername")   
  function getManlocid() {
    axios
      .get("http://localhost:8000/productionline/manufacturinglocation/",
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
        
        setManufacturelocationoptionsnew(optionsNew);
      });
  }
  
  useEffect(() => {
    getManlocid();
  }, []);

  if(operation === 'new') {
    var headwidget=<h2>Create</h2>
    var manufacturinglocationFieldWidget = <Select onChange={getmanlocation} options={manufactureLocationOptionsNew} /> 
    var ipaddressFieldWidget = <input
          type="text"
          className="form-control"
          onChange={(e) => setIp(e.target.value)}
        /> 
    // var hjwidget=<label className="form-label">Batch Number</label> 
    var systemnameFieldWidget =  <input
        type="text"
        className="form-control"
        onChange={(e) => setSystem(e.target.value)}
      /> 

    var lineFieldWidget = <input
          type="text"
          className="form-control"
          aria-describedby="emailHelp"
          onChange={(e) => setLine(e.target.value)}
        />

      
  }
  else if(operation === 'edit') {
    var headwidget=<h2>Update</h2>
    var ipaddressFieldWidget = <input
          type="text"
          className="form-control"
          value = {ip_address}
          onChange={(e) => setIp(e.target.value)}
        />
    
        var systemnameFieldWidget = <input
        type="text"
        className="form-control"
        value = {system_name}
        onChange={(e) => setSystem(e.target.value)}
      />

    var lineFieldWidget = <input
        type="text"
        className="form-control"
        value={line}
        aria-describedby="emailHelp"
        onChange={(e) => setLine(e.target.value)}
      />

   
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    //alert(address);
    
    if(operation === 'new') {
      axios
        .post('http://localhost:8000/productionline/registeredsystem/', 
        {
          "manufacturinglocation_id": manufacturinglocation_id,    
          "ip_address":ip_address,
          "system_name": system_name,
          "line":line
        },
        {
          auth: {
            username: username,
            password: password
          }
        }
        )
        .then(() => {
          navigate("/regsystem/regsystemdatagrid");
        });
        
    }
    else if(operation === 'edit') {
      axios
        .put(`http://localhost:8000/productionline/registeredsystem/update/${id}`, 
        
        {
            "manufacturinglocation_id": manufacturinglocation_id,    
            "ip_address":ip_address,
            "system_name": system_name,
            "line":line
        },
        {
          auth: {
            username: username,
            password: password
          }
        }
        )
        .then(() => {
          navigate("/regsystem/regsystemdatagrid");
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
        <Link to="/regsystem/regcreatedatagrid">
          <button className="btn btn-primary">Show Data</button>
        </Link>
      </div>
      <form>
        <div className="mb-3">
          <label className="form-label">ManufacturingLocation Id</label>
          {manufacturinglocationFieldWidget}
        </div>
        <div className="mb-3">
        
         <label className="form-label">Ip address</label> 
          {ipaddressFieldWidget}
        </div>

        <div className="mb-3">
          <label className="form-label">System Name</label>
          {systemnameFieldWidget}
        </div>
        <div className="mb-3">
          <label className="form-label">Line</label>
          {lineFieldWidget}
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

export default Regsystemcreate;