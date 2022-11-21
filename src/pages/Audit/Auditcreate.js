import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navigation/Navbar";

const Auditcreate = () => {
  const [id, setId] = useState(0);
  const [model_name, setModelname] = useState("");
  const [history_event, setHistoryevent] = useState("");
  const [history_message, setHistorymessage] = useState("");
  const [history_date, setHistorydate] = useState("");

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
      setModelname(localStorage.getItem("model_name"));
      setHistoryevent(localStorage.getItem("history_event"));
      setHistorymessage(localStorage.getItem("history_message"));
      setHistorydate(localStorage.getItem("history_date"));
    }
  }, []);

  if(operation === 'new') {
    var headwidget=<h3>Create</h3>
    var modelnameFieldWidget = <input
          type="text"
          className="form-control form-control-sm"
          onChange={(e) => setModelname(e.target.value)}
        /> 
        var historyeventFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        onChange={(e) => setHistoryevent(e.target.value)}
      />
      var historymessageFieldWidget = <input
      type="text"
      className="form-control form-control-sm"
      onChange={(e) => setHistorymessage(e.target.value)}
    />

    var historydateFieldWidget = <input
          type="text"
          className="form-control form-control-sm"
          aria-describedby="emailHelp"
          onChange={(e) => setHistorydate(e.target.value)}
        />

      
  }
  else if(operation === 'edit') {
    var headwidget=<h3>Update</h3>
    var modelnameFieldWidget = <input
          type="text"
          className="form-control form-control-sm"
          value = {model_name}
          onChange={(e) => setModelname(e.target.value)}
        />
        var historyeventFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        value = {history_event}
        onChange={(e) => setHistoryevent(e.target.value)}
      />
      var historymessageFieldWidget = <input
      type="text"
      className="form-control form-control-sm"
      value = {history_message}
      onChange={(e) => setHistorymessage(e.target.value)}
    />

    var historydateFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        value={history_date}
        aria-describedby="emailHelp"
        onChange={(e) => setHistorydate(e.target.value)}
      />
    
   
  }

  const handleSubmit = (e) => {
  
    e.preventDefault();
    console.log("clicked");
    //alert(name);
    
    if(operation === 'new') {
      axios
        .post('http://127.0.0.1:8000/accounts/auditlog/', 
        {
          "model_name": model_name, 
          'history_event':history_event,
          'history_message':history_message,   
          "history_date": history_date,
        },
      
        {
          auth: {
            username: username,
            password: password
          }
        }
        )
        .then(() => {
          navigate("/audit/auditdatagrid");
      
        });
        
    }
    else if(operation === 'edit') {
      axios
        .put(`http://127.0.0.1:8000/accounts/auditlog/update/${id}`, 
        
        {
          "model_name": model_name, 
          'history_event':history_event,
          'history_message':history_message,   
          "history_date": history_date,
        },
        {
          auth: {
            username: username,
            password: password
          }
        }
        )
        .then(() => {
          navigate("/audit/auditdatagrid");
        });
    }
  };

  return (
    <>
     <Navbar data= {window.localStorage.getItem('username') ? window.localStorage.getItem('username') : ""}/>
      <div className="d-flex justify-content-between m-2">
        {/* <h2>Create</h2> */}
        {headwidget}
        <Link to="/audit/auditdatagrid">
          <button className="btn btn-primary">Show Data</button>
        </Link>
      </div>
      <form>
        <div className="mb-3">
          <label className="form-label">Model Name</label>
          {modelnameFieldWidget}
        </div>
        <div className="mb-3">
          <label className="form-label">History Event</label>
          {historyeventFieldWidget}
        </div>
        <div className="mb-3">
          <label className="form-label">History Message </label>
          {historymessageFieldWidget}
        </div>

        <div className="mb-3">
          <label className="form-label">History Date</label>
          {historydateFieldWidget}
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

export default Auditcreate;