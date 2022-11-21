import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import Navbar from '../../components/Navigation/Navbar';

const Barcreate = () => {
  const [id, setId] = useState(0);
  const [Barcodetypename, setBarname] = useState("");

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
      setBarname(localStorage.getItem("Barcodetypename"));
   
      setCreatedby(localStorage.getItem("created_by"));
    }
  }, []);

  if(operation === 'new') {
    var headwidget=<h3>Create</h3>
    var barnameFieldWidget = <input
          type="text"
          className="form-control"
          onChange={(e) => setBarname(e.target.value)}
        /> 

    var createdbyFieldWidget = <input
          type="text"
          className="form-control"
          aria-describedby="emailHelp"
          onChange={(e) => setCreatedby(e.target.value)}
        />

      
  }
  else if(operation === 'edit') {
    var headwidget=<h3>Update</h3>
    var barnameFieldWidget = <input
          type="text"
          className="form-control"
          value = {Barcodetypename}
          onChange={(e) => setBarname(e.target.value)}
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
        .post('http://127.0.0.1:8000/master/barcodetype/', 
        {
          "Barcodetypename": Barcodetypename,    
       
          "created_by": created_by,
        },
        {
          // auth: {
          //   username: username,
          //   password: password
          // }
        }
        )
        .then(() => {
          navigate("/barcode/bardatagrid");
        });
        
    }
    else if(operation === 'edit') {
      axios
        .put(`http://127.0.0.1:8000/master/barcodetype/update/${id}`, 
        
        {
          "Barcodetypename": Barcodetypename,    
          "created_by": created_by,
        },
        {
          // auth: {
          //   username: username,
          //   password: password
          // }
        }
        )
        .then(() => {
          navigate("/barcode/bardatagrid");
        });
    }
  };

  return (
    <>
     <Navbar data= {window.localStorage.getItem('username') ? window.localStorage.getItem('username') : ""}/> 
      <div className="d-flex justify-content-between m-2">
        {/* <h2>Create</h2> */}
        {headwidget}
        <Link to="/barcode/bardatagrid">
          <button className="btn btn-primary">Show Data</button>
        </Link>
      </div>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          {barnameFieldWidget}
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

export default Barcreate;
