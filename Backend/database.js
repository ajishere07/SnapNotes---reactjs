const mongoose = require("mongoose");
const mongoURI =
  "mongodb://localhost:27017/snapNotes?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
// const mongoAtlasURI =
//   "mongodb+srv://anujyadav:yadavanuj@cluster0.rozdc.mongodb.net/snapNote?retryWrites=true&w=majority";
const connectToMongo = () => {
  mongoose.connect(mongoURI, { useNewUrlParser: true }, () => {
    console.log("connected to mongo successfully");
  });
};

module.exports = connectToMongo;
