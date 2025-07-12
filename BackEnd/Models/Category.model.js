const  mongoose =require("mongoose");

const category = new mongoose.Schema({
    category:{type:String,required:true,unique:[true,'Already exists'] ,index:true},
    description:{type:String, required:false}
},{timestamps:true})

const Category  =mongoose.model("Category",category);
module.exports = Category;