const db = require("../models/index.js", "../models/serie.model");
const Serie = db.serie;
const Op = db.Sequelize.Op;

// Create and Save a new Serie
exports.create = (req, res) => {
    console.log(req.body)
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "title can not be empty"
        });
        return;
    };

    // Create a serie
    const serie = {
        title: req.body.title,
        overview: req.body.overview,
        poster_path: req.body.poster_path,
        release_date: req.body.release_date,
    };

    // Save serie in the database
    Serie.create(serie)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message : 
                    err.message || "Some error occurred while creating the serie."
            });
        });
};

// Retrieve all Serie from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Serie.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : 
            err.message || "Some error occurred while retrieving the Serie."
        });
    });
};

// Find a single serie with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Serie.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : 
            err.message || "Error retrieving serie with id=" +id
        });
    }); 
};

// Update a serie by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Serie.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "serie was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update serie with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message : 
                err.message || "Error updating serie with id=" +id
            });
        });
  
};

// Delete a serie with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Serie.destroy({
      where: { id: id }
  })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "serie was deleted successfully !"
            });
        } else {
            res.send({
                message: `Cannot delete serie with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message : 
            err.message || "Could not delete serie with id=" +id 
        });
    });
};

// Delete all Serie from the database.
exports.deleteAll = (req, res) => {
    Serie.destroy({
        where: {},
        truncate: false
    })
        .then(num => {
            res.send({
                message: `${num} Serie were deleted successfully !`
            });
        })
        .catch(err => {
            res.status(500).send({
                message : 
                err.message || "Some error occurred while removing all Serie."
            });
        });
};