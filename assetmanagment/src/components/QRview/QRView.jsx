import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./QRView.css";

const QRVIEW = () => {
  const { trackingId } = useParams(); // Get tracking ID from URL
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQRData = async () => {
      try {
        console.log(`Fetching data for Tracking ID: ${trackingId}`); // ✅ Debugging log
        const response = await axios.get(`http://localhost:8000/api/AssetRegisterDetails/${trackingId}`);

        if (response.data) {
          setQrData(response.data);
        } else {
          console.error("No asset data found.");
        }
      } catch (error) {
        console.error("Error fetching QR data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQRData();
  }, [trackingId]);

  return (
    <div className="MainView">
      <div className="View">
        <h1 className="headQR">Scanned QR Data</h1>
        {loading ? (
          <p>Loading QR Data...</p>
        ) : qrData ? (
          <div>
            <p><strong>Asset Name:</strong> {qrData.assetName}</p>
            <p><strong>Tracking ID:</strong> {qrData.trackingId}</p>
            <p><strong>Company:</strong> {qrData.company}</p>
            <p><strong>Department:</strong> {qrData.department}</p>
            <p><strong>Main Category:</strong> {qrData.mainCategory}</p>
            <p><strong>Asset Model:</strong> {qrData.assetModel}</p>
            <p><strong>Serial Number:</strong> {qrData.serialNumber}</p>
            <p><strong>Special Note:</strong> {qrData.specialNote}</p>
          </div>
        ) : (
          <p>No data found for this Tracking ID.</p>
        )}
      </div>
    </div>
  );
};

export default QRVIEW;
