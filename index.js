require("dotenv").config({});
const connectDb = require("./db/index");
const app = require("./app");

connectDb()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("DB connection failed", err);
    });
