const controller = require("../controllers/commentaire.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

 // Create new commentaire
app.post("/api/commentaires", controller.create);

// Retrieve all controller
app.get("/api/commentaires", controller.findAll);

// Retrieve a single commentaire with id
app.get("/api/commentaires/:id", controller.findOne)

// Update a commentaire with id
app.put("/api/commentaires/:id", controller.update);

// Delete a commentaire with id
app.delete("/api/commentaires/:id", controller.delete);

// Delete all commentaire
app.delete("/api/commentaires/", controller.deleteAll);
};