import User from "../models/registerModel.js";

// Create a new user (Register)
export const createUser = async (req, res) => {
  try {
    const { Name, Email, Phone, BusinessType } = req.body;
    if (!Name || !Email) {
      return res.status(400).json({ message: "Name and Email are required." });
    }
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }
    const newUser = new User({ Name, Email, Phone, BusinessType });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "User registered successfully.", user: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

// Update a user by ID
export const updateUser = async (req, res) => {
  try {
    const { Name, Email, Phone, BusinessType } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { Name, Email, Phone, BusinessType },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    return res
      .status(200)
      .json({ message: "User updated successfully.", user: updatedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};
