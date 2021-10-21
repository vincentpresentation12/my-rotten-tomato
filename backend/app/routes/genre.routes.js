const controller = require("../controllers/genre.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

 // Create new serie
app.post("/api/genres", controller.create);

// Retrieve all serie
app.get("/api/genres", controller.findAll);

// Retrieve a single serie with id
app.get("/api/genres/:id", controller.findOne)

// Update a serie with id
app.put("/api/genres/:id", controller.update);

// Delete a serie with id
app.delete("/api/genres/:id", controller.delete);

// Delete all serie
app.delete("/api/genres/", controller.deleteAll);
};