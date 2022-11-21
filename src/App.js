import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Productionreport from "./components/Reports/Productionreport";

import Users from "./pages/Users";
import Messages from "./pages/Messages";
import FileManager from "./pages/FileManager";
import Analytics from "./pages/Analytics";
import Order from "./pages/Order";
import Saved from "./pages/Saved";
import Setting from "./pages/Setting";
import Login from "./pages/accounts/Login";
import Create from "./pages/accounts/Create";
import ReadDataGrid from "./pages/accounts/ReadDataGrid";
import Barcreate from "./pages/Barcode/Barcreate";
import Bardatagrid from "./pages/Barcode/Bardatagrid";
import Comcreate from "./pages/Company/Comcreate";
import Comdatagrid from "./pages/Company/Comdatagrid";
import Stockcreate from "./pages/Stock/Stockcreate";
import Stockdatagrid from "./pages/Stock/Stockdatagrid";
import Pocreate from "./pages/Productionorder/Pocreate";
import Podatagrid from "./pages/Productionorder/Podatagrid";
import Pohrf from "./pages/Productionorder/Pohrf";
import Poproperties from "./pages/Productionorder/Poproperties";
import Customercreate from "./pages/Customer/Customercreate";
import Customerdatagrid from "./pages/Customer/Customerdatagrid";
import Cusloccreate from "./pages/CustomerLocation/Cusloccreate";
import Cuslocdatagrid from "./pages/CustomerLocation/Cuslocdatagrid";
import Manucreate from "./pages/manufactlocation/Manucreate";
import Manudatagrid from "./pages/manufactlocation/Manudatagrid";
import Dashboard from "./pages/Dashboard/Dashboard";
import Productcreate from "./pages/Product/Productcreate";
import Productdatagrid from "./pages/Product/Productdatagrid";
import Shippocreate from "./pages/Shippo/Shippocreate";
import Shippodatagrid from "./pages/Shippo/Shippodatagrid";
import Auditcreate from "./pages/Audit/Auditcreate";
import Auditdatagrid from "./pages/Audit/Auditdatagrid";
import Snprovidercreate from "./pages/Snprovider/Snprovidercreate";
import Snproviderdatagrid from "./pages/Snprovider/Snproviderdatagrid";
import Regsystemcreate from "./pages/Registeredsystems/Regsystemcreate";
import Regsystemdatagrid from "./pages/Registeredsystems/Regsystemdatagrid";

// import Navbar from "./components/Navbar";
function App() {
  return (
    <Router>
      <SideBar>
       
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/account/create/:operation" element={<Create />} />
        <Route path="/account/ReadDataGrid" element={<ReadDataGrid/>} />
        <Route path="/barcode/barcreate/:operation" element={<Barcreate />} />
        <Route path="/barcode/bardatagrid" element={<Bardatagrid />} />
        <Route path="/barcode/bardatagrid" element={<Bardatagrid />} />


          <Route path="/company/comdatagrid" element={<Comdatagrid />} />

          <Route path="/company/comcreate/:operation" element={<Comcreate />} />
          <Route path="/po/podatagrid" element={<Podatagrid />} />
          <Route path="/po/pocreate/:operation" element={<Pocreate />} />
          <Route path="/po/pohrfcreate/:operation" element={<Pohrf />} />
          <Route path="/po/poproperties/:operation" element={<Poproperties />} />
          <Route path="/customer/cuscreate/:operation" element={<Customercreate />} />
          <Route path="/customer/cusdatagrid" element={<Customerdatagrid />} />
          <Route path="/customerlocation/cusloccreate/:operation" element={<Cusloccreate />} />
          <Route path="/customerlocation/cuslocdatagrid/" element={<Cuslocdatagrid />} />
          <Route path="/manufacture/manucreate/:operation" element={<Manucreate />} />
          <Route path="/manufacture/manudatagrid" element={<Manudatagrid />} />
          <Route path="/dashboard/dashboard" element={<Dashboard />} />
          <Route path="/product/productcreate/:operation" element={<Productcreate />} />
          <Route path="/product/productdatagrid" element={<Productdatagrid />} />
          <Route path="/stock/stockcreate/:operation" element={<Stockcreate />} />
          <Route path="/stock/stockdatagrid/" element={<Stockdatagrid />} />
          <Route path="/report/productionorderreport" element={<Productionreport />} />
          <Route path="/shippo/shippocreate/" element={<Shippocreate />} />
          <Route path="/shippo/shippodatagrid/" element={<Shippodatagrid />} />
          <Route exact path="/audit/auditcreate/:operation" element={<Auditcreate/>}></Route>
          <Route exact path="/audit/auditdatagrid/" element={<Auditdatagrid/>}></Route>
          <Route path="/snprovider/sndatagrid" element={<Snproviderdatagrid/>}></Route> 
          <Route exact path="/snprovider/sncreate/:operation" element={<Snprovidercreate />}></Route>
          <Route path="/regsystem/regsystemdatagrid" element={<Regsystemdatagrid/>}></Route> 
          <Route exact path="/regsystem/regsystemcreate/:operation" element={< Regsystemcreate/>}></Route>



          <Route path="*" element={<> not found</>} />
        </Routes>
      </SideBar>
    </Router>
  );
}

export default App;
