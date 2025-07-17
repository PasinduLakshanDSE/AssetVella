import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "animate.css";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import AdminNavBar from "./components/Admin/AdminNav/AdminNav";
import DashBoard from "./components/Admin/AdminDashBoard/AdminDashboardPage";
import AddUsersRole from "./components/Admin/AddUserRole/AddUserRole";
//import AssetRegistration from "./components/Admin/AssetRegistration/AssetRegistration";
import CompanyDashBord from "./components/Company/CompanyDashBoard/CompanyDashBoard";
import CompanyNavBar from "./components/Company/CompanyNav/CompanyNav";
import Login from "./components/Login/Login";
import Users from "./components/Admin/Users/Users";
import AssetRegister from "./components/Admin/AssetRegistration/AssetRegister";
import Categorization from "./components/Admin/AssetCategorization/Assetcategorization";

import AssetDetails from "./components/Admin/AssetDetails/AssetDetails";
import QRVIEW from "./components/QRview/QRView";
import TransferForm from "./components/Admin/Transfer/Transfer"
import Contact from "./components/Home/Contact/Contact";
import About from "./components/Home/About/About";
import CompanyAddUsersRole from "./components/Company/ComAddUserRole/ComAddUser";
import ComAssetDetails from "./components/Company/ComAssetDetails/ComAssetDetails";
import ComAssetRegister from "./components/Company/CompanyAssetRegistration/ComAssetRegister";

import ComapnyUsers from "./components/Company/CompanyUsersDetails/CompanyUserDetails";
import ComapnyTransfer from "./components/Company/CompanyAssetTranfer/CompanyAssetTranfer";
import DepartmentNavBar from "./components/Department/DepartmentNav/DepartmentNav";
import DepartmentDashBoard from "./components/Department/DepartmentDashBoard/DepartmentDashBoard";
import DepAssetRegister from "./components/Department/DepAssetRegister/DepAssetRegister";

import DepAssetDetails from "./components/Department/DepAssetDetails/DepAssetDetails";
import DepartmentTransfer from "./components/Department/DepAssetTranfer/DepAssetTranfer";
//import DepartmentAddUsersRole from "./components/Department/DepartmentAddUser/DepAddUser";

//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Users from "./components/Users/Users";
import Report from "./components/Report/Report";
import AuditDashBoard from "./components/Audit/AuditDashboard/AuditDashBoard";
import AuditNavBar from "./components/Audit/AuditNavBar/AuditNavBar";

import PendingAssetDetails from "./components/Admin/PendingRegisterAsset/PendingRegisterAsset";
import PendingAsset from "./components/Audit/PendingAsset/PendingAsset";
import PendingDiscardAsset from "./components/Admin/PendingDiscardItem/PendingDiscard";
import PendingDiscardItem from "./components/Audit/PendingDiscardItem/PendingDiscardItem";
import TransferReport from "./components/Admin/TransferReport/TransferReport";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <div className="App">
      <Routes>
       
     <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/QRview/:trackingId" element={<QRVIEW />} />

        {/* Protected Routes - One by One */}
        <Route path="/AdminNavBar" element={<ProtectedRoute><AdminNavBar /></ProtectedRoute>} />
        <Route path="/AdminDashboardPage" element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
        <Route path="/UsersRole" element={<ProtectedRoute><AddUsersRole /></ProtectedRoute>} />
        <Route path="/CompanyDashBord" element={<ProtectedRoute><CompanyDashBord /></ProtectedRoute>} />
        <Route path="/CompanyNavBar" element={<ProtectedRoute><CompanyNavBar /></ProtectedRoute>} />
        <Route path="/Users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="/AssetRegister" element={<ProtectedRoute><AssetRegister /></ProtectedRoute>} />
        <Route path="/category" element={<ProtectedRoute><Categorization /></ProtectedRoute>} />
        <Route path="/AssetDetails" element={<ProtectedRoute><AssetDetails /></ProtectedRoute>} />
        <Route path="/transfer-form" element={<ProtectedRoute><TransferForm /></ProtectedRoute>} />
        <Route path="/companyUserRole" element={<ProtectedRoute><CompanyAddUsersRole /></ProtectedRoute>} />
        <Route path="/Comasset" element={<ProtectedRoute><ComAssetDetails /></ProtectedRoute>} />
        <Route path="/ComapnyAssetRegister" element={<ProtectedRoute><ComAssetRegister /></ProtectedRoute>} />
        <Route path="/CompanyUsers" element={<ProtectedRoute><ComapnyUsers /></ProtectedRoute>} />
        <Route path="/CompanyAssetTranfer" element={<ProtectedRoute><ComapnyTransfer /></ProtectedRoute>} />
        <Route path="/DepartmentNav" element={<ProtectedRoute><DepartmentNavBar /></ProtectedRoute>} />
        <Route path="/DepartmentDashBoard" element={<ProtectedRoute><DepartmentDashBoard /></ProtectedRoute>} />
        <Route path="/DepartmentAssetRegister" element={<ProtectedRoute><DepAssetRegister /></ProtectedRoute>} />
        <Route path="/DepartmentAssetDetails" element={<ProtectedRoute><DepAssetDetails /></ProtectedRoute>} />
        <Route path="/DepartmnetAssetTranfer" element={<ProtectedRoute><DepartmentTransfer /></ProtectedRoute>} />
        <Route path="/GetReport" element={<ProtectedRoute><Report /></ProtectedRoute>} />
        <Route path="/AuditDashBoard" element={<ProtectedRoute><AuditDashBoard /></ProtectedRoute>} />
        <Route path="/AuditNavBar" element={<ProtectedRoute><AuditNavBar /></ProtectedRoute>} />
        <Route path="/pendingRegisterasset" element={<ProtectedRoute><PendingAssetDetails /></ProtectedRoute>} />
        <Route path="/PendingAsset" element={<ProtectedRoute><PendingAsset /></ProtectedRoute>} />
        <Route path="/PendingDiscardAsset" element={<ProtectedRoute><PendingDiscardAsset /></ProtectedRoute>} />
        <Route path="/PendingDiscardItem" element={<ProtectedRoute><PendingDiscardItem /></ProtectedRoute>} />
        <Route path="/TransferAssetReport" element={<ProtectedRoute><TransferReport /></ProtectedRoute>} />
      </Routes>
    </div>
   
  );
}

export default App;
