import Register from "../models/registerModel.js";

// Create a new register (Register)
export const createRegister = async (req, res) => {
  try {
    const { Name, Email, Phone, BusinessType } = req.body;
    if (!Name || !Email) {
      return res.status(400).json({ message: "Name and Email are required." });
    }
    const existingRegister = await Register.findOne({ Email });
    if (existingRegister) {
      return res.status(409).json({ message: "Email already registered." });
    }
    const newRegister = new Register({ Name, Email, Phone, BusinessType });
    await newRegister.save();
    return res.status(201).json({
      message: "User registered successfully.",
      register: newRegister,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

// Get all registers
export const getRegisters = async (req, res) => {
  try {
    const registers = await Register.find();
    return res.status(200).json(registers);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

// Get a register by ID
export const getRegisterById = async (req, res) => {
  try {
    const register = await Register.findById(req.params.id);
    if (!register) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json(register);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

// Update a register by ID
export const updateRegister = async (req, res) => {
  try {
    const { Name, Email, Phone, BusinessType } = req.body;
    const updatedRegister = await Register.findByIdAndUpdate(
      req.params.id,
      { Name, Email, Phone, BusinessType },
      { new: true, runValidators: true }
    );
    if (!updatedRegister) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json({
      message: "User updated successfully.",
      register: updatedRegister,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};

// Delete a register by ID
export const deleteRegister = async (req, res) => {
  try {
    const deletedRegister = await Register.findByIdAndDelete(req.params.id);
    if (!deletedRegister) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};
