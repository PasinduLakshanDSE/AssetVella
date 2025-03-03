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
        assetUserName, 
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


router.get("/getAssetDetails",async(req,res)=>{
  try{
    const asset = await AssetRegisterDetails.find();
    res.status(200).json(asset);
  }catch(error){
    console.error("Error fetching asset details:", error);
    res.status(500).json({ error: "Server error. Unable to retrieve assets." });
  }
})

// Route to get asset details by tracking ID
router.get("/:trackingId", async (req, res) => {
  try {
    const { trackingId } = req.params; // Get tracking ID from the URL params
    const asset = await AssetRegisterDetails.findOne({ trackingId: trackingId }); // Search for asset by tracking ID

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }
    
    res.json(asset); // Send the asset details as the response
  } catch (err) {
    console.error("Error fetching asset by tracking ID:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.put("/updateAsset/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user." });
  }
});





router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id); // MongoDB example
    res.status(200).send({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting User:", error);
    res.status(500).send({ error: "Failed to delete User." });
  }
});













module.exports = router;
