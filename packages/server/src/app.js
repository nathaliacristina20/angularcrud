import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import http from 'http';
import Youch from 'youch';
import 'express-async-errors';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);

    this.midlewares();
    this.routes();

    this.exceptionHandler();

  }

  midlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(routes);
  }

  exceptionHandler() {
    this.app.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }

      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    });
  }

}

export default new App().server;
