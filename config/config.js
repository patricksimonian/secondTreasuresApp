//for passing correct connection string to
//db instance of sequelize
require('dotenv').config();
const p = process.env;
var config = {
  production: {
    database: `${p.DB_HOST}://${p.DB_USER}:${p.DB_PASSWORD}:5432/${p.DB_DATABASE}`
  },
  default: {
    database: database: `${p.DB_HOST}://${p.DB_USER}:${p.DB_PASSWORD}:5432/${p.DB_DATABASE}`
  }
}

module.exports = function getConfig(env) {
  return config[env] || config.default;
}
