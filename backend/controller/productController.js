const Product = require("../models/productModel")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require ("../middlewares/catchAsyncError")
const APIFeatures = require("../utils/apiFeatures")
//Get products
exports.getProducts = catchAsyncError(async (req,res,next)=>{
  const resPerPage = 2
 const apiFeatures = new APIFeatures(Product.find(),req.query).search().filter().paginate(resPerPage)
      const products = await apiFeatures.query;
      res.status(200).json({
      success:true,
      count:products.length,
      products
});
});

//Create product-/api/product/new
exports.newProduct = async(req,res,next)=>{
  const product =await Product.create(req.body)
  res.status(201).json({
    success:true,
    product
  })
}

//get Single product-/api/product/:id
exports.getSingleProduct = catchAsyncError(async(req,res,next)=>{
  const product = await Product.findById(req.params.id);
  if(!product){
   return next(new ErrorHandler("product not found",400));
  }
  res.status(201).json({
    success:true,
    product
  })
})

//update product-/api/product/:id
exports.updateproduct = async(req,res,next)=>{
 let product = await Product.findById(req.params.id)
 if(!product){
  return res.status(404).json({
    success:false,
    message:"product not found"
  });
}

 product = await Product.findByIdAndUpdate(req.params.id, req.body,{
  new:true,
  runValidators: true
 })
 res.status(200).json({
  success:true,
  product
 })
}

//deleteProduct -/api/product/:id
exports.deleteProduct = async (req,res,next)=>{
  const delproduct = await Product.findById(req.params.id)
  if(!delproduct){
  return res.status(404).json({
    success:false,
    message:"product not found"
  });
}
   await Product.deleteOne({ _id: req.params.id });

 res.status(200).json({
  success: true,
  message:"product got deleted"
 })
}