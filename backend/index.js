import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: "*" } });
app.set("io", io);

io.on("connection", (socket) => {
  console.log("📱 Mobile client connected:", socket.id);
  socket.on("join-user", (userId) => {
    socket.join(`user_${userId}`);
    console.log(`👤 User joined room: user_${userId}`);
  });
  socket.on("disconnect", () => console.log("📴 Disconnected:", socket.id));
});

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

import connectDB from "./config/db.js";
connectDB();

// ── ROUTES (Mobile — User Only) ──────────────────────────────────────────────
import authRoutes         from "./routes/auth/auth.js";
import profileRoutes      from "./routes/user/profile.js";
import newsRoutes         from "./routes/news/news.js";
import marketplaceRoutes  from "./routes/marketplace/marketplace.js";
import grievanceRoutes    from "./routes/grievance/grievance.js";
import eventRoutes        from "./routes/events/events.js";
import jobRoutes          from "./routes/jobs/jobs.js";
import farmerRoutes       from "./routes/farmerSupport/farmerSupport.js";
import notificationRoutes from "./routes/notifications/notifications.js";
import serviceRoutes      from "./routes/services/services.js";
import paymentRoutes      from "./routes/payment/payment.js";

app.use("/api/auth",           authRoutes);
app.use("/api/profile",        profileRoutes);
app.use("/api/news",           newsRoutes);
app.use("/api/marketplace",    marketplaceRoutes);
app.use("/api/grievances",     grievanceRoutes);
app.use("/api/events",         eventRoutes);
app.use("/api/jobs",           jobRoutes);
app.use("/api/farmer-support", farmerRoutes);
app.use("/api/notifications",  notificationRoutes);
app.use("/api/services",       serviceRoutes);
app.use("/api/payment",        paymentRoutes);

app.get("/", (req, res) => res.json({ success: true, message: "Village Digital Mobile API v1.0 🚀", timestamp: new Date() }));
app.get("/health", (req, res) => res.json({ status: "OK", uptime: process.uptime() }));
app.use((req, res) => res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` }));
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(err.status || 500).json({ success: false, message: err.message || "Internal Server Error" });
});

server.listen(PORT, () => console.log(`✅ Mobile Backend running at http://localhost:${PORT}`));
