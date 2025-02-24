const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const cors = require("cors");

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON data
app.use(cors()); // Enable CORS

// Database configuration
const dbConfig = require("./DB.jsx");

// Routes

const userRoute = require("./Routes/AdminRoute.jsx");
//const userLoginRoute = require("./Routes/UserLoginRoute.jsx") // Import the new Service route

const categoryRoute = require("./Routes/CategoryRoute.jsx");

const AssetDetails = require("./Routes/AssetRegisterRoute.jsx");
app.use("/api/categories", categoryRoute);
app.use("/api/AssetRegisterDetails", AssetDetails);



// Register routes
app.use("/api/users", userRoute);
//app.use("/api/users", userLoginRoute);






// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Node Server Started on Port ${port}`));
