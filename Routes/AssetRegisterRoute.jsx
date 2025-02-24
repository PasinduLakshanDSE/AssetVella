const express = require("express");
const AssetDetails = require("../Module/AssetRegisterModule.jsx"); // Updated path
const AssetRegisterDetails = require("../Module/AssetRegisterModule.jsx");

const router = express.Router();

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
    assetUpdateDate,
    serialNumber,
    trackingId,
    specialNote, 
    computerComponents,} = req.body;

  
  try {
    const newDetails = new AssetDetails({name,
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


router.get("/getAssetDetails",async(req,res)=>{
  try{
    const asset = await AssetRegisterDetails.find();
    res.status(200).json(asset);
  }catch(error){
    console.error("Error fetching asset details:", error);
    res.status(500).json({ error: "Server error. Unable to retrieve assets." });
  }
})











module.exports = router;
