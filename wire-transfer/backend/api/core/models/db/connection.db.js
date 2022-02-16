import  pg, { Pool, Client } from 'pg';
import dotenv from "dotenv"
import debug from 'debug';
import configJson from '../../config/config.ini';
dotenv.config()
const env = process.env.NODE_ENV || 'development';
const config = configJson[env];
//debug('pg/connection')(config);


let pool = null

if ( env === 'production') {
  //console.log( process.env.PG_DATABASE_HEROKU)
pool = new Pool({ 
  	connectionString: `postgres://sxqxifycivjczb:ffa691b4cc9702002f7e148135d6e05455205f69a5d43012f8dc7cc8f0c95645@ec2-18-235-114-62.compute-1.amazonaws.com:5432/d3ufd2rj057hmf` ,
  	ssl: {
        rejectUnauthorized: false,
    },
    }
   );



pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack)
    }
    // Do what you have to do with the pool client now
})


 // pool = new Pool({
 //    user: process.env.PG_USER,
 //    host: process.env.PG_HOST,
 //    password: process.env.PG_PASSWORD,
 //    database: process.env.PG_DATABASE,
 //    port: process.env.PG_PORT,
 //    ssl: {
 //        rejectUnauthorized: false,
 //    },
 // });

  //console.log(clients)
} else {


  //console.log(clients)
    console.log("local connection for dev here ..")
  

try{

 pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
    ssl: {
        rejectUnauthorized: false,
    },
 });
console.log(pool)

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack)
    }
    // Do what you have to do with the pool client now
    console.log("connection established")
})



}catch(error){
  console.log(error)
}

  

}

     

export default pool;




