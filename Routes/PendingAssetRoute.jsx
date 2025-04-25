// routes/verify.js
const express = require("express");
const router = express.Router();
const AssetRegisterDetails = require("../Module/AssetRegisterModule.jsx");
const PendingAssetRegisterDetails = require("../Module/PendingAssetRegisterDetails.jsx");

// POST to verify and move asset
router.post("/verifyAsset/:id", async (req, res) => {
  try {
    const asset = await AssetRegisterDetails.findById(req.params.id);
    if (!asset) return res.status(404).json({ message: "Asset not found" });

    const verifiedAsset = new PendingAssetRegisterDetails(asset.toObject());
    await verifiedAsset.save();
    await AssetRegisterDetails.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Asset verified successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post("/", async (req, res) => {
  const { name,
    company,
    department,
    mainCategory,
    type,
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
    assetUpdateDate,
    serialNumber,
    trackingId,
    specialNote, 
    computerComponents,} = req.body;

  
  try {
    const newDetails = new PendingAssetRegisterDetails({name,
        company,
        department,
        mainCategory,
        type,
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
        assetUpdateDate,
        serialNumber,
        trackingId,
        specialNote,
        computerComponents});
    const savedAssetDetails = await newDetails.save();
    res.status(201).json({ message: "Asset Details save successfully!", AssetDetails: savedAssetDetails });
  } catch (error) {
    console.error("Error Asset Details save:", error);
    res.status(500).json({ error: "Server error. Unable to save Asset Detailsy." });
  }
});


module.exports = router;
