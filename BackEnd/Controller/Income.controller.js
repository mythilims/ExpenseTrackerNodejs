const { default: mongoose } = require("mongoose");
const Income = require("../Models/Income.model");

const createIncome = async (req, res) => {
  const { userId, amount, source, incomeDate } = req.body;
  try {
    const income = new Income({
      userId,
      amount,
      source,
      incomeDate,
    });
    const newIncome = await income.save();
    res
      .status(200)
      .json({
        data: newIncome,
        message: "Income created",
        success: true,
        error: "",
      });
  } catch (e) {
    console.log(e);
    
    res
      .status(500)
      .json({
        data: [],
        message: "Income not created",
        success: false,
        error: "server error",
      });
  }
};

const getAllIncome =async(req,res) =>{
 let filter ={

 };
 console.log(req.query,'req.query');
 
 if(req.query.userId){
  filter.userId= new mongoose.Types.ObjectId(req.query.userId)
 }
  if(req.query.source){
    filter.source= req.query.source;
 }
  try{    
   const income = await Income.find(filter)
   res.status(200).json({data:income,message:'done',success:true,error:''})
  }catch(e){    
res.status(500).json({data:[],message:'',success:true,error:'server error'})

}
}
module.exports = {
  createIncome,
  getAllIncome
};
