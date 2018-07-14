//for passing correct connection string to
//db instance of sequelize
require('dotenv').config();
const p = process.env;
var config = {
  production: {
    port: p.PORT,
    dialect: 'mysql',
    db_user: p.DB_USER,
    db_password: p.DB_PASSWORD,
    database: p.DB_DATABASE,
    db_host: p.DB_HOST,
    cloudinary: {
      cloud_name: p.CLOUD_NAME,
      api_key: p.CLOUDINARY_ACCESS_KEY,
      api_secret: p.CLOUDINARY_SECRET_KEY
    },
    jwt: {
      secret: p.JWT_SECRET
    }
  },
  default: {
    port: p.PORT,
    dialect: 'mysql',
    db_user: p.DB_USER,
    db_password: p.DB_PASSWORD,
    database: p.DB_DATABASE,
    db_host: p.DB_HOST,
    cloudinary: {
      cloud_name: p.CLOUD_NAME,
      api_key: p.CLOUDINARY_ACCESS_KEY,
      api_secret: p.CLOUDINARY_SECRET_KEY
    },
    jwt: {
      secret: p.JWT_SECRET
    }
  }
}

module.exports = function getConfig(env) {
  return config[env] || config.default;
}
