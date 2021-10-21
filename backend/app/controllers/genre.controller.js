const db = require("../models/index.js", "../models/genre.model");
const Genre = db.genre;
const Op = db.Sequelize.Op;

// Create and Save a new genre
exports.create = (req, res) => {
    console.log(req.body)
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "name can not be empty"
        });
        return;
    };

    // Create a Genre
    const genre = {
        name: req.body.name,
    };

    // Save genre in the database
    Genre.create(genre)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message : 
                    err.message || "Some error occurred while creating the genre."
            });
        });
};

// Retrieve all genre from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Genre.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : 
            err.message || "Some error occurred while retrieving the Genre."
        });
    });
};

// Find a single Genre with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Genre.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : 
            err.message || "Error retrieving Genre with id=" +id
        });
    }); 
};

// Update a Genre by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Genre.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "Genre was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Genre with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message : 
                err.message || "Error updating Genre with id=" +id
            });
        });
  
};

// Delete a Genre with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Genre.destroy({
      where: { id: id }
  })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Genre was deleted successfully !"
            });
        } else {
            res.send({
                message: `Cannot delete Genre with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message : 
            err.message || "Could not delete Genre with id=" +id 
        });
    });
};

// Delete all Genre from the database.
exports.deleteAll = (req, res) => {
    Genre.destroy({
        where: {},
        truncate: false
    })
        .then(num => {
            res.send({
                message: `${num} Genre were deleted successfully !`
            });
        })
        .catch(err => {
            res.status(500).send({
                message : 
                err.message || "Some error occurred while removing all Genre."
            });
        });
};