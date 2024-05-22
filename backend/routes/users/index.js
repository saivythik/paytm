import express from 'express';
import zod from 'zod';
import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';
import {User, Account} from '../../db.js'
import JWT_SECRET from '../../config.js'
import { authMiddleware } from '../../middleware.js';

const signupSchema = zod.object({
    username : zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string().optional(),
    email : zod.string().email(),
})

const updateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
	lastName: zod.string().optional()
})

const user_router = express.Router();


function signupMiddleware(req, res, next){
    const user = req.body;
    const userParse = signupSchema.safeParse(user);
    if(userParse.success) {
        console.log("signupMiddleware--passed")
        next();
    }
    else{
        res.status(411).json(
            {
                message: "Email already taken / Incorrect inputs"
            }
        )
    }


}

async function existinguserMiddleWare(req, res, next){
    const user = req.body;
    const existingUser = await User.findOne({
        username: user.username
    });
    console.log(existingUser, user)

    if(existingUser) {
        res.status(411).json(
            {
                message: "Email already taken / Incorrect inputs"
            }
        )
    }
    else {
        console.log("existinguserMiddleWare--passed")
        next();
    }
}


user_router.post('/signup',signupMiddleware, existinguserMiddleWare, async (req, res) => {

    const user_data = req.body;

    // const cryptic_pass = bcrypt.hash(user_data.password, 10, function(err, hash) {
    //     // Store hash in your password DB.
    //     if(err)
    //         {
    //             res.status(411).json(
    //                 {
    //                     message: "Password Encryption fail and user is not created talk to the team"
    //                 }
    //             )
    //         }
    //         else{
    //             return hash;
    //         }
    // });
    try{
        const user_created = await User.create(
            {
                username : user_data.username,
                password: user_data.password,
                firstName: user_data.firstName,
                lastName: user_data.lastName,
                email : user_data.email,
            }
        )
        const user_id = user_created._id;
        const balance= Math.floor(Math.random() * 1000) + 1

        const account_created = await Account.create(
            {
                userId: user_id,
                balance: balance
            }
        )

        const token = jwt.sign(
            {
            userId:user_id
            }, 
            JWT_SECRET)

        res.status(200).json(
            {
                message: "User created successfully",
                token: token
        })
    }
    catch(err)
    {
        res.status(400).json(
            {
                message: "User not been Created because of the error"+err,
                token: "",
                err:  err
        })

    }
    
})


user_router.put('/',authMiddleware,async (req,res)=>{
    const userId = req.userId;
    const existingUser = await User.findOne({
        _id: userId
    });
    if(!existingUser){
        res.status(411).json({message:"User Dosen't exists"});
    }
    const user = req.body;
    const useParser = updateSchema.safeParse(user);
    if(!useParser.success){
        res.status(411).json(
            {
                message: "Error while updating the information please check you input format"
            }
        )
    }
    const calc = await User.updateOne({
        _id : userId
    }, user)

    res.status(200).json(
        {
            message: "Updated successfully"
        }
    )

})


user_router.get('/bulk',authMiddleware,async (req,res)=>{
    const filter = req.query.filter || "";
    const users = await User.find({
        $or:[
            {
                firstName:{
                    $regex : filter
                }
            },
            {
                lastName: { 
                    $regex: filter
                }
            }
        ]
    });

   res.status(200).json(
    {
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            id: user._id
        }))
    }
   )


})

export {user_router};