import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model('Department', DepartmentSchema);