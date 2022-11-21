import React, { useState, useEffect } from "react";
import axios from "axios";


import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navigation/Navbar";
// import { SidebarData } from "../../components/SidebarData";
import { DataGrid, GridToolbar, GridApi, GridCellValue, GridToolbarContainer, GridToolbarColumnsButton, 
  GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@material-ui/data-grid';
import { fontSize } from "@mui/system";



const Podatagrid = () => {
  const [data, setData] = useState([]);
  const [tabledark, setTableDark] = useState("");

  const [userDataRows, setUserDataRows] = useState([]);

  ///   For navigate function
  const navigate = useNavigate();

  function logout() {
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("password");

    navigate("/account/login");
  }

  var username = window.localStorage.getItem('username')
  var password = window.localStorage.getItem('password')
  var currentUserrole = window.localStorage.getItem('userrole')
  //alert(window.localStorage.getItem('password'));


  function handleDelete(id) {
    axios
      .delete(`http://127.0.0.1:8000/master/productionorder/delete/${id}`,
        {
          auth: {
            username: username,
            password: password
          }
        }
      )
      .then(() => {
        //getData();
        alert("anu");
        navigate("/po/podatagrid");
      });
  }

  const setToLocalStorage = (id,process_order_number,manufacturing_location,batch_number,created_by) => {
    localStorage.setItem("id", id);
    localStorage.setItem("process_order_number", process_order_number);
    localStorage.setItem("manufacturing_location", manufacturing_location);
    localStorage.setItem("batch_number",batch_number);
    // localStorage.setItem("production_date",production_date);

    // localStorage.setItem("produced ",produced );
    localStorage.setItem("created_by", created_by);
    // localStorage.setItem("status", status);
  };

  let userDataColumns = [
    { field: 'id', headerName: 'Id', width:100 },
    { field: 'process_order_number',headerName: 'process_order_number', width: 160 },
    { field: 'manufacturing_location', headerName:'manufacturing_location', width: 150 },
    { field: 'batch_number', headerName:'batch_number', width: 150 },
    // { field: 'production_date', headerName: 'Production Date', width: 150 },
    // { field: 'produced', headerName: 'Produced', width: 150 },
    { field: 'created_by', headerName: 'Created By', width: 170 },
    // { field: 'status', headerName: 'Status', width: 170 },
    {
      field: 'edit',
      headerName: 'Edit',
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
  
          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};
  
          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            );
          //alert(thisRow.name);
  
          setToLocalStorage(
            thisRow.id,
            thisRow.process_order_number,
            thisRow.manufacturing_location,
            thisRow.batch_number,
            // thisRow.production_date,
   
            // thisRow.produced,
            thisRow.created_by,
            // thisRow.status,
          );
  
          //return alert(JSON.stringify(thisRow, null, 4));
        };
  
        //alert(currentUserrole);


        if(currentUserrole == 'admin') {
          return <Link to="/po/pocreate/edit"><button
            className="btn btn-primary" 
            onClick={onClick}>Edit</button></Link>;
         
        }
        else {
          return <button
            className="btn btn-primary" 
            disabled="true"
            onClick={onClick}>Edit</button>;
        }
      },
    },
    {
      field: 'delete',
      headerName: 'Delete',
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
  
          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};
  
          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field)),
            );
          //alert(thisRow.id);
    
          //return alert(JSON.stringify(thisRow, null, 4));

          axios
          .delete(`http://127.0.0.1:8000/master/productionorder/delete/${thisRow.id}`,
            {
              auth: {
                username: username,
                password: password
              }
            }
          )
          .then(() => {
            getData();
            //alert("anu");
            //navigate("/account/read");
            window.location.reload();
          });
        };
        if(currentUserrole == 'admin'||currentUserrole=='staff') {
        return <button
          className="btn btn-danger" 
          onClick={onClick}>Delete</button>;
        }
        else{
          return <button
          className="btn btn-danger" 
          disabled="true"
          onClick={onClick}>Delete</button>;

        }
      },
    },
  ];  


  function createRows(rowDatas) {
    //alert(rowDatas.length);

    let editButton = <button></button>;  

    rowDatas.map(rowData => {
      //alert(rowData.id);
      setUserDataRows( userDataRows => [
        ...userDataRows,
        {'id':rowData.id, 'process_order_number':rowData.process_order_number,'manufacturing_location':rowData.manufacturing_location,
        'batch_number':rowData.batch_number,
        // 'produced':rowData.produced,
        'created_by':rowData.created_by,},
      ]);

    })
  }

  function getData() {
    //alert("anu");
    axios
      .get("http://127.0.0.1:8000/master/productionorder/",
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

  function handleDelete(id) {
    axios
      .delete(`http://127.0.0.1:8000/master/productionorder/delete/${id}`,
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

  const navigateToCreatePage = () => {
    navigate("/po/pocreate/new");
  };
  const navigateToHrfPage = () => {
    navigate("/po/pohrfcreate/new");
  };
  const navigateToPopropertiesPage = () => {
    navigate("/po/poproperties/new");
  };

  useEffect(() => {
    //console.log('i fire once');
    getData();
    //alert("anu");
  }, []);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }  

  return (
    <>

       <Navbar/> 
   <div className="b3">
      <div style={{ height: 700,width:'390%',backgroundColor:'#6199c7' }}>
        <h5>PRODUCTIONORDERS</h5>
        <button align='right'
        disabled={currentUserrole==="operator" || currentUserrole==="staff" ? true : false}
        onClick={navigateToCreatePage} 
        className="btn btn-success">Create</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         <button align='right'
        disabled={currentUserrole==="operator" || currentUserrole==="staff" ? true : false}
        onClick={navigateToHrfPage} 
        className="btn btn-success">HRF</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button align='right'
        disabled={currentUserrole==="operator" || currentUserrole==="staff" ? true : false}
        onClick={navigateToPopropertiesPage} 
        className="btn btn-success">Properties</button>
        <DataGrid rows={userDataRows} columns={userDataColumns} pageSize={10} components={{ Toolbar: CustomToolbar }}/>
       
      </div>
      </div>

    </>
  );
};

export default Podatagrid;