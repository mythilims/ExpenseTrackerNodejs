const mongoose =require('mongoose');

const income =new mongoose.Schema({
    amount:{type:Number, required:true},
    source:{type:String,require:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    incomeDate:{type:String,required:true}

},{timestamps:true})

const Income =mongoose.model("Income",income);

module.exports =Income;