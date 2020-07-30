import Department from "../schemas/Department";

class DepartmentController {
  async index(_, res) {
    try {
      const departments = await Department.find();
      return res.json(departments);
    } catch (err) {
      return res.status(500).json({
        message: {
          errorMessage: "Internal Server Error",
        },
      });
    }
  }

  async store(req, res) {
    try {
      const { name } = req.body;
      const departmentSchema = new Department({ name });
      const department = await departmentSchema.save();
      return res.json(department);
    } catch (err) {
      return res.status(500).json({
        message: {
          errorMessage: "Internal Server Error",
        },
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const department = await Department.findById({ id });

      if (!department) {
        return res.status(400).json({
          message: {
            errorMessage: "Not found",
          },
        });
      }

      dep.name = req.body.name;
      await dep.save();

      return res.json(department);
      
    } catch (err) {
      return res.status(500).json({
        message: {
          errorMessage: "Internal Server Error",
        },
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await Department.deleteOne({ id });
      return res.status(204).send("");
    } catch (err) {
      return res.status(500).json({
        error: {
          message: "Internal Server Error",
        },
      });
    }
  }
}

export default new DepartmentController();
