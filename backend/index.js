const express = require("express");
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();
const connectToMongo = require("./db");
connectToMongo();

const app = express();
app.use(express.json());
app.use(cors());
const port = 5000;

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`iNotebook backend app listening on port ${port}`);
});
