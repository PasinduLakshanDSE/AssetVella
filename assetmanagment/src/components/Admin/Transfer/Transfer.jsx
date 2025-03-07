import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { QRCode } from "react-qrcode-logo";
import "./transfer.css";
import axios from "axios";

const Transfer = () => {
  const location = useLocation();
  const asset = location.state?.asset; // Get asset details from navigation state
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const [name, setName] = useState(user?.username || "");
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const [assetUserName, setUserName] = useState("");
  const [assetUpdateDate, setAssetUpdateDate] = useState("");
  const [specialNote, setSpecialNote] = useState("");

  const [qrCodeData, setQrCodeData] = useState([]); // State to store QR codes

  const qrCodeContainerRef = useRef(null); // Reference for QR code container

  const companies = [
    "Vella",
    "98 Acers",
    "Ravana Pool Club",
    "Flying Ravana",
    "Le Maas Tota",
    "Tea Factory",
    "Walaa kulu",
    "kiri kopi",
  ];
  const departments = [
    "ICT",

    "HR",
    "Kitchen",
    "Front Office",
    "Store",
    "Account",
    "Audit",
  ];


 
  // Function to generate tracking ID
  const generateTrackingId = (serialNumber) => {
    const companyCodes = {
      Vella: "VE",
      "98 Acers": "98",
      "Ravana Pool Club": "RPC",
      "Flying Ravana": "FR",
      "Le Maas Tota": "LMT",
      "Tea Factory": "TF",
      "Walaa kulu": "WK",
      "kiri kopi": "KK",
    };
    const departmentCodes = {
      ICT: "IT",
      HR: "HR",
      Kitchen: "KT",
      Store: "ST",
      "Front Office": "FO",
      Account: "AC",
      Audit: "AU",
    };

    const companyCode = companyCodes[company] || "XX";
    const departmentCode = departmentCodes[department] || "XX";
    const serialSuffix =
      asset?.mainCategory === "Electronic items" && serialNumber
        ? serialNumber.slice(-4)
        : "";

    const randomNum = `${new Date()
      .toISOString()
      .slice(2, 10)
      .replace(/-/g, "")
      .slice(0, 6)}${String(Math.floor(Math.random() * 100)).padStart(2, "0")}`

    return serialNumber
      ? `${companyCode}-${departmentCode}-${serialSuffix}`
      : `${companyCode}-${departmentCode}-${randomNum}`;
  };

  // Function to generate QR code data
  const generateQRCode = () => {
    if (!company || !department) {
      alert("Please select both company and department.");
      return;
    }
  
    const trackingId = generateTrackingId(asset?.serialNumber); // Generate tracking ID first
    const youtubeURL = `http://localhost:3000/QRView/${trackingId}`; // Now use trackingId
  
    setQrCodeData([{ component: asset?.assetName, qrData: youtubeURL, trackingId }]);
  };
  
  // Remove this line
// useEffect(() => { fetchUsers(); }, []);

const handleUpdate = async () => {
  if (!company || !department) {
    alert("Please select both company and department.");
    return;
  }

  const updatedAsset = {
    ...asset,
    company,
    department,
    assetUserName,
    assetUpdateDate,
    specialNote,
    trackingId: qrCodeData[0]?.trackingId, // Update tracking ID
  };

  try {
    const response = await axios.put(
      `http://localhost:8000/api/AssetRegisterDetails/updateAsset/${asset._id}`,
      updatedAsset
    );
    if (response.status === 200) {
      alert("Asset transferred successfully!");
    }
  } catch (error) {
    console.error("Error transferring asset:", error);
    alert("An error occurred while transferring the asset.");
  }
};

  

  // Function to handle QR code download
  const handleDownloadQR = (index) => {
    const canvas = qrCodeContainerRef.current.getElementsByTagName("canvas")[index];
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `QR_Code_${qrCodeData[index].trackingId}.png`;
    link.click();
  };

  return (
    <div className="transfer-container">
      <h2 className="trnshead">Transfer Asset</h2>
      <form className="transfer-form">
        <div className="form-group">
          <label className="l1">Transfer Name:</label>
          <input
            className="in1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Name"
            readOnly={Boolean(user)}
          />
        </div>

        <div className="form-group">
          <label className="l1">Category:</label>
          <input className="in1" type="text" value={asset?.mainCategory || ""} readOnly />
        </div>

        <div className="form-group">
          <label className="l1">Type:</label>
          <input className="in1" type="text" value={asset?.type || ""} readOnly />
        </div>

        <div className="form-group">
          <label className="l1">Asset Name/Brand:</label>
          <input className="in1" type="text" value={asset?.assetName || ""} readOnly />
        </div>

        <div className="form-group">
          <label className="l1">Serial Number:</label>
          <input className="in1" type="text" value={asset?.serialNumber || ""} readOnly />
        </div>

        <div className="form-group">
          <label className="l1">Model Number:</label>
          <input className="in1" type="text" value={asset?.assetModel || ""} readOnly />
        </div>

        <div className="form-group">
          <select value={company} onChange={(e) => setCompany(e.target.value)}>
            <option value="">Select Transfer Company</option>
            {companies.map((com) => (
              <option key={com} value={com}>
                {com}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <select value={department} onChange={(e) => setDepartment(e.target.value)}>
            <option value="">Select Department</option>
            {departments.map((dep) => (
              <option key={dep} value={dep}>
                {dep}
              </option>
            ))}
          </select>
        </div>
        <input
                type="text"
                value={assetUserName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="User Name"
              />
        <input
            className="dat"
            type="date"
            value={assetUpdateDate}
            onChange={(e) => setAssetUpdateDate(e.target.value)}
          />
          <input
            type="text"
            value={specialNote}
            onChange={(e) => setSpecialNote(e.target.value)}
            placeholder="Enter Special Note (Optional)"
          />

        <button type="button" className="transfer-button" onClick={generateQRCode}>
          Generate QR Code
        </button>

        <div ref={qrCodeContainerRef}>
          {qrCodeData.map((item, index) => (
            <div key={index} className="combined-qr-container">
              <div className="qr-code">
                
                <QRCode value={item.qrData} size={100} />
                <p className="tid">{item.trackingId}</p>
              </div>
              <button className="button2 download-btn" onClick={() => handleDownloadQR(index)}>
                <i className="fas fa-download"></i>
              </button>
            </div>
          ))}
        </div>

        <button type="button" onClick={handleUpdate} className="transfer-button">
  Transfer
</button>

      </form>
    </div>
  );
};

export default Transfer;
