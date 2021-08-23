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
    product_category:{type:String,required:true},
    product_for:[{type:String,required:true}],
    colorId:[{type :mongoose.Schema.Types.ObjectId,
    ref:"color",
       required:true}]
},{
    versionKey:false
})

const Fashion=mongoose.model("fashion",fashionSchema);

const accessorySchema=new mongoose.Schema({
    product_name:{type:String,required:true},
    product_price:{type:Number,required:true},
    product_for:{type:String,required:true}
},{
    versionKey:false
})

const Accessory=mongoose.model("accessory",accessorySchema);

const colorSchema=new mongoose.Schema({
   color:{type:String}  
},{
    versionKey:false
})

const Color=mongoose.model("color",colorSchema);

//-------------------------------------------------CRUD-- for Faishon-------------------------------------------------------

app.post("/fashion",async function(req,res){
    try{
        const fashion=await Fashion.create(req.body)
        return res.status(200).send(fashion);
    }
    catch(err){
        return res.status(400).send(err.message)
    }
})

app.get("/fashion",async function(req,res){
    try{
        const fashion=await Fashion.find().populate("colorId").lean().exec()
        return res.status(200).send(fashion)
    } 
    catch(err){
        return res.status(400).send(err.message)
    }
 
})


app.get("/fashion",async function(req,res){
    try{
        const fashion=await Fashion.find({product_price}).populate("colorId").lean().exec()
        return res.status(200).send(fashion)
    } 
    catch(err){
        return res.status(400).send(err.message)
    }
 
})


//---------------------------------------------------------CRUD for color----------------------------------------------------------------

app.post("/colors",async function(req,res){
    try{
        const color=await Color.create(req.body)
        return res.status(200).send(color)
    }
    catch(err){
        return res.status(400).send(err.message)
    }
})


app.get("/colors",async function(req,res){
    try{
        const color=await Color.find().lean().exec()
        return res.status(200).send(color)
    }catch(err){
        return res.status(400).send(err.message)
    }
})

app.listen(2999,async()=>{
   await connect();
   console.log("I'm listening to port 2999");
})