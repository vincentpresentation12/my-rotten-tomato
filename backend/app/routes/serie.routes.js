const controller = require("../controllers/serie.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

 // Create new serie
app.post("/api/series", controller.create);

// Retrieve all serie
app.get("/api/series", controller.findAll);

// Retrieve a single serie with id
app.get("/api/series/:id", controller.findOne)

// Update a serie with id
app.put("/api/series/:id", controller.update);

// Delete a serie with id
app.delete("/api/series/:id", controller.delete);

// Delete all serie
app.delete("/api/series/", controller.deleteAll);
};