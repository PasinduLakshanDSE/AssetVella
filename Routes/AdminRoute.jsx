const express = require("express");
const User = require("../Module/AdminModule.jsx"); // Ensure the path is correct
const router = express.Router();

router.post("/", async (req, res) => {
  const { firstName, lastName, designation, contact, username, selectedOption, password, companyName } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !designation || !contact || !username || !password || !companyName || !selectedOption) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newUser = new User({
      firstName,
      lastName,
      designation,
      contact,
      username,
      selectedOption,
      password,
      companyName,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created successfully!", user: savedUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Server error. Unable to save user." });
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ message: "Login failed. Invalid email or password." });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: "Your account is blocked. Please contact the administrator." });
    }

    const temp = {
      name: user.firstName,
      email: user.email,
      selectedOption: user.selectedOption,
      _id: user._id,
    };

    res.json(temp); // Return user data with the selected option
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: error.message || "Server error" });
  }
});



router.put("/:id", async (req, res) => {
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


router.get("/getallUsers", async (req, res) => {
  try {
      const users = await User.find();
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ error: error.message });
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


router.put("/block/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json({ message: "User blocked successfully", user });
  } catch (error) {
    console.error("Error blocking user:", error);
    res.status(500).json({ error: "Failed to block user." });
  }
});

router.put("/unblock/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { isBlocked: false }, { new: true });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json({ message: "User unblocked successfully", user });
  } catch (error) {
    console.error("Error unblocking user:", error);
    res.status(500).json({ error: "Failed to unblock user." });
  }
});









module.exports = router;
