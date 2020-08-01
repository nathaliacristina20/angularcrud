import "dotenv/config";

import express from "express";
import cors from "cors";
import http from "http";
import Youch from "youch";
import "express-async-errors";
import routes from "./routes";

import AppError from "../src/app/shared/errors/AppError";

import "./database";

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
      if (err instanceof AppError) {
        return res
          .status(err.statusCode)
          .json({ status: "error", message: err.message });
      }

      if (process.env.NODE_ENV === "development") {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }

      
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    });
  }
}

export default new App().server;
