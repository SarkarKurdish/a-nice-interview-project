require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./routes");

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("api running 🚀.");
});

app.get("*", (req, res) => {
  res.status(404).send("Not Found");
});

const port = process.env.PORT || 3005;
app.listen(port, () => console.log(`Server running on port ${port}`));
