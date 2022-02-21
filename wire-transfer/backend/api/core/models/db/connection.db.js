import  pg, { Pool, Client } from 'pg';
import dotenv from "dotenv"
import debug from 'debug';
import configJson from '../../config/config.ini';
dotenv.config()
const env = process.env.NODE_ENV || 'development';
const config = configJson[env];
//debug('pg/connection')(config);
import Utils from "../../helpers/common"

let pool = null

// console.log(Utils.hashPassword("mypassword"))
// console.log(Utils.validatePassword('mypassword','$2b$15$7MVuDh8nspFt4TBdDRpuzOWwMlZkd7Bl0yiyBR0b7R26szlymBPoG'))

if ( env === 'production') {
  //console.log( process.env.PG_DATABASE_HEROKU)
  pool = new Pool({ 
      connectionString: process.env.DATABASE_URL  // `postgres://sxqxifycivjczb:ffa691b4cc9702002f7e148135d6e05455205f69a5d43012f8dc7cc8f0c95645@ec2-18-235-114-62.compute-1.amazonaws.com:5432/d3ufd2rj057hmf` ,
      ssl: {
          rejectUnauthorized: false,
      },
  });



  pool.connect((err, client, release) => {
      if (err) {
          return console.error('Error acquiring client', err.stack)
      }
      console.log("db connection established")
      //Do what you have to do with the pool client now
  })

  //console.log(clients)
} else {
  //console.log(clients)
    console.log("local connection for dev here ..")
    try{
       //local machine connection
     pool = new Pool({
        user: process.env.PG_LOCAL_USER,
        host: process.env.PG_LOCAL_HOST,
        password: process.env.PG_LOCAL_PASSWORD,
        database: process.env.PG_LOCAL_DATABASE,
        port: process.env.PG_LOCAL_PORT,
        // ssl: {
        //     rejectUnauthorized: false,
        // },
     });

      

     

  
    pool.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        // Do what you have to do with the pool client now
        console.log("connection established")
    })

    // pool.query('SELECT * FROM transactions WHERE senderid=$1  OR receipientid=$2',[4,"simba@gmail.com"], function(error,query,release){
    //    if(!error){
    //         console.log(query.rows)
    //    }
    // })



    }catch(error){
      console.log(error)
    }
}

     

export default pool;