module.exports = (sequelize, Sequelize) => {
    const Serie = sequelize.define("series", {
      title: {
        type: Sequelize.STRING
      },
      overview: {
        type: Sequelize.TEXT
      },
      poster_path: {
        type: Sequelize.STRING
      },
      release_date: {
        type: Sequelize.STRING
      },
    });
    return Serie;
  };