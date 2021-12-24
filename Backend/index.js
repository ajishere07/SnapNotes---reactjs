const express = require("express");
const app = express();
const connectToMongo = require("./database");
const cors = require("cors");
const port = 5000;
connectToMongo();

app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/notes", require("./routes/notes.js"));

app.get("/", (req, res) => {
  res.send("hello this is server");
});

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
