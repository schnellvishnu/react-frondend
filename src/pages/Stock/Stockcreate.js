import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
// import Navbar from "../../components/Navbar";
import Navbar from "../../components/Navigation/Navbar";

const Stockcreate = () => {
  const [id, setId] = useState(0);
  const [productionorder_num, setProductionordernum] = useState("");
  const [product_name, setProductname] = useState("");
  const [batch_num,setBatchnum] =useState("");
  const [stock_quantity,setStockquantity] =useState("");
  const [shipped,setShipped] =useState("");
  const [expiration_date, setExpirationdate] = useState("");

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
      setProductionordernum(localStorage.getItem("productionorder_num"));
      setProductname(localStorage.getItem("product_name"));
      setBatchnum(localStorage.getItem("batch_num"));
      setStockquantity(localStorage.getItem("stock_quantity"));
      setShipped(localStorage.getItem("shipped"));
      setExpirationdate(localStorage.getItem("expiration_date"));
    }
  }, []);

  if(operation === 'new') {
    var headwidget=<h3>Create</h3>
    var ponameFieldWidget = <input
          type="text"
          className="form-control form-control-sm"
          onChange={(e) =>setProductionordernum(e.target.value)}
        /> 
        var pdtnameFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        onChange={(e) =>  setProductname(e.target.value)}
      /> 
      var batchFieldWidget = <input
      type="text"
      className="form-control form-control-sm"
      onChange={(e) => setBatchnum(e.target.value)}
    /> 
    var stockqntyFieldWidget = <input
    type="text"
    className="form-control form-control-sm"
    onChange={(e) => setStockquantity(e.target.value)}
  /> 
  var shippedFieldWidget = <input
  type="text"
  className="form-control form-control-sm"
  onChange={(e) =>  setShipped(e.target.value)}
/> 


    var dateFieldWidget = <input
          type="text"
          className="form-control form-control-sm"
          aria-describedby="emailHelp"
          onChange={(e) => setExpirationdate(e.target.value)}
        />

      
  }
  else if(operation === 'edit') {
    var headwidget=<h3>Update</h3>
    var ponameFieldWidget = <input
          type="text"
          className="form-control form-control-sm"
          value = {productionorder_num}
          onChange={(e) => setProductionordernum(e.target.value)}
        />
        var pdtnameFieldWidget = <input
          type="text"
          className="form-control form-control-sm"
          value = {product_name}
          onChange={(e) => setProductname(e.target.value)}
        />
        var batchFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        value = {batch_num}
        onChange={(e) => setBatchnum(e.target.value)}
      />
      var stockqntyFieldWidget = <input
      type="text"
      className="form-control form-control-sm"
      value = {stock_quantity}
      onChange={(e) => setStockquantity(e.target.value)}
    />
    var shippedFieldWidget = <input
    type="text"
    className="form-control form-control-sm"
    value = {shipped}
    onChange={(e) => setShipped(e.target.value)}
  />

    var dateFieldWidget = <input
        type="text"
        className="form-control form-control-sm"
        value={expiration_date}
        aria-describedby="emailHelp"
        onChange={(e) => setExpirationdate(e.target.value)}
      />
    
   
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");
    // alert(address);
    
    if(operation === 'new') {
      axios
        .post('http://127.0.0.1:8000/master/stock/', 
        {
          "productionorder_num": productionorder_num,
          'product_name': product_name,
          'batch_num':batch_num,
          'stock_quantity':stock_quantity,
          'shipped':shipped ,  
       
          "expiration_date": expiration_date,
        },
        {
          auth: {
            username: username,
            password: password
          }
        }
        )
        .then(() => {
          navigate("/stock/stockdatagrid");
        });
        
     }
     if(operation === 'edit') {
      axios
        .put(`http://127.0.0.1:8000/master/stock/update/${id}`, 
        
        {
            "productionorder_num": productionorder_num,
            'product_name': product_name,
            'batch_num':batch_num,
            'stock_quantity':stock_quantity,
            'shipped':shipped ,  
    
            "expiration_date": expiration_date,
        },
        {
          auth: {
            username: username,
            password: password
          }
        }
        )
        .then(() => {
          navigate("/stock/stockdatagrid");
        });
    }
  };

  return (
    <>
      <Navbar data= {window.localStorage.getItem('username') ? window.localStorage.getItem('username') : ""}/> 
      <div className="d-flex justify-content-between m-2">
        {/* <h2>Create</h2> */}
        {headwidget}
        <Link to="/stock/stockdatagrid">
          <button className="btn btn-primary">Show Data</button>
        </Link>
      </div>
      <form>
        <div className="mb-3">
          <label className="form-label">Productionorder Number</label>
          {ponameFieldWidget}
        </div>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          {pdtnameFieldWidget}
        </div>
        <div className="mb-3">
          <label className="form-label">Batch Number</label>
          {batchFieldWidget}
        </div>
        <div className="mb-3">
          <label className="form-label">Stock Quantity</label>
          {stockqntyFieldWidget}
        </div>
        <div className="mb-3">
          <label className="form-label">Shipped</label>
          {shippedFieldWidget}
        </div>

        <div className="mb-3">
          <label className="form-label">Expiration Date</label>
          {dateFieldWidget}
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

export default Stockcreate;