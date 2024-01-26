const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4000;

const mongoose = require("mongoose");
const mongoDBConnection = process.env.MONGODB_URI;

mongoose.connect(mongoDBConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// CORS Middleware
app.use((req, res, next) => {
  const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

// Hello World route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Modular Routing
const createUserRoute = require("./routes/CreateUser");
const displayDataRoute = require("./routes/DisplayData");
const orderDataRoute = require("./routes/OrderData");

app.use("/api", createUserRoute);
app.use("/api", displayDataRoute);
app.use("/api", orderDataRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
