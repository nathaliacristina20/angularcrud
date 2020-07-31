
import mongoose from 'mongoose';

class Database {

  constructor() {
    this.init();
  }

  init() {
    this.mongo();
  }

  mongo() {

    const { MONGO_URL } = process.env;

    this.mongoConnection = mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  }

}

export default new Database();