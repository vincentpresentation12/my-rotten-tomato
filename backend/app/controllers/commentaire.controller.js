const db = require("../models/index.js", "../models/commentaire.model");
const Commentaire = db.commentaire;
const Op = db.Sequelize.Op;

// Create and Save a new commentaires
exports.create = (req, res) => {
    console.log(req.body)
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "title can not be empty"
        });
        return;
    };

    // Create a Commentaire
    const commentaire = {
        title: req.body.title,
    };

    // Save commentaire in the database
    Commentaire.create(commentaire)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message : 
                    err.message || "Some error occurred while creating the commentaire."
            });
        });
};

// Retrieve all commentaires from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Commentaire.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : 
            err.message || "Some error occurred while retrieving the commentaires."
        });
    });
};

// Find a single commentaire with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Commentaire.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : 
            err.message || "Error retrieving Commentaire with id=" +id
        });
    }); 
};

// Update a Commentaire by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Commentaire.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "Commentaire was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Commentaire with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message : 
                err.message || "Error updating Commentaire with id=" +id
            });
        });
  
};

// Delete a Commentaire with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Commentaire.destroy({
      where: { id: id }
  })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Commentaire was deleted successfully !"
            });
        } else {
            res.send({
                message: `Cannot delete Commentaire with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message : 
            err.message || "Could not delete Commentaire with id=" +id 
        });
    });
};

// Delete all Commentaires from the database.
exports.deleteAll = (req, res) => {
    Commentaire.destroy({
        where: {},
        truncate: false
    })
        .then(num => {
            res.send({
                message: `${num} Commentaires were deleted successfully !`
            });
        })
        .catch(err => {
            res.status(500).send({
                message : 
                err.message || "Some error occurred while removing all Commentaires."
            });
        });
};