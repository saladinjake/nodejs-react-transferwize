import { Pool } from 'pg';
import dotenv from "dotenv"
import debug from 'debug';
import configJson from '../../config/config.ini';
dotenv.config()
const env = process.env.NODE_ENV || 'development';
const config = configJson[env];
debug('pg/connection')(config);

let pool = null;

if ( env === 'production') {
  //console.log( process.env.PG_DATABASE_HEROKU)
pool = new Pool({ 
  	connectionString: process.env.PG_DATABASE_HEROKU ,
  	// ssl: {
   //      rejectUnauthorized: false,
   //  },
    }
   );
} else {
    //console.log( config.username,config.host,config.database, config.password)
  pool = new Pool({
    user: config.username,
    host: config.host,
    password: config.password,
    database: config.database,
    port: config.port,
    // ssl: {
    //     rejectUnauthorized: false,
    // },
  });
}

pool.on('error', (error) => {
  debug('pg/connection')(error);
});

pool.on("connect", ()=>{
  console.log("connected to heroku db..")
})
export default pool;



