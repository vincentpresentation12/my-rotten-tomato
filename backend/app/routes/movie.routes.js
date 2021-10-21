const controller = require("../controllers/movie.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

 // Create new movie
app.post("/api/movies", controller.create);

// Retrieve all controller
app.get("/api/movies", controller.findAll);

// Retrieve a single movie with id
app.get("/api/movies/:id", controller.findOne)

// Update a movie with id
app.put("/api/movies/:id", controller.update);

// Delete a movie with id
app.delete("/api/movies/:id", controller.delete);

// Delete all movie
app.delete("/api/movies/", controller.deleteAll);
};