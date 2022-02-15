import  pg, { Pool } from 'pg';
import dotenv from "dotenv"
import debug from 'debug';
import configJson from '../../config/config.ini';
dotenv.config()
const env = process.env.NODE_ENV || 'development';
const config = configJson[env];
debug('pg/connection')(config);



let connectionString= `postgres://sxqxifycivjczb:ffa691b4cc9702002f7e148135d6e05455205f69a5d43012f8dc7cc8f0c95645@ec2-18-235-114-62.compute-1.amazonaws.com:5432/d3ufd2rj057hmf`
  	
// let pool = new Pool({
//    connectionString: connectionString,
//    ssl: true,
//    // ssl: {
//    //  rejectUnauthorized: false
//    // }
// });

 let pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
    // ssl: {
    //     rejectUnauthorized: false,
    // },
  });

console.log(pool)
// if ( env === 'production') {
//   //console.log( process.env.PG_DATABASE_HEROKU)
// pool = new Pool({ 
//   	connectionString: `postgres://sxqxifycivjczb:ffa691b4cc9702002f7e148135d6e05455205f69a5d43012f8dc7cc8f0c95645@ec2-18-235-114-62.compute-1.amazonaws.com:5432/d3ufd2rj057hmf` ,
//   	ssl: {
//         rejectUnauthorized: false,
//     },
//     }
//    );
// } else {
//     //console.log( config.username,config.host,config.database, config.password)
//   pool = new Pool({
//     user: config.username,
//     host: config.host,
//     password: config.password,
//     database: config.database,
//     port: config.port,
//     // ssl: {
//     //     rejectUnauthorized: false,
//     // },
//   });
// }

pool.on('error', (error) => {
	console.log(error)
  debug('pg/connection')(error);
});

pool.on('connect', (pooler) => {
  console.log(pooler)
});

export default pool;



