const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.DB, 
  dbConfig.USER, 
  dbConfig.PASSWORD, 
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);
db.movie = require("./movie.model")(sequelize, Sequelize);
db.serie = require("./serie.model")(sequelize, Sequelize);
db.genre = require("./genre.model")(sequelize, Sequelize);
db.commentaire = require("./commentaire.model")(sequelize, Sequelize);

// relation table role utilsateurs
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin"];

//relation table movie avec genres
db.movie.belongsToMany(db.genre, {
  through: "movie_genres",
  foreignKey: "movieId",
  otherKey: "genreId"
});

db.genre.belongsToMany(db.movie, {
  through: "movie_genres",
  foreignKey: "genreId",
  otherKey: "movieId"
});

db.GENRES = ["movieId","genreId"];

// relation table serie avec genre
db.serie.belongsToMany(db.genre, {
  through: "serie_genres",
  foreignKey: "serieId",
  otherKey: "genreId"
});

db.genre.belongsToMany(db.serie, {
  through: "serie_genres",
  foreignKey: "genreId",
  otherKey: "serieId"
});

db.GENRES = ["serieId","genreId"];

//relation table commentaire a film
db.commentaire.belongsToMany(db.movie, {
  through: "movie_commentaires",
  foreignKey: "commentaireId",
  otherKey: "movieId"
});

db.movie.belongsToMany(db.commentaire, {
  through: "movie_commentaires",
  foreignKey: "movieId",
  otherKey: "commentaireId"
});

db.GENRES = ["commentaireId","movieId"];

module.exports = db;