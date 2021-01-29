const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const postRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");

const app = express();
const dbString =
  "mongodb+srv://vinit:Fozyooog4VvdGt9Q@cluster0.sxxm9.mongodb.net/posts?retryWrites=true&w=majority";

mongoose
  .connect(dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to Database.!");
  })
  .catch(() => {
    console.log("Connection Failed.!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/post", postRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/user", authRoutes);

app.listen(process.env.PORT || 3000);

module.exports = app;
