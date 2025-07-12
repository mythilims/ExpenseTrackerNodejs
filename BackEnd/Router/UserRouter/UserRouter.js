    const express = require('express');
    const {logniController,registerUser} = require('../../Controller/User.controller');
    const route = express.Router();


    route.post("/login",logniController);
    route.post("/register",registerUser);


    module.exports =route;
    