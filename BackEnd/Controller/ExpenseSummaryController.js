const mongoose = require("mongoose");
const ExpenseTracker = require("../Models/ExpenseTracker.model");
const Income = require("../Models/Income.model");

const expenseTrackerByCategory = async(req,res) =>{

   const expenseTracker =await ExpenseTracker.aggregate([
    {
        $group:{
            _id:"$category",
           totalAmount: { "$sum": "$amount" }
        }
    },{
        $project:{
            _id:0,
            category:"$_id",
            totalAmount:1
        }
    }
   ])

   res.json(expenseTracker);

}

const getTotalExpense = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    // Total Expenses
    const totExpense = await ExpenseTracker.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $group: {
          _id: null,
          totalExpense: { $sum: "$amount" },
        },
      },
    ]);

    // Total Income
    const totInCome = await Income.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $group: {
          _id: null,
          totalInCome: { $sum: "$amount" },
        },
      },
    ]);

    const totalExpense = totExpense[0]?.totalExpense || 0;
    const totalIncome = totInCome[0]?.totalInCome || 0;
    const totalBal = totalIncome - totalExpense;

    res.status(200).json({
      totalIncome,
      totalExpense,
      totalBal,
    });
  } catch (error) {
    console.error("Error in getTotalExpense:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};  
const getLastTxn = async(req,res) =>{
  try{
   const data =await ExpenseTracker.find({userId:req.query.userId}).sort({createdAt:1})
   res.status(200).json({data:data})
  }catch(e){
       res.status(500).json({data:[]})

  }
}

module.exports = {getTotalExpense,getLastTxn,expenseTrackerByCategory};
