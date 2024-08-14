// server/controllers/productController.js

import Product from "../models/Product.js";
import generateToken from "../utils/generateToken.js";

// create a new product
export const createProduct = async (req, res) => {
  const { name, description, price, category, stock } = req.body;

  // should follow same template as initialized in our product model
  const image = { data: req.file.buffer, contentType: req.file.mimetype };

  try {
    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      image,
    });

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error.message });
  }
};

// Get all products - lazy loading
export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    let data = await Product.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalItems = await Product.countDocuments();

    res.status(200).json({
      data,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login a user
/*export const loginUser = async (req, res) => {
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
};*/
