if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//Declaring Express JS and express-ejs-layouts
const express = require("express");
const path = require("path");
const app = express();
const expressLayouts = require("express-ejs-layouts");

//Declare router
const indexRouter = require("./routes/index");

//Setting up view engine, paths
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.set("layout", "layouts/layout");
app.use(expressLayouts);
//--static file (CSS, HTML, JS)
app.use(express.static("public"));

//Setting up Mongo DB Database
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
const db = mongoose.connection;
//--Check the connection to database
db.on("error", (error) => console.log("error"));
db.once("open", () => console.log("Connected to Mongoose."));
app.use("/", indexRouter);

//Listen to the localhost PORT
app.listen(process.env.PORT || 3000);
