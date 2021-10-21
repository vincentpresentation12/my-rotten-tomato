module.exports = (sequelize, Sequelize) => {
    const Commentaire = sequelize.define("commentaires", {
      title: {
        type: Sequelize.TEXT
      },
    });
    return Commentaire;
  };