import Department from "../schemas/Department";
import Product from "../schemas/Product";
import AppError from "../shared/errors/AppError";

class DepartmentController {
  async index(_, res) {
    const departments = await Department.find();
    return res.json(departments);
  }

  async store(req, res) {
    const { name } = req.body;
    const departmentSchema = new Department({ name });
    const department = await departmentSchema.save();
    return res.json(department);
  }

  async update(req, res) {
    const { id } = req.params;
    const department = await Department.findById({ _id: id });

    if (!department) {
      throw new AppError("Department not found");
    }

    department.name = req.body.name;
    await department.save();

    return res.json(department);
  }

  async delete(req, res) {
    const { id } = req.params;

    const department = await Department.findById({ _id: id });

    if (!department) {
      throw new AppError("Department not found");
    }

    const products = await Product.find({ departments: id }).exec();

    if (products.length > 0) {
      throw new AppError(
        "Could not remove this department. You may have to fix its dependencies before."
      );
    }

    await Department.deleteOne({ _id: id });

    return res.status(204).send();
  }
}

export default DepartmentController;
