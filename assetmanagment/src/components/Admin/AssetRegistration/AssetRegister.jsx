import React, { useState, useRef, useEffect } from "react";
import { QRCode } from "react-qrcode-logo";
import html2canvas from "html2canvas";
import "./assetRegister.css";
import axios from "axios";
import { model } from "mongoose";
import "bootstrap/dist/css/bootstrap.min.css";

const AssetRegister = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const [name, setName] = useState(user?.username || "");
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [type, setType] = useState("");
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [assetName, setAssetName] = useState("");
  const [CPUassetName, setCPUAssetName] = useState("");
  const [MoniterassetName, setMoniterAssetName] = useState("");
  const [MouseassetName, setMouseAssetName] = useState("");
  const [KeyboardassetName, setKeyboardAssetName] = useState("");
  const [assetUpdateDate, setAssetUpdateDate] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [CPUserialNumber, setCPUSerialNumber] = useState("");
  const [MoniterserialNumber, setMoniterSerialNumber] = useState("");
  const [MouseserialNumber, setMouseSerialNumber] = useState("");
  const [KeyboardserialNumber, setKeyboardSerialNumber] = useState("");

  const [qrCodeData, setQrCodeData] = useState(null);
  const [trackingId, setTrackingId] = useState("");
  const [specialNote, setSpecialNote] = useState("");
  const [customType, setCustomType] = useState("");
  const [CPUassetModel, setCPUAssetModel] = useState("");
  const [MoniterassetModel, setMoniterAssetModel] = useState("");
  const [MouseassetModel, setMouseAssetModel] = useState("");
  const [KeyboardassetModel, setKeyboardAssetModel] = useState("");
  const [assetModel, setAssetModel] = useState("");
  const [assetUserName, setUserName] = useState("");
  


  const [computerComponents, setComputerComponents] = useState("");
  //const [isQRGenerated, setIsQRGenerated] = useState(false);


  const qrCodeContainerRef = useRef();

  const mainCategories = [
    "Electronic items",
    "Laundry & Linen",
    "Housekeeping Supplies",
    "Electrical items",
    "Security & Safety",
    "Furniture",
    "Outdoor & Garden Equipment",
    "Stationery",
  ];

  const companies = ["Vella", "98 Acers", "Ravana Pool Club", "Flying Ravana", "Le Maas Tota", "Tea Factory","Walaa kulu","kiri kopi"];
  const departments = ["ICT", "HR", "Kitchen", "Front Office", "Store", "Account", "Audit"];

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (mainCategory) filterTypes();
    else setTypes([]);
  }, [mainCategory, categories]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/categories/getCategory");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const filterTypes = () => {
    const filtered = categories
      .filter((category) => category.category === mainCategory)
      .map((category) => category.types)
      .flat();
    setTypes(filtered);
  };

  const generateTrackingId = (serialNumber) => {
    const companyCodes = { Vella: "VE", "98 Acers": "98", "Ravana Pool Club": "RPC", "Flying Ravana": "FR", "Le Maas Tota": "LMT", "Tea Factory": "TF" , "Walaa kulu": "WK","kiri kopi":"KK"};
    const departmentCodes = { ICT: "IT", HR: "HR", Kitchen: "KT", Store: "ST", "Front Office": "FO", Account: "AC", Audit: "AU" };

    const companyCode = companyCodes[company] || "XX";
    const departmentCode = departmentCodes[department] || "XX";
    const serialSuffix = mainCategory === "Electronic items" && serialNumber ? serialNumber.slice(-4) : "";

    




    const randomNum = `${new Date().toISOString().slice(2, 10).replace(/-/g, "").slice(0, 6)}${String(Math.floor(Math.random() * 100)).padStart(2, "0")}`


    return serialNumber ? `${companyCode}-${departmentCode}-${serialSuffix}` : `${companyCode}-${departmentCode}-${randomNum}`;
  };

  const handleComponentChange = (e) => {
    const value = e.target.value;
    if (value === "fullSet") {
      setComputerComponents("fullSet");
    } else {
      setComputerComponents(value);
    }
  };

  const handleGenerateQR = () => {
    if (!name || !company || !department || !mainCategory) {
      alert("Please fill in all fields before generating the QR code.");
      return;
    }

    let qrDataArray = [];

    if (computerComponents === "fullSet") {
      const items = [
        { asset: CPUassetName, serial: CPUserialNumber, model: CPUassetModel, label: "CPU" },
        { asset: MoniterassetName, serial: MoniterserialNumber, model: MoniterassetModel, label: "Monitor" },
        { asset: MouseassetName, serial: MouseserialNumber, model: MouseassetModel, label: "Mouse" },
        { asset: KeyboardassetName, serial: KeyboardserialNumber, model: KeyboardassetModel, label: "Keyboard" }
      ];

      items.forEach((item) => {
        if (item.asset) {
          const id = generateTrackingId(item.serial); // Generate a unique tracking ID
          const qrData= `http://localhost:3000/QRView/${id}`;

          //const qrData= `http://localhost:3000/QRView/${id}`;
         

          qrDataArray.push({ qrData, trackingId: id, component: item.label });
          //setIsQRGenerated(true); // Update state to show checkmark
        }
      });

    } else {
      // Normal QR generation
      const id = generateTrackingId(serialNumber);
      /*const qrData = JSON.stringify({
        name,
        company,
        department,
        mainCategory,
        assetName,
        type,
        assetUpdateDate,
        serialNumber,
        trackingId: id,
        assetModel,
        specialNote,
      });*/
      const qrData= `http://localhost:3000/QRView/${id}`;
      qrDataArray.push({ qrData, trackingId: id });
    }

    setQrCodeData(qrDataArray);
  };



  useEffect(() => {
    if (trackingId) {
      const qrData = JSON.stringify({
        name,
        company,
        department,
        mainCategory,
        assetName,
        CPUassetName,
        MoniterassetName,
        MouseassetName,
        KeyboardassetName,
        CPUassetModel,
        MoniterassetModel,
        MouseassetModel,
        KeyboardassetModel,
        assetModel,
        assetUserName,
        type: type === "Other" ? customType : type,
        assetUpdateDate,
        serialNumber: mainCategory === "Electronic items" ? serialNumber : null,
        trackingId,
        computerComponents,
        specialNote,
      });
      setQrCodeData(qrData);
    }
  }, [trackingId]);



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


  const handleSubmit = async () => {
    if (!name || !company || !department || !mainCategory || !assetUpdateDate || !type) {
      alert("Please fill in all required fields before submitting.");
      return;
    }
  
    try {
      if (computerComponents === "fullSet") {

        const components = [
          { assetName: CPUassetName, serialNumber: CPUserialNumber, model: CPUassetModel, label: "CPU" },
          { assetName: MoniterassetName, serialNumber: MoniterserialNumber, model: MoniterassetModel, label: "Monitor" },
          { assetName: MouseassetName, serialNumber: MouseserialNumber, model: MouseassetModel, label: "Mouse" },
          { assetName: KeyboardassetName, serialNumber: KeyboardserialNumber, model: KeyboardassetModel, label: "Keyboard" },
        ];




        for (const component of components) {
          if (component.assetName) {
            const id = generateTrackingId(component.serialNumber);
            const assetData = {
              name,
              company,
              department,
              mainCategory,
              type: type === "Other" ? customType : type,
              assetUserName, 
              assetName: component.assetName,
              assetModel: component.model,
              assetUpdateDate,
              serialNumber: component.serialNumber || null,
              trackingId: id,
              specialNote,
              computerComponents: component.label, // Label component type
            };
  
          await axios.post("http://localhost:8000/api/AssetRegisterDetails", assetData);
        }}
      } else {
        const assetData = {
          name,
          company,
          department,
          mainCategory,
          type: type === "Other" ? customType : type,
          assetName,
          assetModel,
          assetUserName,
          assetUpdateDate,
          serialNumber: mainCategory === "Electronic items" ? serialNumber : null,
          trackingId: qrCodeData[0]?.trackingId, // Use tracking ID from QR data
          specialNote,
          computerComponents,
        };
  
        await axios.post("http://localhost:8000/api/AssetRegisterDetails", assetData);
      }
  
      alert("Assets submitted successfully!");
      resetForm();
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error creating asset. Please try again.");
    }
  };
  





  // Function to reset form after submission
  const resetForm = () => {
    setCompany("");
    setDepartment("");
    setMainCategory("");
    setType("");
    setAssetName("");
    setCPUAssetName("");
    setMoniterAssetName("");
    setMouseAssetName("");
    setKeyboardAssetName("");
    setAssetUpdateDate("");
    setSerialNumber("");
    setQrCodeData(null);
    setTrackingId("");
    setSpecialNote("");
    setCustomType("");
    setComputerComponents("");
    setCPUSerialNumber("");
    setMoniterSerialNumber("");
    setMouseSerialNumber("");
    setKeyboardSerialNumber("");
    setCPUAssetModel("");
    setMoniterAssetModel("");
    setMouseAssetModel("");
    setKeyboardAssetModel("");
    setAssetModel("");
    setUserName("");

  };

  return (
    <div className="asset-register">
      <div className="form-container">
        <h2 className="registerhead">Asset Registration</h2>
        <div className="input-box ">




          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Name"
            readOnly={Boolean(user)}
          />
          <div className="row">
            <div className="col-md-6">

              <select value={company} onChange={(e) => setCompany(e.target.value)}>
                <option value="">Select Company</option>
                {companies.map((com) => (
                  <option key={com} value={com}>{com}</option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <select value={department} onChange={(e) => setDepartment(e.target.value)}>
                <option value="">Select Department</option>
                {departments.map((dep) => (
                  <option key={dep} value={dep}>{dep}</option>
                ))}
              </select>
            </div>



            <div className="col-md-6">

              <select value={mainCategory} onChange={(e) => setMainCategory(e.target.value)}>
                <option value="">Select Category</option>
                {mainCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>


            {mainCategory && (
              <div className="col-md-6">
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="">Select Type</option>
                  {types.map((t, index) => (
                    <option key={index} value={t}>{t}</option>

                  ))}
                  <option value="Other">Other</option>
                </select></div>
            )}
          </div>
          {type === "Other" && (
            <div className="mb-3">
              <input
                type="text"
                value={customType}
                onChange={(e) => setCustomType(e.target.value)}
                placeholder="Enter Custom Type"
              /></div>
          )}

          {type === "Computer" && (
            <div className="computer-options">

              <label className="l">
                <input
                  type="radio"
                  name="computerComponent"
                  value="fullSet"
                  onChange={handleComponentChange}
                  checked={computerComponents === "fullSet"}
                /> Full Set
              </label>

              {/* Show full set components only if "Full Set" is selected */}
              {computerComponents === "fullSet" && (
                <div className="fullset-components row">
                  <div className="col-md-6">
                    <label className="l">
                      <input type="checkbox" checked readOnly /> CPU
                      <input
                        type="text"
                        value={CPUassetName}
                        onChange={(e) => setCPUAssetName(e.target.value)}
                        placeholder="Enter Asset Name"
                      />
                      <input
                        type="text"
                        value={CPUassetModel}
                        onChange={(e) => setCPUAssetModel(e.target.value)}
                        placeholder="Enter Asset Model Number"
                      />

                      <input
                        type="text"
                        value={CPUserialNumber}
                        onChange={(e) => setCPUSerialNumber(e.target.value)}
                        placeholder="Enter Serial Number"
                      />
                    </label>
                    <div className="button-group">
                    <button className="button generate-btn" onClick={handleGenerateQR}> QR</button>
                      
                      {/*{!isQRGenerated ? (
        <button className="button generate-btn" onClick={handleGenerateQR}>
          QR
        </button>
      ) : (setIsQRGenerated(false),
        <span className="checkmark"><i class="fa-regular fa-circle-check si2"></i></span>
         // Show checkmark after clicking QR button
      )}*/}
                    </div>
                  </div>


                  <div className="col-md-6">
                    <label className="l">
                      <input type="checkbox" checked readOnly /> Monitor<input
                        type="text"
                        value={MoniterassetName}
                        onChange={(e) => setMoniterAssetName(e.target.value)}
                        placeholder="Enter Asset Name"
                      />
                      <input
                        type="text"
                        value={MoniterassetModel}
                        onChange={(e) => setMoniterAssetModel(e.target.value)}
                        placeholder="Enter Asset Model Number"
                      />
                      <input
                        type="text"
                        value={MoniterserialNumber}
                        onChange={(e) => setMoniterSerialNumber(e.target.value)}
                        placeholder="Enter Serial Number"
                      />
                    </label>
                    <div className="button-group">
                      <button className="button generate-btn" onClick={handleGenerateQR}> QR</button>
                    </div></div>


                  <div className="col-md-6">
                    <label className="l">
                      <input type="checkbox" checked readOnly /> Mouse <input
                        type="text"
                        value={MouseassetName}
                        onChange={(e) => setMouseAssetName(e.target.value)}
                        placeholder="Enter Asset Name"
                      />
                      <input
                        type="text"
                        value={MouseassetModel}
                        onChange={(e) => setMouseAssetModel(e.target.value)}
                        placeholder="Enter Asset Model Number"
                      />
                      <input
                        type="text"
                        value={MouseserialNumber}
                        onChange={(e) => setMouseSerialNumber(e.target.value)}
                        placeholder="Enter Serial Number"
                      />
                    </label><div className="button-group">
                      <button className="button generate-btn" onClick={handleGenerateQR}>QR</button>
                    </div></div>

                  <div className="col-md-6">
                    <label className="l">
                      <input type="checkbox" checked readOnly /> Keyboard <input
                        type="text"
                        value={KeyboardassetName}
                        onChange={(e) => setKeyboardAssetName(e.target.value)}
                        placeholder="Enter Asset Name"
                      />
                      <input
                        type="text"
                        value={KeyboardassetModel}
                        onChange={(e) => setKeyboardAssetModel(e.target.value)}
                        placeholder="Enter Asset Model Number"
                      />
                      <input
                        type="text"
                        value={KeyboardserialNumber}
                        onChange={(e) => setKeyboardSerialNumber(e.target.value)}
                        placeholder="Enter Serial Number"
                      />
                    </label>
                    <div className="button-group">
                      <button className="button generate-btn" onClick={handleGenerateQR}> QR</button>
                    </div></div>
                </div>
              )}


              <label className="l">
                <input type="radio" name="computerComponent" value="monitor" onChange={handleComponentChange} checked={computerComponents === "monitor"} /> Monitor
              </label>
              <label className="l">
                <input type="radio" name="computerComponent" value="cpu" onChange={handleComponentChange} checked={computerComponents === "cpu"} /> CPU
              </label>
              <label className="l">
                <input type="radio" name="computerComponent" value="mouse" onChange={handleComponentChange} checked={computerComponents === "mouse"} /> Mouse
              </label>


              <label className="l">
                <input type="radio" name="computerComponent" value="keyboard" onChange={handleComponentChange} checked={computerComponents === "keyboard"} /> Keyboard
              </label>
              <label className="l">
                <input type="radio" name="Ram" value="Ram" onChange={handleComponentChange} checked={computerComponents === "Ram"} /> Ram
              </label>
              <label className="l">
                <input type="radio" name="computerComponent" value="powersupply" onChange={handleComponentChange} checked={computerComponents === "powersupply"} /> Power Supply
              </label>
              <label className="l">
                <input type="radio" name="computerComponent" value="motherboard" onChange={handleComponentChange} checked={computerComponents === "motherboard"} />MotherBoard
              </label>
              <label className="l">
                <input type="radio" name="computerComponent" value="HDD" onChange={handleComponentChange} checked={computerComponents === "HDD"} /> HDD
              </label>
              <label className="l">
                <input type="radio" name="computerComponent" value="SSD" onChange={handleComponentChange} checked={computerComponents === "SSD"} /> SSD
              </label>

            </div>
          )}

<input
                type="text"
                value={assetUserName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="User Name"
              />
          {computerComponents !== "fullSet" && (
            <>
              <input
                type="text"
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
                placeholder="Enter Asset Name / Brand"
              />

              <input
                type="text"
                value={assetModel}
                onChange={(e) => setAssetModel(e.target.value)}
                placeholder="Enter Asset Model Number"
              />
            </>
          )}


          {mainCategory === "Electronic items" && computerComponents != "fullSet" && (
            <input
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              placeholder="Enter Serial Number"
            />
          )}

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

          {computerComponents != "fullSet" && (
            <div className="button-group">
              <button className="button  generate-btn" onClick={handleGenerateQR}>Generate QR</button>
            </div>)}


          {qrCodeData && qrCodeData.length > 0 && (
            <div ref={qrCodeContainerRef}>
              {qrCodeData.map((item, index) => (
                <div key={index} className="combined-qr-container">
                  <div className="qr-code">
                    <h4>{item.component}</h4>
                    <QRCode
                      value={item.qrData}
                      size={100}
                      qrStyle="squares"
                      logoImage="https://via.placeholder.com/30"
                      logoWidth={50}
                    />
                    <p className="tid">{item.trackingId}</p>
                  </div>
                  <button className="button2 download-btn"  onClick={(event) => handleDownloadQR(index, event)}>
                    <i className="fas fa-download"></i>
                  </button>
                  
                </div>

              ))}
              <div>
               <button className="button3" onClick={handleSubmit}>Submit</button></div>
            </div>
          )}




          {trackingId && qrCodeData && (
            <button className="button3" onClick={handleSubmit}>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetRegister;
