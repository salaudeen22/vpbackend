const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4000;

const mongoDB = require("./db");

mongoDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin","https://65b3ee975703dc3a68373ed4--reliable-lollipop-23206b.netlify.app");
  

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

app.use(express.json());
app.use("/api", require("./routes/CreateUser"));
app.use("/api", require("./routes/DisplayData"));
app.use("/api", require("./routes/OrderData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
