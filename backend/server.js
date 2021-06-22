const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./backend/models");
db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));



// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome animasso" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});