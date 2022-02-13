import { Pool } from 'pg';
import dotenv from "dotenv"
import debug from 'debug';
import configJson from '../../config/config.ini';
dotenv.config()
const env = process.env.NODE_ENV || 'development';
const config = configJson[env];
debug('pg/connection')(config);

let pool = null;

// if (env === 'development' || env === 'production') {
pool = new Pool({ 
  	connectionString: process.env.PG_DATABASE_HEROKU ,
  	// ssl: {
   //      rejectUnauthorized: false,
   //  },
  }
  );
// } else {
//   pool = new Pool({
//     user: config.username,
//     host: config.host,
//     password: config.password,
//     database: config.database,
//     port: config.port,
//   });
// }

pool.on('error', (error) => {
  debug('pg/connection')(error);
});


export default pool;



