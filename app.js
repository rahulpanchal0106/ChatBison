const express = require("express");
const app = express();

app.get("/", (req, res) => res.send("Express on Vercel"));
app.use("/api", require("./api"));

module.exports = app;
