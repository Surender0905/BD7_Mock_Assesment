const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

///import routes
const activitiesRoute = require("./routes/activities.route");

//instance of express
const app = express();

//middleware
app.use(cors({}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

//health route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

//routes
app.use("/", activitiesRoute);

///export app

module.exports = app;
