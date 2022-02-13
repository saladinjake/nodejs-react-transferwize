/*APPLICATION BINARIES*/
import config from 'dotenv';
import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import debug from 'debug';
import configJson from './core/config/config.ini';

/*express configurations*/
config.config();
const app = express();
const port = process.env.PORT || 7888;
const API_VERSION = '/api/v1';
app.use(json());
app.use(cors());

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
