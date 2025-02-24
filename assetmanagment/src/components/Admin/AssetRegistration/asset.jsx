import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AssetRegister = () => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [type, setType] = useState("");
  const [customType, setCustomType] = useState("");
  const [assetName, setAssetName] = useState("");
  const [assetModel, setAssetModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [assetUpdateDate, setAssetUpdateDate] = useState("");
  const [specialNote, setSpecialNote] = useState("");

  const handleSubmit = () => {
    console.log("Form Submitted");
  };

  return (
    <div className="container mt-4">
      <div className="card p-4">
        <h2 className="text-center mb-4">Asset Registration</h2>
        <div className="row">
          {/* First Column */}
          <div className="col-md-6">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
              />
            </div>

            <div className="mb-3">
              <select
                className="form-select"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              >
                <option value="">Select Company</option>
                {/* Add company options dynamically */}
              </select>
            </div>

            <div className="mb-3">
              <select
                className="form-select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                {/* Add department options dynamically */}
              </select>
            </div>

            <div className="mb-3">
              <select
                className="form-select"
                value={mainCategory}
                onChange={(e) => setMainCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {/* Add categories dynamically */}
              </select>
            </div>
          </div>

          {/* Second Column */}
          <div className="col-md-6">
            <div className="mb-3">
              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Select Type</option>
                {/* Add types dynamically */}
              </select>
            </div>

            {type === "Other" && (
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={customType}
                  onChange={(e) => setCustomType(e.target.value)}
                  placeholder="Enter Custom Type"
                />
              </div>
            )}

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
                placeholder="Enter Asset Name / Brand"
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={assetModel}
                onChange={(e) => setAssetModel(e.target.value)}
                placeholder="Enter Asset Model"
              />
            </div>

            <div className="mb-3">
              <input
                type="date"
                className="form-control"
                value={assetUpdateDate}
                onChange={(e) => setAssetUpdateDate(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                placeholder="Enter Special Note (Optional)"
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetRegister;
