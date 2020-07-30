//import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import http from 'http';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);

    this.midlewares();
    this.routes();

  }

  midlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(routes);
  }

}

export default new App().server;
