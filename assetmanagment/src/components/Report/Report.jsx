import React, { useState, useEffect } from "react";
import axios from "axios";
import "./report.css";
import { Link } from "react-router-dom";
import * as XLSX from 'xlsx';  // Import xlsx library

const Report = () => {
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [type, setType] = useState("");
  const [selectedComputerComponent, setSelectedComputerComponent] = useState("");
  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [allTypes, setAllTypes] = useState({});
  const [computerComponentOptions, setComputerComponentOptions] = useState([]);
  const [assetRegisterDetails, setAssetRegisterDetails] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/AssetRegisterDetails/getAssetDetails");
      setAssetRegisterDetails(response.data);

      // Extract unique values
      const uniqueCompanies = [...new Set(response.data.map(asset => asset.company))];
      const uniqueDepartments = [...new Set(response.data.map(asset => asset.department))];
      const uniqueCategories = [...new Set(response.data.map(asset => asset.mainCategory))];
      const uniqueComponents = [...new Set(response.data.map(asset => asset.computerComponents))].filter(Boolean); // Ensure no empty values

      setCompanies(uniqueCompanies);
      setDepartments(uniqueDepartments);
      setMainCategories(uniqueCategories);
      setComputerComponentOptions(uniqueComponents);

      // Group types by category
      const groupedTypes = response.data.reduce((acc, asset) => {
        if (!acc[asset.mainCategory]) {
          acc[asset.mainCategory] = new Set();
        }
        acc[asset.mainCategory].add(asset.type);
        return acc;
      }, {});

      setAllTypes(groupedTypes);
    } catch (error) {
      console.error("Error fetching asset details:", error);
    }
  };

  useEffect(() => {
    filterAssets();
  }, [company, department, mainCategory, type, selectedComputerComponent]);

  useEffect(() => {
    // Update types dropdown when category changes
    setTypes(mainCategory ? [...(allTypes[mainCategory] || [])] : []);
    setType(""); // Reset type selection
  }, [mainCategory]);

  const filterAssets = () => {
    let filtered = assetRegisterDetails;

    if (company) filtered = filtered.filter(asset => asset.company === company);
    if (department) filtered = filtered.filter(asset => asset.department === department);
    if (mainCategory) filtered = filtered.filter(asset => asset.mainCategory === mainCategory);
    if (type) filtered = filtered.filter(asset => asset.type === type);
    if (selectedComputerComponent) filtered = filtered.filter(asset => asset.computerComponents === selectedComputerComponent);

    setFilteredAssets(filtered);
  };

  // Function to download the filtered assets as Excel
  const downloadExcel = () => {
    if (filteredAssets.length === 0) {
      alert("No data available for download.");
      return;
    }
  
    // Define column headers
    const headers = [
      "Registered Name", "Company", "Department", "Category", "Type", "Components", 
      "Asset Name", "User Name", "Model", "Register Date", "Serial Number", 
      "Tracking ID"
    ];
  
    // Map data to match column headers
    const data = filteredAssets.map(asset => ({
      "Registered Name": asset.name,
      "Company": asset.company,
      "Department": asset.department,
      "Category": asset.mainCategory,
      "Type": asset.type,
      "Components": asset.computerComponents,
      "Asset Name": asset.assetName,
      "User Name": asset.assetUserName,
      "Model": asset.assetModel,
      "Register Date": asset.assetUpdateDate,
      "Serial Number": asset.serialNumber,
      "Tracking ID": asset.trackingId,
      
    }));
  
    // Create worksheet with headers
    const ws = XLSX.utils.json_to_sheet(data, { header: headers, skipHeader: false });
  
    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Filtered Assets");
  
    // Save file
    XLSX.writeFile(wb, "Filtered_Asset_Report.xlsx");
  };
  

  return (
    <div>
      <h1 className="assethead"style={{ marginTop: "20px" }}>Download Report</h1>
      <p>
        <Link to="/AdminDashboardPage">Dashboard</Link> / <Link to="/GetReport">Report Details</Link>
      </p>

      {/* Filters Section */}
      <div className="filters">
        <select value={company} onChange={(e) => setCompany(e.target.value)}>
          <option value="">Select Company</option>
          {companies.map((com, index) => (
            <option key={index} value={com}>{com}</option>
          ))}
        </select>

        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">Select Department</option>
          {departments.map((dep, index) => (
            <option key={index} value={dep}>{dep}</option>
          ))}
        </select>

        <select value={mainCategory} onChange={(e) => setMainCategory(e.target.value)}>
          <option value="">Select Category</option>
          {mainCategories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>

        {mainCategory && (
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select Type</option>
            {types.map((t, index) => (
              <option key={index} value={t}>{t}</option>
            ))}
          </select>
        )}

        {type && (
          <select value={selectedComputerComponent} onChange={(e) => setSelectedComputerComponent(e.target.value)}>
            <option value="">Select Computer Component</option>
            {computerComponentOptions.map((Ccom, index) => (
              <option key={index} value={Ccom}>{Ccom}</option>
            ))}
          </select>
        )}
      </div>
      
      <div className="download-container">
  <button onClick={downloadExcel} className="download-btn1">Report <i className="fas fa-download"></i></button>
</div>

      {/* Display Filtered Results */}
      {filteredAssets.length > 0 ? (
        <div>
          
          <table className="asset-table">
            <thead>
              <tr>
                <th>Registered Name</th>
                <th>Company</th>
                <th>Department</th>
                <th>Category</th>
                <th>Type</th>
                <th>Asset Name</th>
                <th>User Name</th>
                <th>Model</th>
                <th>Register Date</th>
                <th>Serial Number</th>
                <th>Tracking ID</th>
                <th>Components</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset, index) => (
                <tr key={index}>
                  <td>{asset.name}</td>
                  <td>{asset.company}</td>
                  <td>{asset.department}</td>
                  <td>{asset.mainCategory}</td>
                  <td>{asset.type}</td>
                  <td>{asset.assetName}</td>
                  <td>{asset.assetUserName}</td>
                  <td>{asset.assetModel}</td>
                  <td>{asset.assetUpdateDate}</td>
                  <td>{asset.serialNumber}</td>
                  <td>{asset.trackingId}</td>
                  <td>{asset.computerComponents}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No matching assets found.</p>
      )}
    </div>
  );
};

export default Report;
