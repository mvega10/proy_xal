/* Configuracion de node con potsgres  en: \proy_xal\config.js  */
const env = process.env;

const config = {
  db: { /* do not put password or any sensitive info here, done only for demo */
    host: env.DB_HOST || 'raja.db.elephantsql.com',
    port: env.DB_PORT || '5432',
    user: env.DB_USER || 'vrxhczhi',
    password: env.DB_PASSWORD || 'P94OPW6hG0nUuOt38HgRVFjqV7nL9wWv',
    database: env.DB_NAME || 'vrxhczhi',
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;
