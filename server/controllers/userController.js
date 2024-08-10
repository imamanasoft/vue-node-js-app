// server/controllers/userController.js

import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// Register a new user
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error.message });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user profile
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    let data = await User.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user by id
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await User.deleteOne({ _id: user._id });

      res.status(200).json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete selected users
export const deleteSelectedUsers = async (req, res) => {
  try {
    const { ids } = req.body;

    await User.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ message: "Users deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user by id
export const updateUser = async (req, res) => {
  try {
    let filter = { _id: req.params.id };

    const user = await User.findById(req.params.id);

    if (user) {
      const result = await User.findOneAndUpdate(filter, req.body.user);

      res.status(200).json({ message: "User updated", result });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
