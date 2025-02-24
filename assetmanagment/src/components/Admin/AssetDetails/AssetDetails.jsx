import React, { useEffect, useState } from "react";
import axios from "axios";
import "./assetDetails.css"

const AssetDetails = () => {
    const [AssetRegisterDetails, setAssetRegisterDetails] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");  // First search field
    const [searchQuery1, setSearchQuery1] = useState(""); // Second search field
    const [searchQuery2, setSearchQuery2] = useState(""); // Second search field

    useEffect(() => {
        axios.get("http://localhost:8000/api/AssetRegisterDetails/getAssetDetails")
            .then(response => setAssetRegisterDetails(response.data))
            .catch(error => console.error("Error fetching asset details:", error));
    }, []);

    const filteredAssets = AssetRegisterDetails.filter(asset => {
        const matchesFirstQuery =
            (asset.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (asset.company?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (asset.department?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (asset.mainCategory?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            
            (asset.type?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (asset.assetName?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (asset.assetModel?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (asset.serialNumber?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (asset.trackingId?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            /*(asset.
                computerComponents?.toLowerCase() || "").includes(searchQuery.toLowerCase())*/
            (asset.computerComponents &&
                Object.keys(asset.computerComponents)
                    .some(key => key.toLowerCase().includes(searchQuery.toLowerCase()))
            );

        const matchesSecondQuery =
            (asset.name?.toLowerCase() || "").includes(searchQuery1.toLowerCase()) ||
            (asset.company?.toLowerCase() || "").includes(searchQuery1.toLowerCase()) ||
            (asset.department?.toLowerCase() || "").includes(searchQuery1.toLowerCase()) ||
            (asset.mainCategory?.toLowerCase() || "").includes(searchQuery1.toLowerCase()) ||
            
            (asset.type?.toLowerCase() || "").includes(searchQuery1.toLowerCase()) ||
            (asset.assetName?.toLowerCase() || "").includes(searchQuery1.toLowerCase()) ||
            (asset.assetModel?.toLowerCase() || "").includes(searchQuery1.toLowerCase()) ||
            (asset.serialNumber?.toLowerCase() || "").includes(searchQuery1.toLowerCase()) ||
            /*(asset.trackingId?.toLowerCase() || "").includes(searchQuery1.toLowerCase()) ||(asset.
                computerComponents?.toLowerCase() || "").includes(searchQuery.toLowerCase())*/
            (asset.computerComponents &&
                Object.keys(asset.computerComponents)
                    .some(key => key.toLowerCase().includes(searchQuery1.toLowerCase()))
            );

        const matchesThirdQuery =
            (asset.name?.toLowerCase() || "").includes(searchQuery2.toLowerCase()) ||
            (asset.company?.toLowerCase() || "").includes(searchQuery2.toLowerCase()) ||
            (asset.department?.toLowerCase() || "").includes(searchQuery2.toLowerCase()) ||
            (asset.mainCategory?.toLowerCase() || "").includes(searchQuery2.toLowerCase()) ||
           
            (asset.type?.toLowerCase() || "").includes(searchQuery2.toLowerCase()) ||
            (asset.assetName?.toLowerCase() || "").includes(searchQuery2.toLowerCase()) ||
            (asset.assetModel?.toLowerCase() || "").includes(searchQuery2.toLowerCase()) ||
            (asset.serialNumber?.toLowerCase() || "").includes(searchQuery2.toLowerCase()) ||
            (asset.trackingId?.toLowerCase() || "").includes(searchQuery2.toLowerCase()) ||
            /*(asset.
                computerComponents?.toLowerCase() || "").includes(searchQuery.toLowerCase())*/
            (asset.computerComponents &&
                Object.keys(asset.computerComponents)
                    .some(key => key.toLowerCase().includes(searchQuery2.toLowerCase()))
            );

        // Apply logic: If all fields are filled, all must match; otherwise, match based on input
        if (searchQuery && searchQuery1 && searchQuery2) {
            return matchesFirstQuery && matchesSecondQuery && matchesThirdQuery;
        } else if (searchQuery && searchQuery1) {
            return matchesFirstQuery && matchesSecondQuery;
        } else if (searchQuery && searchQuery2) {
            return matchesFirstQuery && matchesThirdQuery;
        } else if (searchQuery1 && searchQuery2) {
            return matchesSecondQuery && matchesThirdQuery;
        }  else if (searchQuery ) {
            return matchesFirstQuery ;
        } else {
            return matchesFirstQuery || matchesSecondQuery || matchesThirdQuery;
        }
    });



    return (
        <div className="row">
            <div className="col-md-12">
                <h1 className="assethead">Asset Details</h1>
                {/* First Search Input */}
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Search assets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Second Search Input */}
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Search by another parameter..."
                    value={searchQuery1}
                    onChange={(e) => setSearchQuery1(e.target.value)}
                />
                {/* Third Search Input */}
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Search by another parameter..."
                    value={searchQuery2}
                    onChange={(e) => setSearchQuery2(e.target.value)}
                />

                <table className="table table-bordered table-light">
                    <thead className="thead-dark">
                        <tr>
                            <th>Registered Name</th>
                            <th>Company</th>
                            <th>Department</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Asset Name</th>
                            <th>Asset model</th>
                            <th>Asset Register Date</th>
                            <th>Serial Number</th>
                            <th>Tracking ID</th>
                            <th>Special Note</th>
                            <th>Computer Components</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAssets.length > 0 ? (
                            filteredAssets.map((asset) => (
                                <tr key={asset._id}>
                                    <td>{asset.name}</td>
                                    <td>{asset.company}</td>
                                    <td>{asset.department}</td>
                                    <td>{asset.mainCategory}</td>
                                    <td>{asset.type}</td>
                                    <td>{asset.assetName}</td>
                                    <td>{asset.assetModel}</td>
                                    <td>{asset.assetUpdateDate}</td>
                                    <td>{asset.serialNumber}</td>
                                    <td>{asset.trackingId}</td>
                                    
                                    <td>{asset.specialNote}</td>
                                    <td>{asset.computerComponents}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="11" className="text-center">
                                    No matching asset data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssetDetails;
