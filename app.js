const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");

const authRoutes = require("./src/routes/auth.routes");
const applicationRoutes = require("./src/routes/application.routes");
const adminRoutes = require("./src/routes/admin.routes")

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use(express.static(path.join(__dirname, "public")));
app.use("/api/auth", authRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app