import  pg, { Pool } from 'pg';
import dotenv from "dotenv"
import debug from 'debug';
import configJson from '../../config/config.ini';
dotenv.config()
const env = process.env.NODE_ENV || 'development';
const config = configJson[env];
debug('pg/connection')(config);



let connectionString= `postgres://sxqxifycivjczb:ffa691b4cc9702002f7e148135d6e05455205f69a5d43012f8dc7cc8f0c95645@ec2-18-235-114-62.compute-1.amazonaws.com:5432/d3ufd2rj057hmf`
  	
let pool = new Pool({
   connectionString: connectionString,
   ssl: true,
 //   ssl: {
 //    rejectUnauthorized: false
 // }
});

pool.query(`SELECT * FROM users;`, (err, res) => {
    if (err) {
        console.log("Error - Failed to select all from Users");
        console.log(err);
    }
    else{
        console.log(res.rows);
    }
});



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
  debug('pg/connection')(error);
});

export default pool;



