require('dotenv').config({  
    path: process.env.NODE_ENV === "test" | process.env.NODE_ENV === "dev" ? ".env.test" : ".env",
});
const { Pool } = require('pg');

const data_source_pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  
module.exports = {
    data_source_pool,
};
