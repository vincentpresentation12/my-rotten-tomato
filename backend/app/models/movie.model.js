module.exports = (sequelize, Sequelize) => {
  const Movie = sequelize.define("movies", {
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
  return Movie;
};