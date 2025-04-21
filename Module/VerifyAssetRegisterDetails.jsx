// models/VerifyAssetRegisterDetails.js
const mongoose = require("mongoose");

const VerifyAssetRegisterSchema = new mongoose.Schema({
  // Same schema as AssetRegisterDetails
  name: String,
  company: String,
  department: String,
  mainCategory: String,
  type: String,
  assetName: String,
  assetUpdateDate: String,
  serialNumber: String,
  trackingId: String,
  specialNote: String,
  computerComponents: Object,
  CPUassetName: String,
  MoniterassetName: String,
  MouseassetName: String,
  KeyboardassetName: String,
  CPUassetModel: String,
  MoniterassetModel: String,
  MouseassetModel: String,
  KeyboardassetModel: String,
  assetModel: String,
  assetUserName: String,
}, { timestamps: true });

module.exports = mongoose.model("VerifyAssetRegisterDetails", VerifyAssetRegisterSchema);
