// server/app.js

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// routes
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = process.env.PORT || 8000;

// chat
import http from "http";
import { Server } from "socket.io";
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Permettre les requêtes de n'importe quelle origine
  },
});
// Gestion des événements de connexion
io.on("connection", (socket) => {
  console.log("Un utilisateur s'est connecté");

  // Recevoir un message d'un client
  socket.on("chatMessage", (msg) => {
    // Diffuser le message à tous les clients
    io.emit("chatMessage", msg);
  });

  // Gestion de la déconnexion
  socket.on("disconnect", () => {
    console.log("Un utilisateur s'est déconnecté");
  });
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", userRoutes);
app.use("/api", productRoutes);

// Database Atlas MongoDB uri
const uri =
  "mongodb+srv://anas-usmo:GbyjZZvWxkhtiSjQ@tuto-db.j4taaoe.mongodb.net/?retryWrites=true&w=majority&appName=tuto-db";

// Database Connection
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
