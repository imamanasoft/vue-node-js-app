// server/routes/userRoutes.js

import express from "express";
import {
  createProduct,
  getProducts,
  /*loginUser,
  getUser,
  getUsers,
  updateUser,
  deleteSelectedUsers,
  deleteUser,*/
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/products", protect, createProduct);
router.get("/products", protect, getProducts);
/*router.get("/users/:id", protect, getUser);
router.post("/users", createUser);
router.put("/users/:id", protect, updateUser);
router.delete("/users/:id", protect, deleteUser);
router.post("/users/delete", protect, deleteSelectedUsers); //https://stackoverflow.com/questions/72568682/express-body-empty-on-delete-requests-but-same-request-as-a-post-contains-body#answer-72568709
router.post("/users/login", loginUser);*/

export default router;
