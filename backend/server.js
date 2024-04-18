const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const db = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
db();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
