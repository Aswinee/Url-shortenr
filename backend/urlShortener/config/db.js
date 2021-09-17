const mongoose = require("mongoose");

const DB_URI =
  "mongodb+srv://root:admin123@cluster0.r7co3.mongodb.net/password-reset?retryWrites=true&w=majority";

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

module.exports = connection;
