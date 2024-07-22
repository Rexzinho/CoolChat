const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;

module.exports = connect = async () => {
    mongoose.connect(url + dbName);
}
