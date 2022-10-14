import dotenv from 'dotenv';
dotenv.config();
// process.env.MONGO_URL //FOR get values from env file

import express from "express";
import cors from "cors";//cors helps the two different server can request each other.
// import { sample_foods, sample_users } from "./data";
// MEANS FRONTEND localhost:4200 can SEND REQUEST TO localhost:5000;
// import jwt from 'jsonwebtoken';

import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';

import { dbConnect } from './configs/database.config';
import orderRouter from './routers/order.router';

dbConnect();

const app=express();
app.use(express.json());//BECAUSE EXPRESS BY DEFAULT NOT SUPPORT JSON.

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use("/api/foods",foodRouter);
app.use("/api/users",userRouter);
app.use("/api/orders",orderRouter);

// app.get("/api/foods",(req,res)=>{
//     res.send(sample_foods);
// });

// app.get("/api/foods/search/:searchTerm",(req,res)=>{
//     const searchTerm=req.params.searchTerm;
//     const foods=sample_foods
//     .filter(food=>food.name.toLowerCase()
//     .includes(searchTerm.toLowerCase()));

//     res.send(foods);
// });

// app.get("/api/foods/tags",(req,res)=>{
//     res.send(sample_tags);
// });

// app.get("/api/foods/tag/:tagName",(req,res)=>{
//     const tagName=req.params.tagName;
//     const foods=sample_foods
//     .filter(food=>food.tags?.includes(tagName));

//     res.send(foods);
// });

// app.get("/api/foods/:foodId",(req,res)=>{
//     const foodId=req.params.foodId;
//     const food=sample_foods.find(food=>food.id==foodId);

//     res.send(food);
// });

// app.post("/api/users/login",(req,res)=>{
//     const {email,password}=req.body; //DESTRUCTURING ASSIGNMENT
//     const user=sample_users.find(user=>user.email===email && user.password===password);

//     if (user) {
//         res.send(generateTokenResponse(user)); 
//     }else{
//         res.status(400).send("User name or password is not valid");
//     }

// })

// const generateTokenResponse=(user:any)=>{
//  const token=jwt.sign({
//     email:user.email,isAdmin:user.isAdmin
//  },"SecretKeySomeRandomTestkjsdafjklsdajf",{
//         expiresIn:"2d"
//  });
//  user.token=token;
//  return user;
// }

// app.use(express.static('public'));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname,'public', 'index.html')) //this join in all operating system
// })

// const port = process.env.PORT || 5000;//heruko give own us port.
// app.listen(port, () => {
//     console.log("Website served on http://localhost:" + port);
// })
const port=5000;
app.listen(port,()=>{
 console.log("Website served on http://localhost:"+port);
});