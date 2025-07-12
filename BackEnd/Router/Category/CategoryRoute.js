const express  =require('express');
const {getAllCategory,getCategory, createCategory, getByIdCategory, updateCategory, deleteCategory} = require('../../Controller/Category.Controller');
const authMiddleware = require('../../Middleware/AuthMiddleware');
const categoryRoute =express.Router();
categoryRoute.use(authMiddleware);

categoryRoute.get('/',getCategory);
categoryRoute.get('/all',getAllCategory);

categoryRoute.post('/',createCategory);
categoryRoute.get('/:id',getByIdCategory);

categoryRoute.put('/:id',updateCategory);
categoryRoute.delete('/:id',deleteCategory);

module.exports = categoryRoute;