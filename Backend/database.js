const mongoose = require("mongoose");
const mongoURI =
  "mongodb://localhost:27017/snapNotes?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("connected to mongo successfully");
  });
};

module.exports = connectToMongo;
