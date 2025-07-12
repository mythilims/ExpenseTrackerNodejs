const express =require('express');
const {getTotalExpense,getLastTxn,expenseTrackerByCategory} =require("../../Controller/ExpenseSummaryController");
const authMiddleWare = require('../../Middleware/AuthMiddleware');
const route  =express.Router();
console.log("tst");
route.use(authMiddleWare);

route.get('/byCategory',expenseTrackerByCategory);
route.get("/getExpenseAmount",getTotalExpense)
route.get("/getExpenseTxn",getLastTxn)

module.exports =route;