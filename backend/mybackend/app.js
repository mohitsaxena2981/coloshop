const express = require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');

const app = express();
const cors=require('cors');
const path=require('path');
// const jwtBlock=require('./management/jwt');
require('dotenv/config');
const port = 3000;

// middlewares

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.options('*',cors());
app.use('/public',express.static(path.join('public')));
// app.use(jwtBlock());

// Routers
const itemRouter=require('./routers/itemRoutes');
app.use(process.env.URL+'/items',itemRouter);

const categoryRouter=require('./routers/categoryRoutes');
app.use(process.env.URL+'/category',categoryRouter);

const userRouter=require('./routers/usersRoutes');
app.use(process.env.URL+'/users',userRouter);


const cartRouter=require('./routers/cartRoutes');
app.use(process.env.url+'/cart',cartRouter);

// app.get(process.env.URL, (req, res) => {
//     const item=req.body;
//   res.send(item);
// });

// app.post(process.env.URL,async(req,res)=>{
//     let item=new Item({
//         name:req.body.name,
//         description:req.body.description,
//         price:req.body.price,
//         image:req.body.image
//     })

//     item= await item.save()
//     .then(()=>{
//         res.status(201).send("Item created successfully");
//     })
//     .catch((err)=>{
//         res.status(500).json({
//             error:err,
//             message:"Impossible to create product"
//         })
//     })
// })

mongoose.connect(process.env.CONNECTION_STRING,
    {
        UseNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log("Connection Successfull to db");
    })
    .catch((err)=>{
        console.log("Connection to DB failed")
    })

app.listen(port, () => {
  console.log(`Server running on ${port} port`);
});
