const db = require("../models/index.js", "../models/movie.model");
const Movie = db.movie;
const Op = db.Sequelize.Op;

// Create and Save a new movies
exports.create = (req, res) => {
    console.log(req.body)
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "title can not be empty"
        });
        return;
    };

    // Create a movie
    const movie = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        release_date: req.body.release_date,
    };

    // Save movie in the database
    Movie.create(movie)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message : 
                    err.message || "Some error occurred while creating the movie."
            });
        });
};

// Retrieve all movies from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Movie.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : 
            err.message || "Some error occurred while retrieving the movies."
        });
    });
};

// Find a single movie with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Movie.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : 
            err.message || "Error retrieving movie with id=" +id
        });
    }); 
};

// Update a movie by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Movie.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "Movie was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update movie with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message : 
                err.message || "Error updating movie with id=" +id
            });
        });
  
};

// Delete a movie with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Movie.destroy({
      where: { id: id }
  })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Movie was deleted successfully !"
            });
        } else {
            res.send({
                message: `Cannot delete movie with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message : 
            err.message || "Could not delete movie with id=" +id 
        });
    });
};

// Delete all movies from the database.
exports.deleteAll = (req, res) => {
    Movie.destroy({
        where: {},
        truncate: false
    })
        .then(num => {
            res.send({
                message: `${num} Movies were deleted successfully !`
            });
        })
        .catch(err => {
            res.status(500).send({
                message : 
                err.message || "Some error occurred while removing all movies."
            });
        });
};