const express =require('express');

const { expensebyCateogry,createExpenseTracker, getAllExpenseTracker, updateExpenseTracker, getByIdExpenseTracker, deleteExpenseTracker } = require('../../Controller/ExpenseTracker.controller');
const authMiddleWare = require('../../Middleware/AuthMiddleware');
const route =express.Router();

route.use(authMiddleWare);
// route.use();

//create a expense
route.post('/',createExpenseTracker)

// get data
route.get('/',getAllExpenseTracker)
route.get('/',expensebyCateogry)

//update data 

route.put('/:id',updateExpenseTracker)

//get by id 

route.get('/:id',getByIdExpenseTracker)

//delete data

route.delete('/:id',deleteExpenseTracker)

module.exports =route;