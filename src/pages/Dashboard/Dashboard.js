import React, { useState, useEffect } from "react";
import axios from "axios";
import PieChart from "./PieChart";
import { Container } from "@mui/system";
import TableScroller from 'react-table-scrollbar'
import { DataGrid} from '@material-ui/data-grid';
import background from "../../image/img6.jpg";
import Navbar from '../../components/Navigation/Navbar';
function Dashboard() {
  const[Data,setData] = useState([])
  const [userDataRows, setUserDataRows] = useState([]);

  var username = window.localStorage.getItem('username')
  var password = window.localStorage.getItem('password')
  var currentUserrole = window.localStorage.getItem('userrole')
  let userDataColumns = [
    { field: 'id', headerName: 'Id', width:100 },
    { field: 'title',headerName: 'title', width: 180 },
    { field: 'description', headerName: 'description', width: 150 },
    { field: 'created_by', headerName: 'created_by', width: 150 },
    { field: 'updated_by', headerName: 'updated_by', width: 170 },]
    function createRows(rowDatas) {
      //alert(rowDatas.length);
  
      // let editButton = <button></button>;  
  
      rowDatas.map(rowData => {
        //alert(rowData.id);
        setUserDataRows( userDataRows => [
          ...userDataRows,
          {'id':rowData.id, 'title':rowData.title,'description':rowData.description,
          'created_by':rowData.created_by,
          'updated_by':rowData.updated_by},
        ]);
  
      })
    }
    function getData() {
      //alert("anu");
      axios
        .get("http://127.0.0.1:8000/productionline/task/",
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
          //alert(res.data.length);
          setData(res.data);
          createRows(res.data);
        });
    }
  
  //  const getData = () =>
  //  {
  //      fetch('http://127.0.0.1:8000/productionline/task/')
  //      .then(resposne=> resposne.json())
  //      .then(res=>setRecord(res))
  //  }
 
  //  useEffect(() => {
  //     getData();
  //  },)
  useEffect(() => {
    //console.log('i fire once');
    getData();
    //alert("anu");
  }, []);
  return (
    
    
   
  <div class="dash-body" >
   
    <div class="row mb-3" >
            <div class="col-xl-3  py-2">
                <div class="card bg-success text-white h-10">
                    <div class="card-body " style={{backgroundColor:"#EF9A9A"}}>
                        <div class="rotate">
                            <i class="fa fa-user fa-4x"></i>
                        </div>
                        <h6 class="text-uppercase">ProductionOrders</h6>
                        <h1 class="display-4">134</h1>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 py-2">
                <div class="card text-white bg-danger h-100">
                    <div class="card-body " style={{backgroundColor:"#FF8A65"}}>
                        <div class="rotate">
                            <i class="fa fa-book fa-4x"></i>
                        </div>
                        <h6 class="text-uppercase ">Stock</h6>
                        <h1 class="display-4">87</h1>
                    </div>
                </div>
            </div>
            <div class="col-md-3  col-sm-6 py-2">
                <div class="card text-white bg-info h-100">
                    <div class="card-body bg-info">
                        <div class="rotate">
                          <i class="fa fa-check fa-4x"></i>
                        </div>
                        <h6 class="text-uppercase">Product</h6>
                        <h1 class="display-4">125</h1>
                    </div>
                </div>
            </div>
            <div class="col-md-3  col-sm-6 py-2">
                <div class="card text-white  h-100" style={{backgroundColor:"#607D8B"}}>
                    <div class="card-body">
                        <div class="rotate">
                            <i class="fa fa-user fa-4x"></i>
                        </div>
                        <h6 class="text-uppercase">Customers</h6>
                        <h1 class="display-4">36</h1>
                    </div>
                </div>
            </div>
            </div>





<div className="container"  > 
<div className="row">
  <div className="col-7" id="tab">
  <div style={{ height: 400, width: '90%',backgroundColor:' #00A693',backgroundImage:`url(${background})` }}>
  <DataGrid rows={userDataRows} columns={userDataColumns} pageSize={10}  /></div>
  {/* <table class="table table-striped">
                        <thead class="thead-light">
                            <tr>
                                <th>No</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Created By</th>
                                <th>Updated By </th>
                                <th>Created At</th>
                                <th>Closed By</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                         {record.slice(0, 5).map((output)=>
                            <tr>
                                <td>{output.id}</td>
                                <td>{output.title}</td>
                                <td>{output.description}</td>
                                <td>{output.created_by}</td>
                                <td>{output.updated_by }</td>
                                <td>{output.created_at}</td>
                                <td>{output.closed_by}</td>
                                <td></td>
                            </tr>
                           )}
                        </tbody>
                        
                    </table> */}
                   
  </div>
  <div className="col-1"></div>
  <div className="col-3">
    
    
  <div className="col-lg-5 col-md-6 col-sm-12 col-sm-offset-5">
             {/* <h4 className='title mt-3 mb-3 text-center text-secondary'>Data in Chart</h4> */}
              <div className="mb-5" style={{height:"380px",width:"360px",marginleft:"1000px" }}><PieChart/> </div></div>
  </div>
</div>
           
</div> 


          
            
</div>




             
   
    
   
      



)

}


export default Dashboard
