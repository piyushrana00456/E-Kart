const express=require('express');
const mongoose=require('mongoose');


const app=express();

app.use(express.json());


const connect=()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/olympicDb",{
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:false
    })
}


const fashionSchema=new mongoose.Schema({
    product_name:{type:String,required:true},
    product_price:{type:Number,required:true},
    product_category:{type:String,required:true}
},{
    versionKey:false
})

const Fashion=mongoose.model("fashion",fashionSchema);

const accessorySchema=new mongoose.Schema({
    product_name:{type:String,required:true},
    product_price:{type:Number,required:true},
})

const Accessory=mongoose.model("accessory",accessorySchema);






