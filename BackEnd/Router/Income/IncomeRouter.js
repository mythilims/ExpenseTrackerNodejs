const express = require("express");
const {
  createIncome,
  getAllIncome,
} = require("../../Controller/Income.controller");
const authMiddleWare = require("../../Middleware/AuthMiddleware");
const incomeRouter = express.Router();
incomeRouter.use(authMiddleWare);
const fieldValidate = (req, res, next) => {
  const { userId, amount, source, incomeDate } = req.body;
  if (userId && amount && source && incomeDate) {
    next();
  } else {
    throw new Error("fill the all field ");
  }
};

incomeRouter.post("/", fieldValidate, createIncome);
incomeRouter.get("/", getAllIncome);
module.exports = incomeRouter;
