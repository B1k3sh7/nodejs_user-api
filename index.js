const express = require("express");
const app = express();

// env file
const dotenv = require("dotenv");
dotenv.config();

// port and hostname
const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

// cors origin
const cors = require("cors");
app.use(cors());

// form data receive in json format
app.use(express.json());

// importing routes
const userRouter = require("./routes/v1/user.routes");

// routes declare
app.use("/api/v1", userRouter);
app.use("/", (req, res) => {
  res.send("API is successfully running");
});

// importing routes

app.listen(port, () => {
  console.log(`server is running on ${port} or ${hostname}:${port}`);
});
