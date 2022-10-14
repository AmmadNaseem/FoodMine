import {Router} from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import { User, UserModel } from '../models/user.model';
// import { HTTP_BAD_REQUEST } from '../constants/http_status';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST } from '../constants/http_status';

const router=Router();

router.get("/seed",expressAsyncHandler(
    async (req,res)=>{
        const usersCount=await UserModel.countDocuments();
        if (usersCount>0) {
            res.send("Seed is already done!");
            return;
        }

        await UserModel.create(sample_users);
        res.send("Seed is done, goog job.");
    }
 )
);

router.post("/login", expressAsyncHandler(
    async (req, res) => {
      const {email, password} = req.body;
      const user = await UserModel.findOne({email , password});
        
       if(user) {
        res.send(generateTokenReponse(user));
       }
       else{
         res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
       }
    
    }
  ))
// router.post("/login",expressAsyncHandler(
//     async (req,res)=>{
//         const {email,password}=req.body; //DESTRUCTURING ASSIGNMENT

//         const user=await UserModel.findOne({email,password});
//         // const user=sample_users.find(user=>user.email===email && user.password===password);
    
//         if (user) {
//             res.send(generateTokenResponse(user)); 
//         }else{
//             res.status(HTTP_BAD_REQUEST).send("User name or password is not valid");
//         }
    
//     }
// ));

router.post('/register', expressAsyncHandler(
    async (req, res) => {
      const {name, email, password, address} = req.body;
      const user = await UserModel.findOne({email});
      if(user){
        res.status(HTTP_BAD_REQUEST)
        .send('User is already exist, please login!');
        return;
      }
  
      const encryptedPassword = await bcrypt.hash(password, 10);//salt if give bigger number more strong password hash
  
      const newUser:User = {
        id:'',
        name,//this equl to same as name:name;
        email: email.toLowerCase(),
        password: encryptedPassword,
        address,
        isAdmin: false
      }
  
      const dbUser = await UserModel.create(newUser);
      res.send(generateTokenReponse(dbUser));
    }
  ))

// const generateTokenResponse=(user:any)=>{
//  const token=jwt.sign({
//     email:user.email,isAdmin:user.isAdmin
//  },"SecretKeySomeRandomTestkjsdafjklsdajf",{
//         expiresIn:"2d"
//  });
//  user.token=token;
//  return user;
// }

const generateTokenReponse = (user : User) => {
    const token = jwt.sign({
      id: user.id, email:user.email, isAdmin: user.isAdmin
    },
    process.env.JWT_SECRET!,
    {
      expiresIn:"3d"
    });
  
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      isAdmin: user.isAdmin,
      token: token
    };
  }

export default router;