const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json())
app.use(express.urlencoded())

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

const db = require("./app/models");
const Role = db.role;

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/movie.routes')(app);
require('./app/routes/serie.routes')(app);
require('./app/routes/genre.routes')(app);
require('./app/routes/commentaire.routes')(app);

db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});