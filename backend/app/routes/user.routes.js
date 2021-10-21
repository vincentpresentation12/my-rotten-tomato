const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  // Create a new Tutorial
  app.post("/api/users", controller.create);

  // Retrieve all controller
  app.get("/api/users", controller.findAll);

  // Retrieve a single Tutorial with id
  app.get("/api/users/:id", controller.findOne);

  // Update a Tutorial with id
  app.put("/api/users/:id", controller.update);

  // Delete a Tutorial with id
  app.delete("/api/users/:id", controller.delete);

  // Delete all controller
  app.delete("/api/users/", controller.deleteAll);
};