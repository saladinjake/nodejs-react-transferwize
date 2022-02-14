/*APPLICATION BINARIES*/
// require("@babel/polyfill");
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import debug from 'debug';
import configJson from './core/config/config.ini';

import authRoutes from './modules/auth/routes/user.route';
import accountRoutes from './modules/e-transactions/routes/account.route';
import transactionRoutes from './modules/e-transactions/routes/transaction.route';
/*express configurations*/


dotenv.config();
const app = express();
const port = process.env.PORT || 7888;
const API_VERSION_CONTROLLER = '/api/v1';
app.use(json());
app.use(cors());

const { Client } = require('pg');
// console.log(process.env.DATABASE_URL,)
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
        rejectUnauthorized: false,
    },
});

client.connect();

client.query('SELECT * FROM users;', (err, res) => {
  if (err) throw err;
  console.log("query was made")
  client.end();
});


app.use(`${API_VERSION_CONTROLLER}/auth`, authRoutes);
app.use(`${API_VERSION_CONTROLLER}`, accountRoutes);
app.use(`${API_VERSION_CONTROLLER}`, transactionRoutes);
/*routes and midddlewares*/
app.get('/', (req, res) => {
  res.send('App server is running');
});
app.use((err, req, res, next) => {
  if (!err) return next();
  return res.status(500).send('Alexa your fintech AI just  broke!');
});
app.listen(port, () => {
    debug('development')(`Server is running on port ${port}`);
    console.log(`Server is running on port ${port}`)
});
module.exports = app;
