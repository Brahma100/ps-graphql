import mongoose from 'mongoose'
const ItemSchema = new mongoose.Schema({
   name:{
       type:String,
       required:true
   },
   imageUrl:{
       type:String,
       required:true
   },
   price:{
       type:Number,
       required:true
   },
   by:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User"
   }
    
})

mongoose.model("Item",ItemSchema)