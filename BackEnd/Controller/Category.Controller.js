const Category =require ("../Models/Category.model");


 const getCategory = async(req,res) =>{
    
    try {
        
    const category =await Category.find();
    
    res.status(200).json({data:category,success:true,error:""})
    }catch(e){
     res.status(500).json({data:[],error:"server error",success:false,message:''})
    }
}
 const getAllCategory = async(req,res) =>{  
      
    try {
    const category =await Category.find().select("category");
    res.status(200).json({data:category,success:true,error:""})
    }catch(e){
        console.log(e);
        
     res.status(500).json({data:[],error:"server error",success:false,message:''})
    }
}

const createCategory =async(req,res) =>{    
    try {
       const category =new Category({
        category:req.body.category,
        description:req.body.description
       })
      await category.save()
      res.status(200).json({message:"category created",success:true,error:""})
    }catch(e){
        
      res.status(500).json({message:"",success:false,error:"not category created",e:e})

    }
}


const updateCategory =async(req,res) =>{    
    try {
       const category = {
        categoryname:req.body.categoryname,
        description:req.body.description
       }
      let updatedCat = await Category.findByIdAndUpdate(req.params.id,category,{new:true})
      res.status(200).json({message:"category updated",success:true,error:"",data:updatedCat})
    }catch(e){        
      res.status(500).json({message:"",success:false,error:"not category created"})

    }
}
 const getByIdCategory = async(req,res) =>{    
    try {        
    const category =await Category.findById(res.params.id);
    
    res.status(200).json({data:category,success:true,error:""})
    }catch(e){
     res.status(500).json({data:[],error:"server error",success:false,message:''})
    }
}
const deleteCategory = async(req,res) =>{
    try {
    const category =await Category.findByIdAndDelete(req.params.id);    
    res.status(200).json({data:[],success:true,error:""})
    }catch(e){
     res.status(500).json({data:[],error:"server error",success:false,message:''})
    }
}
module.exports ={
    getAllCategory,
    getCategory,
    updateCategory,
    getByIdCategory,
    createCategory,
    deleteCategory
}