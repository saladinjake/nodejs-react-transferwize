/*APPLICATION BINARIES*/
// require("@babel/polyfill");
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser, { json } from 'body-parser';
import debug from 'debug';
import configJson from './core/config/config.ini';


import authRoutes from './modules/auth/routes/user.route';
import accountRoutes from './modules/e-transactions/routes/account.route';
import transactionRoutes from './modules/e-transactions/routes/transaction.route';
/*express configurations*/
import pool from "./core/models/db/connection.db"

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const API_VERSION_CONTROLLER = '/api/v1';
app.use(bodyParser({extended: false}));
app.use(cors());


app.post('/test', (req, res) => {
  res.send(req.body);
});

app.use(`/api/v1/auth`, authRoutes);
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

pool.on('error', (error) => {
	console.log(error)
 
});

pool.on('connect', (pooler) => {
  console.log(pooler)
});

app.listen(port, () => {
    debug('development')(`Server is running on port ${port}`);
    console.log(`Server is running on port ${port}`)
});


module.exports = app;
