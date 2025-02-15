import express from "express";
import { connectDB } from "./config/database.js";
import userModel from "./models/user.js";

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🟢 **User Signup Route**
app.post("/signup", async (req, res) => {
  try {
    const user = new userModel(req.body);
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🟢 **Fetch User by Email**
app.get("/users", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user", details: err.message });
  }
});

// 🟢 **Fetch All Users (Feed)**
app.get("/feed", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Error fetching data", details: err.message });
  }
});

// 🔴 **DELETE User by ID**
app.delete("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    res.status(200).json({ message: "User deleted successfully", user });
  } catch (err) {
    res.status(500).json({ error: "Error deleting user", details: err.message });
  }
});

// 🟢 **UPDATE User by ID**
app.patch("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    // 🔹 Define allowed fields
    const ALLOW_UPDATE = ["firstName", "lastName", "password", "age", "about", "photourl"];

    // 🔹 Check if all fields in `req.body` are allowed
    const isUpdateAllowed = Object.keys(updateData).every((key) => ALLOW_UPDATE.includes(key));
    if (!isUpdateAllowed) {
      return res.status(400).json({ error: "Invalid update fields" });
    }

    // 🔹 Find and update user
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true } // ✅ Ensures updated values are validated
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Error updating user", details: err.message });
  }
});

// 🔵 **Connect to Database**
connectDB()
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.error("❌ Error connecting to database", err));

// 🔵 **Start Server**
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
