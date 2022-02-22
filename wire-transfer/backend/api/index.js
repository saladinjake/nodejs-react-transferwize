/*APPLICATION BINARIES*/
// require("@babel/polyfill");
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser, { json, urlencoded } from 'body-parser';
import debug from 'debug';
import configJson from './core/config/config.ini';


import authRoutes from './modules/auth/routes/user.route';
import accountRoutes from './modules/e-transactions/routes/account.route';
import transactionRoutes from './modules/e-transactions/routes/transaction.route';
import searchRoutes from './modules/auth/routes/search.route'
/*express configurations*/
import pool from "./core/models/db/connection.db"

// import swaggerUI from 'swagger-ui-express';
// import swaggerDocument from '../../swagger.json';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const API_VERSION_CONTROLLER = '/api/v1';

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

/*swagger doc deley boot time of server
TODO: MOVE DOCUMENTATION TO SEPERATE HOSTING
*/
// app.use('/transferwise/api/v1/documentations', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(cors("*"));
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.post('/test', (req, res) => {
  res.send(req.body);
});

app.use(`/api/v1/auth`, authRoutes);
app.use(`${API_VERSION_CONTROLLER}`, accountRoutes);
app.use(`${API_VERSION_CONTROLLER}`, transactionRoutes);
app.use('/api/v1/search', searchRoutes);
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
