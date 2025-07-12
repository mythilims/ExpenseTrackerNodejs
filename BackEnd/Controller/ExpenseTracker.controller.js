const { default: mongoose } = require("mongoose");
const ExpenseTracker = require("../Models/ExpenseTracker.model");

const createExpenseTracker = async (req, res) => {
  const expenseTracker = new ExpenseTracker(req.body);
  try {
    await expenseTracker.save();
    res.status(200).json(expenseTracker);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getAllExpenseTracker = async (req, res) => {
  let page = parseInt(req.params.page) || 1;
  let limit = parseInt(req.params.limit) || 10;
  let skip = (page - 1) * limit;
  let total = await ExpenseTracker.countDocuments();
      const userId = req.query.userId;

  try {
    const expense = await ExpenseTracker.find({userId: new mongoose.Types.ObjectId(userId) })
      .skip(skip)
      .limit(limit)
      .select("name amount category date notes paymentMethod userId ");
    res
      .status(200)
      .json({
        data: expense,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      });
  } catch (e) {
    res.status(500).json({ message: e.message });
    throw new Error(e);
  }
};

const updateExpenseTracker = async (req, res) => {
  try {
    const expense = await ExpenseTracker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(expense);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getByIdExpenseTracker = async (req, res) => {
  try {
    const expense = await ExpenseTracker.findById(req.params.id);
    res.status(200).json(expense);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteExpenseTracker = async (req, res) => {
  try {
    const expense = await ExpenseTracker.findByIdAndDelete(req.params.id);
    res.status(200).json(expense);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
const expensebyCateogry = async (req, res) => {
  try {
    const expense = await ExpenseTracker.aggregate([
      {
        $group: {
          _id: "$category",
          value: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          label: "$_id",
          value: 1,
        },
      },
    ]);
    res.status(200).json(expense);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  expensebyCateogry,
  createExpenseTracker,
  getAllExpenseTracker,
  updateExpenseTracker,
  getByIdExpenseTracker,
  deleteExpenseTracker,
};
