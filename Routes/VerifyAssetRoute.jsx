// routes/verify.js
const express = require("express");
const router = express.Router();
const AssetRegisterDetails = require("../Module/AssetRegisterModule.jsx");
const VerifyAssetRegisterDetails = require("../Module/VerifyAssetRegisterDetails.jsx");

// POST to verify and move asset
router.post("/verifyAsset/:id", async (req, res) => {
  try {
    const asset = await AssetRegisterDetails.findById(req.params.id);
    if (!asset) return res.status(404).json({ message: "Asset not found" });

    const verifiedAsset = new VerifyAssetRegisterDetails(asset.toObject());
    await verifiedAsset.save();
    await AssetRegisterDetails.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Asset verified successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
