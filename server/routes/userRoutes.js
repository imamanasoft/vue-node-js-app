// server/routes/userRoutes.js

import express from "express";
import {
  createUser,
  loginUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/users", protect, getUsers);
router.get("/users/:id", protect, getUser);
router.post("/users", createUser);
router.put("/users/:id", protect, updateUser);
router.delete("/users/:id", protect, deleteUser);
router.post("/login", loginUser);

export default router;
