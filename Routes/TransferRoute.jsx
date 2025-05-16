const express = require("express");
const router = express.Router();
const PendingTransferAsset = require("../Module/TranferModule.jsx")
const BeforeTransferAsset = require("../Module/BeforeTransferAssetModel.jsx")

router.post("/transfers", async (req, res) => {
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
    assetTransferDate,
    serialNumber,
    trackingId,
    specialNote, 
    computerComponents,} = req.body;

  
  try {
    const newTransferDetails = new PendingTransferAsset({name,
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
        assetTransferDate,
        serialNumber,
        trackingId,
        specialNote,
        computerComponents});
    const savedAssetTransferDetails = await newTransferDetails.save();
    res.status(201).json({ message: "Asset Transfer successfully!", AssetDetails: savedAssetTransferDetails });
  } catch (error) {
    console.error("Error Asset Transfers save:", error);
    res.status(500).json({ error: "Server error. Unable to save Asset Detailsy." });
  }
});



router.post("/beforetransfers", async (req, res) => {
  const { 
    name,
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
    assetTransferDate,
    serialNumber,
    trackingId,
    specialNote, 
    computerComponents,newtrackingId,} = req.body;

  
  try {
    const newBeforeTransferAsset = new BeforeTransferAsset({ name,
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
        assetTransferDate,
        serialNumber,
        trackingId,
        specialNote,
        computerComponents,newtrackingId});
    const savedBeforeTransferAsset = await newBeforeTransferAsset.save();
    res.status(201).json({ message: "Asset Transfer successfully!", BeforeTransferAssetDetails: savedBeforeTransferAsset });
  } catch (error) {
    console.error("Error Asset Transfers save:", error);
    res.status(500).json({ error: "Server error. Unable to save Asset Detailsy." });
  }
});












module.exports = router;