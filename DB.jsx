const mongoose = require("mongoose");

const mongoURL = 'mongodb+srv://root:Pasindu2003%40@cluster1.epawd.mongodb.net/AssetManagement';
//const mongoURL = 'mongodb+srv://lakshan:Psindu2003%40@assetmanagmentsystem.6uqw7ag.mongodb.net/VellaAssetManagment';


mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.on('error', (err) => {
    console.error("MongoDB Connection Failed:", err.message);
});

connection.once('open', () => {
    console.log('MongoDB Connection Successful');
});

module.exports = mongoose;
