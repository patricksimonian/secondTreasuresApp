const Sequelize = require('sequelize');
const dbInstance = function(config) {
  const sequelize = new Sequelize(config.database, config.db_user, config.db_password, {
    host: config.db_host,
  	dialect: config.dialect,
    operatorsAliases: false,
    define: {
      underscored: true
    }
  });
  //connect all models/tables to a singular db object for ease of access
  const db = {};
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;


  //connect all models
  db.admins = require('../models/admin.js')(sequelize, Sequelize);
  db.authors = require('../models/author.js')(sequelize, Sequelize);
  db.books = require('../models/book.js')(sequelize, Sequelize);
  db.employees = require('../models/employee.js')(sequelize, Sequelize);
  db.ratings = require('../models/rating.js')(sequelize, Sequelize);
  //setup associations
  db.books.hasMany(db.ratings);
  db.ratings.belongsTo(db.books, {foreignKey: 'book_isbn'});
  db.employees.hasOne(db.admins);

  db.books.belongsToMany(db.authors, {as:'authors', through: 'book_authors', foreignKey: 'book_isbn'});
  db.authors.belongsToMany(db.books, {as:'books', through: 'book_authors', foreignKey: 'author_id'});
  return db;
}

module.exports = dbInstance;
