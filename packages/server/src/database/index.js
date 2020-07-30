
import mongoose from 'mongoose';

class Database {

  constructor() {
    this.init();
  }

  init() {
    this.mongo();
  }

  mongo() {
    this.mongoConnection = mongoose.connect('mongodb://localhost:27017/crud', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();