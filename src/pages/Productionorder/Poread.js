import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
// import Navbar from "../Navigation/Navbar";
import Navbar from "../../components/Navigation/Navbar";

const Poread = () => {
  const [data, setData] = useState([]);
  const [tabledark, setTableDark] = useState("");

  ///   For navigate function
  const navigate = useNavigate();

  // function logout() {
  //   window.localStorage.removeItem("username");
  //   window.localStorage.removeItem("password");

  //   navigate("/account/login");
    
  // }

  var username = window.localStorage.getItem('username')
  var password = window.localStorage.getItem('password')
  var currentUserrole = window.localStorage.getItem('userrole')
  //alert(window.localStorage.getItem('userrole'));

  function getData() {
    axios
      .get("http://localhost:8000/master/productionorder/",
        {
          auth: {
            username: username,
            password: password
          }
        },
        // {
        //   'param': 'anu' 
        // }
      )
      .then((res) => {
        setData(res.data);
      });
  }

  function handleDelete(id) {
    axios
      .delete(`http://localhost:8000/master/productionorder/delete/${id}`,
        {
          auth: {
            username: username,
            password: password
          }
        }
      )
      .then(() => {
        getData();
      });
  }

  const setToLocalStorage = (id, process_order_number,batch_number,manufacturing_location,production_date,requested,produced,created_by,status) => {
    localStorage.setItem("id", id);
    localStorage.setItem("process_order_number", process_order_number);
    localStorage.setItem("batch_number", batch_number);
    localStorage.setItem("manufacturing_location", manufacturing_location);
    localStorage.setItem("production_date", production_date);

    // localStorage.setItem("produced", produced);
    // localStorage.setItem("created_by", created_by);
    // localStorage.setItem("status", status);
  };
  const navigateToCreatePage = () => {
    navigate("/po/pocreate/new");
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
          <Navbar/>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          onClick={() => {
            if (tabledark === "table-dark") setTableDark("");
            else setTableDark("table-dark");
          }}
        />
      </div>
      <div className="d-flex justify-content-between m-2">
        <h2>Read Operation</h2>
        <button
        disabled={currentUserrole==="operator" || currentUserrole==="staff" ? true : false}
        onClick={navigateToCreatePage} 
        className="btn btn-success">Create</button>
      </div>
      <table className={`table ${tabledark}`}>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Process Order Number</th>
            <th scope="col">Batch Number</th>
            <th scope="col">Location</th>
            <th scope="col">ProductionDate</th>
          
            <th scope="col">Produced</th>
            <th scope="col">Created By</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        {data.map((eachData) => {
          return (
            <>
              <tbody>
                <tr>
                  <th scope="row">{eachData.id}</th>
                  <td>{eachData.process_order_number}</td>
                  <td>{eachData.batch_number}</td>
                  <td>{eachData.manufacturing_location}</td>
                  <td>{eachData.production_date}</td>
              
                  <td>{eachData.produced}</td>
                  <td>{eachData.created_by}</td>
                  <td>{eachData.status}</td>
                  
                  <td>
                    <Link to="/po/pocreate/edit">
                      <button disabled={currentUserrole==="operator" ||currentUserrole==="staff" ? true : false}
                        className="btn-success"
                        onClick={() =>
                          setToLocalStorage(
                            eachData.id,
                            eachData.process_order_number,
                            eachData.batch_number,
                            eachData.manufacturing_location,
                            eachData.production_date,
                      
                            eachData.produced,
                            eachData.created_by,
                            eachData.status,
                          )
                        }
                      >
                        Edit{" "}
                      </button>
                    </Link>
                  </td>
                  
                  <td>
                    <button
                      className="btn-danger"
                      disabled={currentUserrole==="operator" ? true : false}
                      onClick={() => handleDelete(eachData.id)}
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              </tbody>
            </>
          );
        })}
      </table>


      {/* <button
              type="submit"
              className="btn btn-primary"
              onClick={logout}
            >
              Logout
      </button> */}

    </>
  );
};

export default Poread;