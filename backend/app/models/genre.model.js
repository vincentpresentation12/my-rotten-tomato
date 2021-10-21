module.exports = (sequelize, Sequelize) => {
    const Genre = sequelize.define("genres", {
      name: {
        type: Sequelize.STRING
      },
    });
    return Genre;
  };