import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
    
    if (!company || !department ) {
      alert("Please select both company and department.");
      return;
    }

    if (!assetUserName.trim()) {
      alert("Please enter the user name.");
      return;
    }
  
    if (!assetUpdateDate) {
      alert("Please enter the asset transfer date.");
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
        navigate("/AssetDetails");
      }
    } catch (error) {
      console.error("Error transferring asset:", error);
      alert("An error occurred while transferring the asset.");
    }
  };



  // Function to handle QR code download
  const handleDownloadQR = (index, event) => {
    event.preventDefault();
  
    const canvas = qrCodeContainerRef.current.getElementsByTagName("canvas")[index];
    if (!canvas) return;
  
    const qrImage = new Image();
    qrImage.src = canvas.toDataURL("image/png");
  
    qrImage.onload = () => {
      const borderSize = 10; // Border thickness
      const qrSize = 80; // QR code size
      const textHeight = 20; // Space for the tracking ID text
      const width = qrSize + borderSize * 2;
      const height = qrSize + borderSize * 2 + textHeight;
  
      const canvasElement = document.createElement("canvas");
      const ctx = canvasElement.getContext("2d");
  
      canvasElement.width = width;
      canvasElement.height = height;
  
      // Border
      ctx.fillStyle = "#0b4c55"; // Dark teal border color
      ctx.fillRect(0, 0, width, height);
  
      // QR Code background (white)
      ctx.fillStyle = "#ffffff"; // White background inside the border
      ctx.fillRect(borderSize, borderSize, qrSize, qrSize);
  
      // Draw the QR Code
      ctx.drawImage(qrImage, borderSize, borderSize, qrSize, qrSize);
  
      // Add Tracking ID text below QR
      ctx.fillStyle = "#ffffff"; // Black text color
      ctx.font = "bold 10px Arial";
      ctx.textAlign = "center";
      ctx.fillText(qrCodeData[index].trackingId, width / 2, height - 10);
  
      // Download QR code with border
      const link = document.createElement("a");
      link.href = canvasElement.toDataURL("image/png");
      link.download = `QR_Code_${qrCodeData[index].trackingId}.png`;
      link.click();
    };
  };
  
  

  return (
    <div className="transfer-container">
      <h2 className="trnshead">Transfer Asset</h2>
      <form className="transfer-form">
        <div className="row">
          <div className="form-group col-md-4">
            <label className="l1">Transfer Name:</label>
            <input
              className="in1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Name"
              readOnly={Boolean(user)}
            />
          </div>

          <div className="form-group col-md-4">
            <label className="l1">Category:</label>
            <input className="in1" type="text" value={asset?.mainCategory || ""} readOnly />
          </div>

          <div className="form-group col-md-4">
            <label className="l1">Type:</label>
            <input className="in1" type="text" value={asset?.type || ""} readOnly />
          </div></div>
        <div className="row">
          <div className="form-group col-md-4">
            <label className="l1">Asset Name/Brand:</label>
            <input className="in1" type="text" value={asset?.assetName || ""} readOnly />
          </div>

          <div className="form-group col-md-4">
            <label className="l1">Serial Number:</label>
            <input className="in1" type="text" value={asset?.serialNumber || ""} readOnly />
          </div>

          <div className="form-group col-md-4">
            <label className="l1">Model Number:</label>
            <input className="in1" type="text" value={asset?.assetModel || ""} readOnly />
          </div></div>

        <div className="row">
          <div className="form-group col-md-6">
            <select value={company} onChange={(e) => setCompany(e.target.value)}>
              <option value="">Select Transfer Company</option>
              {companies.map((com) => (
                <option key={com} value={com}>
                  {com}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group col-md-6">
            <select value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="">Select Transfer Department</option>
              {departments.map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
          </div></div>
        <input
          className="tIn"
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
          className="tIn"
          type="text"
          value={specialNote}
          onChange={(e) => setSpecialNote(e.target.value)}
          placeholder="Enter Special Note (Optional)"
        />
<div>
        <button type="button" className="button" onClick={generateQRCode}>
          Generate QR 
        </button></div>

        <div ref={qrCodeContainerRef}>
          {qrCodeData.map((item, index) => (
            <div key={index} className="combined-qr-container">
              <div className="qr-code">

                <QRCode value={item.qrData} size={100} />
                <p className="tid">{item.trackingId}</p>
              </div>
              <button className="button2 download-btn" onClick={(e) => handleDownloadQR(index, e)}>
                <i className="fas fa-download"></i>
              </button>

            </div>
          ))}
        </div>
        {qrCodeData.length > 0 && (
  <div>
    <button type="button" onClick={handleUpdate} className="transfer-button">
      Transfer
    </button>
  </div>
)}

      </form>
    </div>
  );
};

export default Transfer;
